"use strict";

const fs = require("fs");
const path = require("path");
const { createVmContext } = require("./lib/vm_harness");

const ROOT = path.resolve(__dirname, "..");

function loadJson(relativePath) {
    const fullPath = path.join(ROOT, relativePath);
    return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function applyIfExists(context, fnName, data) {
    if (typeof context[fnName] === "function") {
        context[fnName](data);
    }
}

function applyStaticData(context) {
    applyIfExists(context, "applyStaticConstants", loadJson("data/static_constants.json"));
    applyIfExists(context, "applyStaticPhonology", loadJson("data/static_phonology.json"));
    applyIfExists(context, "applyStaticLabels", loadJson("data/static_labels.json"));
    applyIfExists(context, "applyStaticDerivationalRules", loadJson("data/static_derivational_rules.json"));
    applyIfExists(context, "applyStaticValenceNeutral", loadJson("data/static_valence_neutral.json"));
    applyIfExists(context, "applyStaticOptions", loadJson("data/static_options.json"));
    applyIfExists(context, "applyStaticOrders", loadJson("data/static_orders.json"));
    applyIfExists(context, "applyStaticRules", loadJson("data/static_rules.json"));
    applyIfExists(context, "applyStaticDirectionalRules", loadJson("data/static_directional_rules.json"));
    applyIfExists(context, "applyStaticAllomorphyRules", loadJson("data/static_allomorphy_rules.json"));
    applyIfExists(context, "applyStaticModes", loadJson("data/static_modes.json"));
    applyIfExists(context, "applyStaticNnc", loadJson("data/static_nnc.json"));
    applyIfExists(context, "applyStaticMisc", loadJson("data/static_misc.json"));
    applyIfExists(context, "applyStaticSuppletives", loadJson("data/static_suppletives.json"));
    applyIfExists(context, "applyStaticRedup", loadJson("data/static_redup.json"));
    applyIfExists(context, "applyStaticSuppletivePaths", loadJson("data/static_suppletive_paths.json"));
}

const VISIBLE_CONTINUATION_ROUTE_EXPECTATIONS = Object.freeze([
    { dataset: { actionNounSourceSubjectPossessor: "ki" }, expectedRouteId: "cnv-core-to-cnn-nounstem-deverbal" },
    { dataset: { activeActionCompoundEmbedContinuation: "true" }, expectedRouteId: "cnv-to-cnn-to-cnv-loop" },
    { dataset: { activeActionNominalCompoundContinuation: "true" }, expectedRouteId: "cnv-core-to-cnn-nounstem-deverbal" },
    { dataset: { compoundSourceAdjectivalFunctionContinuation: "true" }, expectedRouteId: "cnv-core-to-cnn-nounstem-deverbal" },
    { dataset: { customaryAgentiveCompoundEmbedContinuation: "true" }, expectedRouteId: "cnv-to-cnn-to-cnv-loop" },
    { dataset: { customaryAgentiveNominalCompoundContinuation: "true" }, expectedRouteId: "cnv-predicate-to-cnn-nounstem-nominalization" },
    { dataset: { denominalAndrewsContractRouteContinuation: "true" }, expectedRouteId: "cnn-nounstem-to-cnv-verbstem-denominal" },
    { dataset: { denominalCompoundAdjectivalFunctionContinuation: "true" }, expectedRouteId: "cnv-to-cnn-to-cnv-loop" },
    { dataset: { huaDeverbalYuContinuation: "true" }, expectedRouteId: "cnv-to-cnn-to-cnv-loop" },
    { dataset: { instrumentivoSourceSubjectPossessor: "ki" }, expectedRouteId: "cnv-core-to-cnn-nounstem-deverbal" },
    { dataset: { intensifiedAdjectivalFunctionContinuation: "true" }, expectedRouteId: "cnv-core-to-cnn-nounstem-deverbal" },
    { dataset: { nominalizedVncAdjectivalFunctionContinuation: "true" }, expectedRouteId: "cnv-predicate-to-cnn-nounstem-nominalization" },
    { dataset: { ordinaryNncAdjectivalFunctionContinuation: "true" }, expectedRouteId: "cnv-core-to-cnn-nounstem-deverbal" },
    { dataset: { ordinaryNncOwnerhoodContinuation: "true" }, expectedRouteId: "cnn-nounstem-to-cnv-verbstem-denominal" },
    { dataset: { patientivoAdjectivalFunctionContinuation: "true" }, expectedRouteId: "cnv-core-to-cnn-nounstem-deverbal" },
    { dataset: { patientivoCharacteristicPropertyEmbedContinuation: "true" }, expectedRouteId: "cnv-to-cnn-to-cnv-loop" },
    { dataset: { patientivoCompoundEmbedContinuation: "true" }, expectedRouteId: "cnv-to-cnn-to-cnv-loop" },
    { dataset: { patientivoNominalCompoundContinuation: "true" }, expectedRouteId: "cnv-core-to-cnn-nounstem-deverbal" },
    { dataset: { patientivoPrelocativeContinuation: "true" }, expectedRouteId: "cnv-core-to-cnn-nounstem-deverbal" },
    { dataset: { patientivoTroncoConversion: "true" }, expectedRouteId: "cnv-to-cnn-to-cnv-loop" },
    { dataset: { preteritAgentiveAdverbialContinuation: "true" }, expectedRouteId: "cnv-predicate-to-cnn-nounstem-nominalization" },
    { dataset: { preteritAgentiveComplementContinuation: "true" }, expectedRouteId: "cnv-predicate-to-cnn-nounstem-nominalization" },
    { dataset: { preteritAgentiveCompoundEmbedContinuation: "true" }, expectedRouteId: "cnv-to-cnn-to-cnv-loop" },
    { dataset: { preteritAgentiveNominalCompoundContinuation: "true" }, expectedRouteId: "cnv-predicate-to-cnn-nounstem-nominalization" },
    { dataset: { preteritAgentiveOwnerhoodContinuation: "true" }, expectedRouteId: "cnv-to-cnn-to-cnv-loop" },
    { dataset: { verbNominalContinuation: "true", targetTense: "agentivo-preterito" }, expectedRouteId: "cnv-predicate-to-cnn-nounstem-nominalization" },
    { dataset: { verbNominalContinuation: "true", targetTense: "sustantivo-verbal" }, expectedRouteId: "cnv-core-to-cnn-nounstem-deverbal" },
    { dataset: { verbPatientivoContinuation: "true" }, expectedRouteId: "cnv-core-to-cnn-nounstem-deverbal" },
    { dataset: { vncAdjectivalFunctionContinuation: "true" }, expectedRouteId: "cnv-predicate-to-cnn-nounstem-nominalization" },
]);

const STATIC_ROUTE_FRAME_INVARIANT_PATTERNS = Object.freeze([
    Object.freeze({
        id: "functionUseOwnsObjectSlotsHardTrue",
        pattern: /functionUseOwnsObjectSlots\s*:\s*true/,
        invariant: "function-use must not own object slots",
    }),
    Object.freeze({
        id: "finalFormulaShapeOwnsObjectSlotsHardTrue",
        pattern: /finalFormulaShapeOwnsObjectSlots\s*:\s*true/,
        invariant: "final formula shape must not own object slots",
    }),
    Object.freeze({
        id: "routeFrameLicensesObjectSlotOwnershipHardTrue",
        pattern: /routeFrameLicensesObjectSlotOwnership\s*:\s*true/,
        invariant: "route frame object-slot licensing must be computed from a fixed valence frame",
    }),
    Object.freeze({
        id: "routeFrameOwnsObjectSlotLicensingHardTrue",
        pattern: /routeFrameOwnsObjectSlotLicensing\s*:\s*true/,
        invariant: "route frame ownership must not be hard-coded before valence-frame resolution",
    }),
]);

const COMPOSER_FUNCTION_USE_MUTATION_ROUTE_ACTION_EXPECTATIONS = Object.freeze([
    Object.freeze({
        id: "prelocative-entry",
        dataset: { patientivoPrelocativeContinuation: "true", functionUseContinuation: "true" },
        routeRecordId: "cnv-core-to-cnn-nounstem-deverbal",
    }),
    Object.freeze({
        id: "patientivo-compound-embed-entry",
        dataset: { patientivoCompoundEmbedContinuation: "true", functionUseContinuation: "true" },
        routeRecordId: "cnv-to-cnn-to-cnv-loop",
    }),
    Object.freeze({
        id: "patientivo-characteristic-property-embed-entry",
        dataset: { patientivoCharacteristicPropertyEmbedContinuation: "true", functionUseContinuation: "true" },
        routeRecordId: "cnv-to-cnn-to-cnv-loop",
        objectPrefix: "ki",
    }),
    Object.freeze({
        id: "patientivo-nominal-compound-entry",
        dataset: { patientivoNominalCompoundContinuation: "true", functionUseContinuation: "true" },
        routeRecordId: "cnv-core-to-cnn-nounstem-deverbal",
    }),
    Object.freeze({
        id: "active-action-compound-embed-entry",
        dataset: { activeActionCompoundEmbedContinuation: "true", functionUseContinuation: "true" },
        routeRecordId: "cnv-to-cnn-to-cnv-loop",
    }),
    Object.freeze({
        id: "preterit-agentive-ownerhood-entry",
        dataset: { preteritAgentiveOwnerhoodContinuation: "true" },
        routeRecordId: "cnv-to-cnn-to-cnv-loop",
    }),
    Object.freeze({
        id: "preterit-agentive-complement-entry",
        dataset: { preteritAgentiveComplementContinuation: "true" },
        routeRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
        objectPrefix: "ki",
    }),
    Object.freeze({
        id: "preterit-agentive-adverbial-entry",
        dataset: { preteritAgentiveAdverbialContinuation: "true" },
        routeRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
    }),
    Object.freeze({
        id: "ordinary-noun-ownerhood-entry",
        dataset: { ordinaryNncOwnerhoodContinuation: "true" },
        routeRecordId: "cnn-nounstem-to-cnv-verbstem-denominal",
    }),
    Object.freeze({
        id: "active-action-nominal-compound-entry",
        dataset: { activeActionNominalCompoundContinuation: "true", functionUseContinuation: "true" },
        routeRecordId: "cnv-core-to-cnn-nounstem-deverbal",
    }),
    Object.freeze({
        id: "customary-agentive-nominal-compound-entry",
        dataset: { customaryAgentiveNominalCompoundContinuation: "true", functionUseContinuation: "true" },
        routeRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
    }),
    Object.freeze({
        id: "customary-agentive-compound-embed-entry",
        dataset: { customaryAgentiveCompoundEmbedContinuation: "true", functionUseContinuation: "true" },
        routeRecordId: "cnv-to-cnn-to-cnv-loop",
        objectPrefix: "ki",
    }),
]);

const COMPOSER_FUNCTION_USE_MUTATION_STATIC_EXPECTATIONS = Object.freeze([
    Object.freeze({
        id: "adjectival-nnc-function-entry",
        functionName: "applyAdjectivalNncFunctionToVerbEntry",
        guardToken: "buildAdjectivalNncFunctionEntryMutationValenceGate({",
        blockToken: "entryFunctionUseValenceGate?.status === \"blocked\"",
        mutationTokens: ["verbEl.value"],
    }),
    Object.freeze({
        id: "prelocative-entry",
        functionName: "applyPrelocativeRootsToVerbEntry",
        guardToken: "shouldBlockComposerFunctionUseValenceRouteAction({",
        blockToken: "if (routeAction.blocked)",
        mutationTokens: ["VerbComposerState.", "verbEl.value", "setCurrentObjectPrefix("],
    }),
    Object.freeze({
        id: "patientivo-compound-embed-entry",
        functionName: "applyPatientivoCompoundEmbedRootsToVerbEntry",
        guardToken: "shouldBlockComposerFunctionUseValenceRouteAction({",
        blockToken: "if (routeAction.blocked)",
        mutationTokens: ["VerbComposerState.", "verbEl.value"],
    }),
    Object.freeze({
        id: "patientivo-characteristic-property-embed-entry",
        functionName: "applyPatientivoCharacteristicPropertyEmbedRootsToVerbEntry",
        guardToken: "shouldBlockComposerFunctionUseValenceRouteAction({",
        blockToken: "if (routeAction.blocked)",
        mutationTokens: ["VerbComposerState.", "verbEl.value", "setCurrentObjectPrefix("],
    }),
    Object.freeze({
        id: "patientivo-nominal-compound-entry",
        functionName: "applyPatientivoNominalCompoundToOrdinaryNncEntry",
        guardToken: "shouldBlockComposerFunctionUseValenceRouteAction({",
        blockToken: "if (routeAction.blocked)",
        mutationTokens: ["VerbComposerState.", "verbEl.value", "setOrdinaryNncGenerationModeEnabled("],
    }),
    Object.freeze({
        id: "active-action-compound-embed-entry",
        functionName: "applyActiveActionCompoundEmbedRootsToVerbEntry",
        guardToken: "shouldBlockComposerFunctionUseValenceRouteAction({",
        blockToken: "if (routeAction.blocked)",
        mutationTokens: ["VerbComposerState.", "verbEl.value"],
    }),
    Object.freeze({
        id: "preterit-agentive-ownerhood-entry",
        functionName: "applyPreteritAgentiveOwnerhoodRootsToVerbEntry",
        guardToken: "shouldBlockComposerFunctionUseValenceRouteAction({",
        blockToken: "if (routeAction.blocked)",
        mutationTokens: ["VerbComposerState.", "verbEl.value"],
    }),
    Object.freeze({
        id: "preterit-agentive-complement-entry",
        functionName: "applyPreteritAgentiveComplementRootsToVerbEntry",
        guardToken: "shouldBlockComposerFunctionUseValenceRouteAction({",
        blockToken: "if (routeAction.blocked)",
        mutationTokens: ["VerbComposerState.", "verbEl.value", "setCurrentObjectPrefix("],
    }),
    Object.freeze({
        id: "preterit-agentive-adverbial-entry",
        functionName: "applyPreteritAgentiveAdverbialRootsToVerbEntry",
        guardToken: "shouldBlockComposerFunctionUseValenceRouteAction({",
        blockToken: "if (routeAction.blocked)",
        mutationTokens: ["VerbComposerState.", "verbEl.value", "setCurrentObjectPrefix("],
    }),
    Object.freeze({
        id: "ordinary-noun-ownerhood-entry",
        functionName: "applyOrdinaryNounOwnerhoodRootsToVerbEntry",
        guardToken: "shouldBlockComposerFunctionUseValenceRouteAction({",
        blockToken: "if (routeAction.blocked)",
        mutationTokens: ["VerbComposerState.", "verbEl.value"],
    }),
    Object.freeze({
        id: "active-action-nominal-compound-entry",
        functionName: "applyActiveActionNominalCompoundToOrdinaryNncEntry",
        guardToken: "shouldBlockComposerFunctionUseValenceRouteAction({",
        blockToken: "if (routeAction.blocked)",
        mutationTokens: ["VerbComposerState.", "verbEl.value", "setOrdinaryNncGenerationModeEnabled("],
    }),
    Object.freeze({
        id: "customary-agentive-nominal-compound-entry",
        functionName: "applyCustomaryAgentiveNominalCompoundToOrdinaryNncEntry",
        delegateToken: "return applyActiveActionNominalCompoundToOrdinaryNncEntry({",
        delegatedRouteDatasetToken: "routeDataset: { customaryAgentiveNominalCompoundContinuation: \"true\" }",
        delegatedGateArgToken: "functionUseValenceGate",
    }),
    Object.freeze({
        id: "customary-agentive-compound-embed-entry",
        functionName: "applyCustomaryAgentiveCompoundEmbedRootsToVerbEntry",
        guardToken: "shouldBlockComposerFunctionUseValenceRouteAction({",
        blockToken: "if (routeAction.blocked)",
        mutationTokens: ["VerbComposerState.", "verbEl.value", "setCurrentObjectPrefix("],
    }),
]);

const RENDERING_FUNCTION_USE_CONTINUATION_FORWARDING_EXPECTATIONS = Object.freeze([
    "applyOrdinaryNounOwnerhoodRootsToVerbEntry",
    "applyActiveActionCompoundEmbedRootsToVerbEntry",
    "applyActiveActionNominalCompoundToOrdinaryNncEntry",
    "applyCustomaryAgentiveNominalCompoundToOrdinaryNncEntry",
    "applyPreteritAgentiveOwnerhoodRootsToVerbEntry",
    "applyPreteritAgentiveComplementRootsToVerbEntry",
    "applyPreteritAgentiveAdverbialRootsToVerbEntry",
    "applyPatientivoNominalCompoundToOrdinaryNncEntry",
    "applyPatientivoCompoundEmbedRootsToVerbEntry",
    "applyPatientivoCharacteristicPropertyEmbedRootsToVerbEntry",
    "applyPrelocativeRootsToVerbEntry",
    "applyCustomaryAgentiveCompoundEmbedRootsToVerbEntry",
]);

const ROUTE_FRAME_COMPLETENESS_FIELDS = Object.freeze([
    "kind",
    "sourcePrincipal",
    "sourceAdjunctNnc",
    "matrixValence",
    "embedRole",
    "consumedObjectSlot",
    "valenceDelta",
    "remainingExternalObjectSlots",
    "andrewsSection",
    "generationStatus",
    "sourceRouteFrameRequired",
    "finalFormulaShapeDoesNotLicenseObjectSlots",
    "functionUseDoesNotLicenseObjectSlots",
    "objectSlotOwnershipDoesNotBelongToFunctionUseOrFinalShape",
    "routeObjectLicensingRequiresFixedMatrixValence",
]);

const FUNCTION_USE_STRUCTURAL_SCAN_EXPECTATIONS = Object.freeze({
    "src/core/derivation/source_model.js:buildCustomaryAgentiveCompoundEmbedContinuationContract": Object.freeze({
        category: "route-frame-contract-builder",
        requiredTokens: ["attachDerivationContinuationGrammarContract", "matrixSpec.matrixValency"],
    }),
    "src/core/derivation/source_model.js:buildPreteritAgentiveComplementContinuationContract": Object.freeze({
        category: "route-frame-contract-builder",
        requiredTokens: ["attachDerivationContinuationGrammarContract", "matrixSpec.objectPrefix"],
    }),
    "src/core/derivation/source_model.js:buildPreteritAgentiveAdverbialContinuationContract": Object.freeze({
        category: "route-frame-contract-builder",
        requiredTokens: ["attachDerivationContinuationGrammarContract", "matrixSpec.matrixValency"],
    }),
    "src/core/generation/engine.js:normalizeFunctionUseValenceObjectVector": Object.freeze({
        category: "gate-vector-normalizer",
        requiredTokens: ["normalizeFunctionUseValenceObjectSlot"],
    }),
    "src/core/clause/clause.js:inferVerbalPredicatePositionStatus": Object.freeze({
        category: "predicate-position-classifier",
        requiredTokens: ["getLesson6VerbalObjectPositionStatus"],
    }),
    "src/ui/rendering/rendering.js:buildVerbTenseBlock": Object.freeze({
        category: "display-only-renderer",
        requiredTokens: ["tenseBlock"],
    }),
    "src/ui/rendering/rendering.js:renderLocativoTemporalConjugations": Object.freeze({
        category: "display-only-renderer",
        requiredTokens: ["renderRows"],
    }),
    "src/ui/rendering/rendering.js:renderNounConjugations": Object.freeze({
        category: "display-only-renderer",
        requiredTokens: ["buildNounTabRenderContext"],
    }),
    "src/ui/rendering/rendering.js:renderAdjectivalNncFunctionConjugations": Object.freeze({
        category: "gated-adjectival-renderer",
        requiredTokens: ["applyConjugationEvaluationPresentation", "getCachedSilentGenerateWord"],
    }),
});

const FINAL_FORMULA_SHAPE_ROUTE_FRAME_EXPECTATIONS = Object.freeze({
    "src/core/derivation/source_model.js:buildDerivationContinuationObjectSlotOwnershipFrame": Object.freeze({
        category: "object-slot-ownership-frame",
        requiredTokens: ["functionUseOwnsObjectSlots: false", "finalFormulaShapeOwnsObjectSlots: false"],
    }),
    "src/core/derivation/source_model.js:buildDerivationContinuationIncorporationRouteFrame": Object.freeze({
        category: "incorporation-route-frame",
        requiredTokens: ["sourceRouteFrameRequired: true", "finalFormulaShapeDoesNotLicenseObjectSlots: true", "functionUseDoesNotLicenseObjectSlots: true", "routeFrameLicensesObjectSlotOwnership: matrixValenceFrameFixed"],
    }),
    "src/core/generation/engine.js:buildNuclearClauseSurfaceGrammarFrame": Object.freeze({
        category: "grammar-frame-carrier",
        requiredTokens: ["sourceRouteFrame", "finalFormulaShapeDoesNotLicenseObjectSlots", "functionUseDoesNotLicenseObjectSlots"],
    }),
    "src/core/generation/engine.js:buildGeneratedCompoundObjectSlotOwnershipFrame": Object.freeze({
        category: "object-slot-ownership-frame",
        requiredTokens: ["functionUseOwnsObjectSlots: false", "finalFormulaShapeOwnsObjectSlots: false"],
    }),
    "src/core/generation/engine.js:buildGeneratedCompoundRouteFrameMetadata": Object.freeze({
        category: "compound-route-frame",
        requiredTokens: ["sourceRouteFrameRequired: true", "finalFormulaShapeDoesNotLicenseObjectSlots: true", "functionUseDoesNotLicenseObjectSlots: true", "routeFrameLicensesObjectSlotOwnership: matrixValenceFrameFixed"],
    }),
    "src/core/generation/engine.js:buildAdverbialNuclearFunctionRouteFrame": Object.freeze({
        category: "function-route-frame",
        requiredTokens: ["sourcePrincipalVnc", "finalFormulaShapeDoesNotLicenseObjectSlots: true", "functionUseDoesNotLicenseObjectSlots: true", "routeFrameLicensesObjectSlotOwnership: matrixValenceFrameFixed"],
    }),
    "src/core/generation/engine.js:buildGeneratedAdverbialNuclearFrameMetadata": Object.freeze({
        category: "route-frame-carrier",
        requiredTokens: ["sourceRouteFrame", "finalFormulaShapeDoesNotLicenseObjectSlots: true", "functionUseDoesNotLicenseObjectSlots: true"],
    }),
    "src/core/nnc/adjectival/adjectival.js:buildLesson41CompoundSourceObjectSlotOwnershipFrame": Object.freeze({
        category: "object-slot-ownership-frame",
        requiredTokens: ["functionUseOwnsObjectSlots: false", "finalFormulaShapeOwnsObjectSlots: false"],
    }),
    "src/core/nnc/adjectival/adjectival.js:buildLesson41CompoundSourceRouteFrame": Object.freeze({
        category: "incorporation-route-frame",
        requiredTokens: ["sourceRouteFrameRequired: true", "finalFormulaShapeDoesNotLicenseObjectSlots: true", "functionUseDoesNotLicenseObjectSlots: true", "routeFrameLicensesObjectSlotOwnership: objectSlotOwnership.matrixValenceFrameFixed === true"],
    }),
    "src/core/nnc/adjectival/adjectival.js:buildAdjectivalNncGrammarFrame": Object.freeze({
        category: "grammar-frame-carrier",
        requiredTokens: ["sourceRouteFrame", "finalFormulaShapeDoesNotLicenseObjectSlots", "functionUseDoesNotLicenseObjectSlots"],
    }),
    "src/core/nnc/adjectival/adjectival.js:buildDenominalCompoundAdjectivalNncObjectSlotOwnershipFrame": Object.freeze({
        category: "object-slot-ownership-frame",
        requiredTokens: ["functionUseOwnsObjectSlots: false", "finalFormulaShapeOwnsObjectSlots: false"],
    }),
    "src/core/nnc/adjectival/adjectival.js:buildDenominalCompoundAdjectivalNncRouteFrame": Object.freeze({
        category: "compound-route-frame",
        requiredTokens: ["sourceRouteFrameRequired: true", "finalFormulaShapeDoesNotLicenseObjectSlots: true", "functionUseDoesNotLicenseObjectSlots: true", "routeFrameLicensesObjectSlotOwnership: matrixValenceFrameFixed"],
    }),
    "src/core/nnc/compound/compound.js:buildLesson31CompoundNounstemObjectSlotOwnershipFrame": Object.freeze({
        category: "object-slot-ownership-frame",
        requiredTokens: ["functionUseOwnsObjectSlots: false", "finalFormulaShapeOwnsObjectSlots: false"],
    }),
    "src/core/nnc/compound/compound.js:buildLesson31CompoundNounstemRouteFrame": Object.freeze({
        category: "compound-route-frame",
        requiredTokens: ["sourceRouteFrameRequired: true", "finalFormulaShapeDoesNotLicenseObjectSlots: true", "functionUseDoesNotLicenseObjectSlots: true", "routeFrameLicensesObjectSlotOwnership: false"],
    }),
    "src/core/nnc/compound/compound.js:buildLesson31CompoundNounstemPursuitFrame": Object.freeze({
        category: "curriculum-route-frame-carrier",
        requiredTokens: ["compoundNounstemRouteFrame"],
    }),
    "src/core/nnc/nominalization/nominalization.js:buildLesson35PreteritAgentiveIncorporationObjectSlotOwnershipFrame": Object.freeze({
        category: "object-slot-ownership-frame",
        requiredTokens: ["functionUseOwnsObjectSlots: false", "finalFormulaShapeOwnsObjectSlots: false"],
    }),
    "src/core/nnc/nominalization/nominalization.js:buildLesson35PreteritAgentiveIncorporationRouteFrame": Object.freeze({
        category: "incorporation-route-frame",
        requiredTokens: ["sourceRouteFrameRequired: true", "finalFormulaShapeDoesNotLicenseObjectSlots: true", "functionUseDoesNotLicenseObjectSlots: true", "routeFrameLicensesObjectSlotOwnership: objectSlotOwnership.matrixValenceFrameFixed === true"],
    }),
    "src/core/nnc/nominalization/nominalization.js:buildLesson39PatientiveIncorporationObjectSlotOwnershipFrame": Object.freeze({
        category: "object-slot-ownership-frame",
        requiredTokens: ["functionUseOwnsObjectSlots: false", "finalFormulaShapeOwnsObjectSlots: false"],
    }),
    "src/core/nnc/nominalization/nominalization.js:buildLesson39PatientiveIncorporationRouteFrame": Object.freeze({
        category: "incorporation-route-frame",
        requiredTokens: ["sourceRouteFrameRequired: true", "finalFormulaShapeDoesNotLicenseObjectSlots: true", "functionUseDoesNotLicenseObjectSlots: true", "routeFrameLicensesObjectSlotOwnership: objectSlotOwnership.matrixValenceFrameFixed === true"],
    }),
    "src/core/parsing/parsing.js:buildCompoundAstRouteFrame": Object.freeze({
        category: "parser-compound-route-frame",
        requiredTokens: ["sourceRouteFrameRequired: true", "finalFormulaShapeDoesNotLicenseObjectSlots: true", "functionUseDoesNotLicenseObjectSlots: true", "finalFormulaShapeOwnsObjectSlots: false"],
    }),
});

function getJavascriptFilesInDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        return [];
    }
    return fs.readdirSync(dirPath, { withFileTypes: true })
        .flatMap((entry) => {
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                return getJavascriptFilesInDir(fullPath);
            }
            if (entry.isFile() && entry.name.endsWith(".js")) {
                return [fullPath];
            }
            return [];
        });
}

function getInvariantJavascriptFiles() {
    return [
        path.join(ROOT, "src", "core"),
        path.join(ROOT, "src", "ui"),
    ].flatMap(getJavascriptFilesInDir);
}

function getStaticInvariantPatternMatches(pattern) {
    return getInvariantJavascriptFiles()
        .flatMap((fullPath) => {
            const relativePath = path.relative(ROOT, fullPath);
            const lines = fs.readFileSync(fullPath, "utf8").split(/\r?\n/);
            return lines
                .map((line, index) => pattern.test(line)
                    ? `${relativePath}:${index + 1}`
                    : "")
                .filter(Boolean);
        });
}

function getTopLevelFunctionSource(relativePath, functionName) {
    const sourcePath = path.join(ROOT, relativePath);
    if (!fs.existsSync(sourcePath)) {
        return "";
    }
    const source = fs.readFileSync(sourcePath, "utf8");
    const start = source.indexOf(`function ${functionName}(`);
    if (start < 0) {
        return "";
    }
    const nextFunction = source.indexOf("\nfunction ", start + 1);
    return source.slice(start, nextFunction > start ? nextFunction : undefined);
}

function firstIndexOfAny(source, tokens = []) {
    return (Array.isArray(tokens) ? tokens : [])
        .map((token) => source.indexOf(token))
        .filter((index) => index >= 0)
        .sort((a, b) => a - b)[0] ?? -1;
}

function collectFunctionCallBlocks(relativePath, functionName) {
    const sourcePath = path.join(ROOT, relativePath);
    if (!fs.existsSync(sourcePath)) {
        return [];
    }
    const source = fs.readFileSync(sourcePath, "utf8");
    const blocks = [];
    let index = 0;
    const needle = `${functionName}({`;
    while (index >= 0) {
        const start = source.indexOf(needle, index);
        if (start < 0) {
            break;
        }
        const end = source.indexOf("});", start);
        blocks.push(end > start ? source.slice(start, end + 4) : source.slice(start));
        index = start + needle.length;
    }
    return blocks;
}

function collectFunctionCallExpressions(relativePath, functionName) {
    const sourcePath = path.join(ROOT, relativePath);
    if (!fs.existsSync(sourcePath)) {
        return [];
    }
    const source = fs.readFileSync(sourcePath, "utf8");
    const calls = [];
    const needle = `${functionName}(`;
    let index = 0;
    while (index >= 0) {
        const start = source.indexOf(needle, index);
        if (start < 0) {
            break;
        }
        let parenDepth = 0;
        let quote = "";
        let escaped = false;
        let end = -1;
        for (let cursor = start; cursor < source.length; cursor += 1) {
            const char = source[cursor];
            if (quote) {
                if (escaped) {
                    escaped = false;
                    continue;
                }
                if (char === "\\") {
                    escaped = true;
                    continue;
                }
                if (char === quote) {
                    quote = "";
                }
                continue;
            }
            if (char === "\"" || char === "'" || char === "`") {
                quote = char;
                continue;
            }
            if (char === "(") {
                parenDepth += 1;
                continue;
            }
            if (char === ")") {
                parenDepth -= 1;
                if (parenDepth === 0) {
                    end = cursor + 1;
                    break;
                }
            }
        }
        calls.push({
            relativePath,
            functionName,
            start,
            end: end > start ? end : source.length,
            source,
            text: source.slice(start, end > start ? end : undefined),
        });
        index = start + needle.length;
    }
    return calls;
}

function getCallAssignedVariableName(source = "", start = 0) {
    const prefix = String(source || "").slice(Math.max(0, start - 500), start);
    const matches = Array.from(prefix.matchAll(/(?:const|let)\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=/g));
    return matches.length ? matches[matches.length - 1][1] : "";
}

function regexEscape(value = "") {
    return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function callAssignedVariableHasBlockedGuard(call = null) {
    if (!call || !call.source) {
        return false;
    }
    const varName = getCallAssignedVariableName(call.source, call.start);
    if (!varName) {
        return false;
    }
    const after = call.source.slice(call.end, Math.min(call.source.length, call.end + 1000));
    const pattern = new RegExp(`${regexEscape(varName)}(?:\\.|\\?\\.)status\\s*===\\s*["']blocked["']`);
    return pattern.test(after);
}

function getCallContainingFunctionSource(call = null) {
    if (!call || !call.source) {
        return "";
    }
    const before = call.source.slice(0, call.start);
    const marker = "\nfunction ";
    const start = before.lastIndexOf(marker);
    const functionStart = start >= 0 ? start + 1 : 0;
    const next = call.source.indexOf(marker, call.start + 1);
    return call.source.slice(functionStart, next > call.start ? next : undefined);
}

function getCallContainingFunctionName(call = null) {
    const source = getCallContainingFunctionSource(call);
    const match = source.match(/^function\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/);
    return match ? match[1] : "";
}

function collectTopLevelFunctionSources(relativePath = "") {
    const sourcePath = path.join(ROOT, relativePath);
    if (!fs.existsSync(sourcePath)) {
        return [];
    }
    const source = `\n${fs.readFileSync(sourcePath, "utf8")}`;
    const starts = [];
    const pattern = /\nfunction\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/g;
    let match = null;
    while ((match = pattern.exec(source))) {
        starts.push({
            name: match[1],
            start: match.index + 1,
        });
    }
    return starts.map((entry, index) => {
        const end = index + 1 < starts.length ? starts[index + 1].start : source.length;
        return {
            relativePath,
            name: entry.name,
            start: entry.start,
            line: getSourceLineNumber(source, entry.start),
            text: source.slice(entry.start, end),
        };
    });
}

function getDatasetExpectationId(dataset = {}) {
    return Object.entries(dataset)
        .map(([key, value]) => `${key}=${value}`)
        .join("|");
}

function buildVisibleContinuationOutputMatchings(context) {
    if (typeof context.inferAndrewsCnvCnnBackAndForthRouteRecordId !== "function") {
        return [{
            layer: "visible-continuation-route",
            id: "inferAndrewsCnvCnnBackAndForthRouteRecordId",
            status: "no-match",
            expected: "function",
            actual: "missing",
        }];
    }
    return VISIBLE_CONTINUATION_ROUTE_EXPECTATIONS.map((entry) => {
        const actualRouteId = context.inferAndrewsCnvCnnBackAndForthRouteRecordId({ dataset: entry.dataset });
        return {
            layer: "visible-continuation-route",
            id: getDatasetExpectationId(entry.dataset),
            status: actualRouteId === entry.expectedRouteId ? "match" : "no-match",
            expected: entry.expectedRouteId,
            actual: actualRouteId || "",
        };
    });
}

function pushEngineFieldMatching(matchings, probe, field, expectedKey = `expected${field[0].toUpperCase()}${field.slice(1)}`) {
    if (!Object.prototype.hasOwnProperty.call(probe, expectedKey)) {
        return;
    }
    const expected = String(probe[expectedKey] || "");
    const actual = String(probe[field] || "");
    matchings.push({
        layer: "engine-path-output",
        id: `${probe.id}.${field}`,
        routeId: probe.routeId || "",
        status: expected === actual ? "match" : "no-match",
        expected,
        actual,
    });
}

function buildEnginePathOutputMatchings(audit) {
    const matchings = [];
    (Array.isArray(audit.enginePathProbes) ? audit.enginePathProbes : []).forEach((probe) => {
        matchings.push({
            layer: "engine-path-hit",
            id: probe.id || "",
            routeId: probe.routeId || "",
            status: probe.hit === true ? "match" : "no-match",
            expected: "hit",
            actual: probe.hit === true ? "hit" : "no-hit",
        });
        pushEngineFieldMatching(matchings, probe, "unitKind");
        pushEngineFieldMatching(matchings, probe, "routeFamily");
        pushEngineFieldMatching(matchings, probe, "nominalizationKind");
        pushEngineFieldMatching(matchings, probe, "denominalFamily");
        if (Object.prototype.hasOwnProperty.call(probe, "deverbalRouteCount")) {
            matchings.push({
                layer: "engine-path-output",
                id: `${probe.id}.deverbalRouteCount`,
                routeId: probe.routeId || "",
                status: Number(probe.deverbalRouteCount || 0) > 0 ? "match" : "no-match",
                expected: ">0",
                actual: String(Number(probe.deverbalRouteCount || 0)),
            });
        }
    });
    return matchings;
}

function buildRouteRecordOutputMatchings(audit) {
    const routeRecords = Array.isArray(audit.routeRecords) ? audit.routeRecords : [];
    return routeRecords.flatMap((record) => {
        const routeCount = (Array.isArray(audit.obstacleCatalogRouteCounts) ? audit.obstacleCatalogRouteCounts : [])
            .find((entry) => entry.routeId === record.id)?.count || 0;
        const probeStatus = (Array.isArray(audit.probeStatuses) ? audit.probeStatuses : [])
            .find((entry) => entry.routeId === record.id) || {};
        return [
            {
                layer: "andrews-route-obstacle-catalog",
                id: `${record.id}.obstacleCatalog`,
                routeId: record.id,
                status: routeCount > 0 ? "match" : "no-match",
                expected: ">0",
                actual: String(routeCount),
            },
            {
                layer: "andrews-route-probe",
                id: `${record.id}.probeAvailable`,
                routeId: record.id,
                status: probeStatus.available === true ? "match" : "no-match",
                expected: "available",
                actual: probeStatus.available === true ? "available" : "missing",
            },
        ];
    });
}

function buildDimensionalCoordinateOutputMatchings(audit) {
    const dimensionalIndex = audit.dimensionalIndex || {};
    const coverage = dimensionalIndex.obstacleCoordinateCoverage || {};
    return [
        {
            layer: "andrews-dimensional-coordinate-coverage",
            id: "obstacleCatalogItemsHaveCoordinateFrames",
            status: coverage.allObstacleCatalogItemsHaveCoordinateFrame === true ? "match" : "no-match",
            expected: "true",
            actual: String(coverage.allObstacleCatalogItemsHaveCoordinateFrame === true),
        },
        {
            layer: "andrews-dimensional-coordinate-coverage",
            id: "functionUseGatesDownstreamAfterRouteFrame",
            status: coverage.functionUseGatesDownstreamAfterRouteFrame === true ? "match" : "no-match",
            expected: "true",
            actual: String(coverage.functionUseGatesDownstreamAfterRouteFrame === true),
        },
        {
            layer: "andrews-dimensional-coordinate-coverage",
            id: "valenceObjectGatesOwnedByValenceFrame",
            status: coverage.valenceObjectGatesOwnedByValenceFrame === true ? "match" : "no-match",
            expected: "true",
            actual: String(coverage.valenceObjectGatesOwnedByValenceFrame === true),
        },
        {
            layer: "andrews-dimensional-coordinate-coverage",
            id: "routeCoordinateCountMatchesRouteRecords",
            status: Number(dimensionalIndex.routeCoordinateCount || 0) === (Array.isArray(audit.routeRecords) ? audit.routeRecords.length : 0)
                ? "match"
                : "no-match",
            expected: String(Array.isArray(audit.routeRecords) ? audit.routeRecords.length : 0),
            actual: String(Number(dimensionalIndex.routeCoordinateCount || 0)),
        },
    ];
}

function buildStaticRouteFrameInvariantOutputMatchings() {
    return STATIC_ROUTE_FRAME_INVARIANT_PATTERNS.map((entry) => {
        const matches = getStaticInvariantPatternMatches(entry.pattern);
        return {
            layer: "andrews-static-route-frame-invariant",
            id: entry.id,
            status: matches.length === 0 ? "match" : "no-match",
            expected: "0",
            actual: String(matches.length),
            invariant: entry.invariant,
            matches,
        };
    });
}

function pushSimpleMatching(matchings, layer, id, actualValue, expectedValue = true) {
    const actual = typeof actualValue === "boolean" ? actualValue : String(actualValue);
    const expected = typeof expectedValue === "boolean" ? expectedValue : String(expectedValue);
    matchings.push({
        layer,
        id,
        status: actual === expected ? "match" : "no-match",
        expected: String(expected),
        actual: String(actual),
    });
}

function buildEntradaGrammarObjectLayeringOutputMatchings(context) {
    const layer = "entrada-grammar-object-layering";
    if (
        typeof context.parseMovingTargetRegexInput !== "function"
        || typeof context.buildEntradaGrammarObjectFromMovingTargetParsed !== "function"
    ) {
        return [{
            layer,
            id: "entradaGrammarObjectApi",
            status: "no-match",
            expected: "functions",
            actual: "missing",
        }];
    }
    try {
        const parsed = context.parseMovingTargetRegexInput("(a)+ta-(ish-kwi)");
        const sparse = context.buildEntradaGrammarObjectFromMovingTargetParsed("(a)+ta-(ish-kwi)", parsed);
        const partial = context.buildEntradaGrammarObjectFromMovingTargetParsed(
            "(a)+ta-(ish-kwi)",
            parsed,
            null,
            {
                sourceFormulaSlots: {
                    predicateStem: { slot: "STEM", stem: "kwi", displayStem: "kwi" },
                },
                sourceFormulaEcho: "#Ø-ta(kwi)Ø#",
            }
        );
        const fixed = context.buildEntradaGrammarObjectFromMovingTargetParsed(
            "(a)+ta-(ish-kwi)",
            parsed,
            null,
            {
                sourceFormulaSlots: {
                    predicateStem: { slot: "STEM", stem: "kwi", displayStem: "kwi" },
                    obj1: { slot: "obj1", token: "ta", displayPrefix: "ta" },
                },
                sourceFormulaEcho: "#Ø-ta(kwi)Ø#",
            }
        );
        const allomorphic = typeof context.buildEntradaGrammarObjectFromCanonicalVerbSpec === "function"
            ? context.buildEntradaGrammarObjectFromCanonicalVerbSpec(
                {
                    matrixStem: "mati",
                    matrixRuleBase: "mati",
                    adjacentEmbed: "",
                    transitivity: "transitive",
                    valenceTokens: ["metz"],
                    valenceEmbeds: [],
                },
                {
                    rawInput: "metzmati",
                    sourceFormulaSlots: {
                        predicateStem: { slot: "STEM", stem: "ati", displayStem: "ati" },
                        obj1: { slot: "obj1", token: "m-etz", displayPrefix: "m-etz" },
                    },
                    sourceFormulaEcho: "#0-0+m-etz(ati)0+0-0#",
                }
            )
            : null;
        const expectedLayerOrder = "morph-boundary-frame>formula-boundary>stem-frame>valence-frame>object-frame>route-frame>function-use-frame";
        const matchings = [];
        pushSimpleMatching(matchings, layer, "sparse.kind", sparse?.kind || "", "andrews-entrada-grammar-object");
        pushSimpleMatching(matchings, layer, "sparse.layerOrder", (sparse?.layerOrder || []).join(">"), expectedLayerOrder);
        pushSimpleMatching(matchings, layer, "sparse.morphBoundaryFirst", (sparse?.layerOrder || [])[0] || "", "morph-boundary-frame");
        pushSimpleMatching(matchings, layer, "sparse.morphBoundaryBeforeFormula", sparse?.morphBoundaryFrame?.beforeFormulaBoundary === true);
        pushSimpleMatching(matchings, layer, "sparse.formulaConsumesMorphEvidence", sparse?.morphBoundaryFrame?.formulaBoundaryConsumesMorphEvidence === true);
        pushSimpleMatching(matchings, layer, "sparse.candidateSlotsDoNotLicenseFunctionUse", sparse?.formulaBoundaryFrame?.candidateSlotsDoNotLicenseFunctionUse === true);
        pushSimpleMatching(matchings, layer, "sparse.objectVectorObj1", sparse?.objectFrame?.vector?.obj1 || "", "ta");
        pushSimpleMatching(matchings, layer, "sparse.valenceFrameUnfixed", sparse?.valenceFrame?.frameFixed === false);
        pushSimpleMatching(matchings, layer, "sparse.routeRankingBlocked", sparse?.routeFrame?.routeRankingAllowed === false);
        pushSimpleMatching(matchings, layer, "sparse.functionUseDownstream", sparse?.functionUseFrame?.downstreamOfValenceFrame === true);
        pushSimpleMatching(matchings, layer, "sparse.functionUseAnnotatesOnly", sparse?.functionUseFrame?.mayAnnotateLicensedReadingsOnly === true);
        pushSimpleMatching(matchings, layer, "sparse.functionUseCannotConsume", sparse?.functionUseFrame?.consumesValenceObjectStructure === false);
        pushSimpleMatching(matchings, layer, "sparse.functionUseCannotCreate", sparse?.functionUseFrame?.createsValenceObjectStructure === false);
        pushSimpleMatching(matchings, layer, "sparse.functionUseCannotRelocate", sparse?.functionUseFrame?.relocatesValenceObjectStructure === false);
        pushSimpleMatching(matchings, layer, "sparse.functionUseCannotReclassify", sparse?.functionUseFrame?.reclassifiesValenceObjectStructure === false);
        pushSimpleMatching(matchings, layer, "partial.formulaBoundaryFixed", partial?.formulaBoundaryFrame?.frameFixed === true);
        pushSimpleMatching(matchings, layer, "partial.objectSlotsNotCovered", partial?.formulaBoundaryFrame?.objectSlotsCovered === false);
        pushSimpleMatching(matchings, layer, "partial.valenceFrameStillUnfixed", partial?.valenceFrame?.frameFixed === false);
        pushSimpleMatching(matchings, layer, "fixed.formulaBoundaryFixed", fixed?.formulaBoundaryFrame?.frameFixed === true);
        pushSimpleMatching(matchings, layer, "fixed.objectSlotsCovered", fixed?.formulaBoundaryFrame?.objectSlotsCovered === true);
        pushSimpleMatching(matchings, layer, "fixed.valenceFrameFixed", fixed?.valenceFrame?.frameFixed === true);
        pushSimpleMatching(matchings, layer, "fixed.objectFrameFixed", fixed?.objectFrame?.frameFixed === true);
        pushSimpleMatching(matchings, layer, "fixed.routeRankingAllowed", fixed?.routeFrame?.routeRankingAllowed === true);
        pushSimpleMatching(matchings, layer, "allomorphic.objectFormulaMorphEarly", allomorphic?.morphBoundaryFrame?.objectMorphs?.[0]?.formulaMorph || "", "m-etz");
        pushSimpleMatching(matchings, layer, "allomorphic.objectSurfaceMorphEarly", allomorphic?.morphBoundaryFrame?.objectMorphs?.[0]?.surfaceMorph || "", "metz");
        pushSimpleMatching(matchings, layer, "allomorphic.governingSlotEarly", allomorphic?.morphBoundaryFrame?.objectMorphs?.[0]?.governingSlotId || "", "va1-va2");
        pushSimpleMatching(matchings, layer, "allomorphic.governingPathEarly", allomorphic?.morphBoundaryFrame?.objectMorphs?.[0]?.governingPath || "", "dyadic-specific-projective-non-third");
        pushSimpleMatching(matchings, layer, "allomorphic.governingVa2Early", allomorphic?.morphBoundaryFrame?.objectMorphs?.[0]?.va2?.morph || "", "etz");
        pushSimpleMatching(matchings, layer, "allomorphic.stemShapeEarly", allomorphic?.morphBoundaryFrame?.stemAllomorphs?.[0]?.formulaMorph || "", "ati");
        pushSimpleMatching(matchings, layer, "allomorphic.formulaSlotsCoverSurfaceObject", allomorphic?.formulaBoundaryFrame?.objectSlotsCovered === true);
        pushSimpleMatching(matchings, layer, "allomorphic.valenceFrameFixed", allomorphic?.valenceFrame?.frameFixed === true);
        pushSimpleMatching(matchings, layer, "allomorphic.functionUseStillLast", allomorphic?.functionUseFrame?.evaluationOrder || "", "last");
        return matchings;
    } catch (error) {
        return [{
            layer,
            id: "entradaGrammarObjectProbe",
            status: "no-match",
            expected: "no-error",
            actual: error?.message || String(error),
        }];
    }
}

function getSourceLineNumber(source = "", index = 0) {
    return String(source || "").slice(0, Math.max(0, index)).split(/\r?\n/).length;
}

function collectCoreFunctionCalls(functionName = "") {
    return getJavascriptFilesInDir(path.join(ROOT, "src", "core"))
        .flatMap((fullPath) => {
            const relativePath = path.relative(ROOT, fullPath);
            return collectFunctionCallExpressions(relativePath, functionName)
                .filter((call) => !String(call.source || "").slice(Math.max(0, call.start - 12), call.start).endsWith("function "))
                .map((call) => ({
                    ...call,
                    line: getSourceLineNumber(call.source, call.start),
                    id: `${relativePath}:${getSourceLineNumber(call.source, call.start)}`,
                }));
        });
}

function callTextHasField(call = null, fieldName = "") {
    const text = String(call?.text || "");
    return new RegExp(`${regexEscape(fieldName)}\\s*:`).test(text)
        || new RegExp(`\\b${regexEscape(fieldName)}\\b`).test(text);
}

function buildGenerationValencyObjectMutationStaticOutputMatchings() {
    const layer = "generation-valency-object-slot-mutation-static-gate";
    const directCalls = collectCoreFunctionCalls("buildGenerationValencyObjectSlotMutationGate");
    const helperCalls = collectCoreFunctionCalls("buildMorphologyValencyObjectSlotMutationGate");
    if (!directCalls.length && !helperCalls.length) {
        return [{
            layer,
            id: "valencyObjectSlotMutationCallSites",
            status: "no-match",
            expected: ">0",
            actual: "0",
        }];
    }
    const matchings = [];
    directCalls.forEach((call) => {
        const containingFunctionName = getCallContainingFunctionName(call);
        const isMorphologyWrapper = containingFunctionName === "buildMorphologyValencyObjectSlotMutationGate"
            || String(call.source || "").slice(Math.max(0, call.start - 1000), call.start)
                .includes("const buildMorphologyValencyObjectSlotMutationGate");
        pushSimpleMatching(matchings, layer, `${call.id}.operationField`, callTextHasField(call, "operation"));
        pushSimpleMatching(matchings, layer, `${call.id}.mutationKindField`, callTextHasField(call, "mutationKind"));
        if (isMorphologyWrapper) {
            const functionSource = getCallContainingFunctionSource(call);
            const wrapperSource = functionSource || String(call.source || "").slice(Math.max(0, call.start - 1000), call.end + 800);
            [
                "entradaGrammarObject",
                "sourceFrame",
                "sourceRouteFrame",
                "routeFrame",
                "valenceFrameFixed",
                "sourceValenceFrameFixed",
                "requireFixedValenceFrame",
            ].forEach((token) => {
                pushSimpleMatching(
                    matchings,
                    layer,
                    `${call.id}.wrapperForwards.${token}`,
                    wrapperSource.includes(token)
                );
            });
        } else {
            pushSimpleMatching(matchings, layer, `${call.id}.blockedBeforeMutation`, callAssignedVariableHasBlockedGuard(call));
        }
    });
    helperCalls.forEach((call) => {
        pushSimpleMatching(matchings, layer, `${call.id}.operationField`, callTextHasField(call, "operation"));
        pushSimpleMatching(matchings, layer, `${call.id}.mutationKindField`, callTextHasField(call, "mutationKind"));
        pushSimpleMatching(matchings, layer, `${call.id}.blockedBeforeMutation`, callAssignedVariableHasBlockedGuard(call));
    });
    return matchings;
}

function buildGenerationValencyObjectMutationRuntimeOutputMatchings(context) {
    const layer = "generation-valency-object-slot-mutation-runtime-gate";
    if (
        typeof context.buildGenerationValencyObjectSlotMutationGate !== "function"
        || typeof context.parseMovingTargetRegexInput !== "function"
        || typeof context.buildEntradaGrammarObjectFromMovingTargetParsed !== "function"
    ) {
        return [{
            layer,
            id: "generationValencyObjectSlotMutationApi",
            status: "no-match",
            expected: "functions",
            actual: "missing",
        }];
    }
    try {
        const parsed = context.parseMovingTargetRegexInput("(a)+ta-(ish-kwi)");
        const sparseEntrada = context.buildEntradaGrammarObjectFromMovingTargetParsed("(a)+ta-(ish-kwi)", parsed);
        const fixedEntrada = context.buildEntradaGrammarObjectFromMovingTargetParsed(
            "(a)+ta-(ish-kwi)",
            parsed,
            null,
            {
                sourceFormulaSlots: {
                    predicateStem: { slot: "STEM", stem: "kwi", displayStem: "kwi" },
                    obj1: { slot: "obj1", token: "ta", displayPrefix: "ta" },
                },
                sourceFormulaEcho: "#Ø-ta(kwi)Ø#",
            }
        );
        const buildGate = (id, overrides = {}) => ({
            id,
            gate: context.buildGenerationValencyObjectSlotMutationGate({
                operation: `audit-${id}`,
                mutationKind: overrides.mutationKind || "delete-object-slot",
                sourceObj1: overrides.sourceObj1 ?? "ta",
                sourceBaseObj1: overrides.sourceBaseObj1 ?? "ta",
                sourceObj2: overrides.sourceObj2 ?? "",
                sourceObj3: overrides.sourceObj3 ?? "",
                targetObj1: overrides.targetObj1 ?? "",
                targetBaseObj1: overrides.targetBaseObj1 ?? "",
                targetObj2: overrides.targetObj2 ?? "",
                targetObj3: overrides.targetObj3 ?? "",
                options: overrides.options || {},
            }),
        });
        const probes = [
            buildGate("sparse-delete-blocked", {
                options: { entradaGrammarObject: sparseEntrada, requireFixedValenceFrame: true },
            }),
            buildGate("fixed-delete-passes", {
                options: { entradaGrammarObject: fixedEntrada, requireFixedValenceFrame: true },
            }),
            buildGate("sparse-relocate-blocked", {
                mutationKind: "relocate-or-reclassify-object-slot",
                targetObj1: "ki",
                targetBaseObj1: "ki",
                options: { entradaGrammarObject: sparseEntrada, requireFixedValenceFrame: true },
            }),
            buildGate("sparse-create-blocked", {
                mutationKind: "create-object-slot",
                sourceObj1: "",
                sourceBaseObj1: "",
                targetObj1: "ta",
                targetBaseObj1: "ta",
                options: { entradaGrammarObject: sparseEntrada, requireFixedValenceFrame: true },
            }),
            buildGate("sparse-no-mutation-passes", {
                mutationKind: "none",
                targetObj1: "ta",
                targetBaseObj1: "ta",
                options: { entradaGrammarObject: sparseEntrada, requireFixedValenceFrame: true },
            }),
        ];
        const expectedStatuses = {
            "sparse-delete-blocked": "blocked",
            "fixed-delete-passes": "pass",
            "sparse-relocate-blocked": "blocked",
            "sparse-create-blocked": "blocked",
            "sparse-no-mutation-passes": "pass",
        };
        return probes.flatMap(({ id, gate }) => {
            const matchings = [];
            pushSimpleMatching(matchings, layer, `${id}.status`, gate?.status || "", expectedStatuses[id]);
            pushSimpleMatching(matchings, layer, `${id}.routeRankingAllowed`, gate?.routeRankingAllowed === (expectedStatuses[id] !== "blocked"));
            pushSimpleMatching(matchings, layer, `${id}.generationAllowed`, gate?.generationAllowed === (expectedStatuses[id] !== "blocked"));
            pushSimpleMatching(matchings, layer, `${id}.hardGateBoundary`, gate?.boundaries?.unresolvedValenceFrameIsHardGate === true);
            return matchings;
        });
    } catch (error) {
        return [{
            layer,
            id: "generationValencyObjectSlotMutationProbe",
            status: "no-match",
            expected: "no-error",
            actual: error?.message || String(error),
        }];
    }
}

function collectFunctionUseStructuralMutationCandidates() {
    const functionUsePattern = /functionUse|function-use|FunctionUse|adjectival.*function|ownerhood|adverbial.*continuation|complement.*continuation|compound.*continuation/i;
    const structuralMutationPattern = /setCurrentObjectPrefix\(|\b(?:obj1|obj2|obj3|objectPrefix|indirectObjectMarker|thirdObjectMarker|baseObj1Slot|baseObjectPrefix)\s*=|VerbComposerState\.|routeRankingAllowed\s*:\s*true|generationAllowed\s*:\s*true/i;
    const gatePattern = /functionUseValenceGate|buildFunctionUseValenceObjectHardGate|shouldBlockComposerFunctionUseValenceRouteAction|buildAndrewsCnvCnnBackAndForthRouteActionContract|buildGenerationValencyObjectSlotMutationGate|buildMorphologyValencyObjectSlotMutationGate|valencyObjectSlotGate|applyAndrewsCnvCnnRouteActionHardGateState|isAndrewsCnvCnnRouteActionFunctionUseHardBlocked/i;
    return [
        path.join(ROOT, "src", "core"),
        path.join(ROOT, "src", "ui"),
    ].flatMap(getJavascriptFilesInDir)
        .flatMap((fullPath) => {
            const relativePath = path.relative(ROOT, fullPath);
            return collectTopLevelFunctionSources(relativePath)
                .filter((entry) => functionUsePattern.test(entry.text))
                .filter((entry) => structuralMutationPattern.test(entry.text))
                .filter((entry) => !gatePattern.test(entry.text))
                .map((entry) => ({
                    ...entry,
                    key: `${relativePath}:${entry.name}`,
                    id: `${relativePath}:${entry.line}.${entry.name}`,
                }));
        });
}

function buildFunctionUseStructuralMutationInventoryOutputMatchings() {
    const layer = "function-use-structural-mutation-inventory";
    const candidates = collectFunctionUseStructuralMutationCandidates();
    const matchings = [];
    candidates.forEach((candidate) => {
        const expectation = FUNCTION_USE_STRUCTURAL_SCAN_EXPECTATIONS[candidate.key];
        if (!expectation) {
            matchings.push({
                layer,
                id: `${candidate.id}.classified`,
                status: "no-match",
                expected: "classified",
                actual: "unclassified",
            });
            return;
        }
        pushSimpleMatching(matchings, layer, `${candidate.id}.classified`, expectation.category || "", expectation.category || "");
        (Array.isArray(expectation.requiredTokens) ? expectation.requiredTokens : []).forEach((token) => {
            pushSimpleMatching(
                matchings,
                layer,
                `${candidate.id}.requiredToken.${token}`,
                candidate.text.includes(token)
            );
        });
    });
    const missingExpected = Object.keys(FUNCTION_USE_STRUCTURAL_SCAN_EXPECTATIONS)
        .filter((key) => !candidates.some((candidate) => candidate.key === key));
    missingExpected.forEach((key) => {
        matchings.push({
            layer,
            id: `${key}.expectedCandidate`,
            status: "no-match",
            expected: "present",
            actual: "missing",
        });
    });
    if (!matchings.length) {
        matchings.push({
            layer,
            id: "structuralCandidateInventory",
            status: "no-match",
            expected: ">0",
            actual: "0",
        });
    }
    return matchings;
}

function collectFinalFormulaShapeFunctions() {
    return getJavascriptFilesInDir(path.join(ROOT, "src", "core"))
        .flatMap((fullPath) => {
            const relativePath = path.relative(ROOT, fullPath);
            return collectTopLevelFunctionSources(relativePath)
                .filter((entry) => /finalFormulaShape/.test(entry.text))
                .map((entry) => ({
                    ...entry,
                    key: `${relativePath}:${entry.name}`,
                    id: `${relativePath}:${entry.line}.${entry.name}`,
                }));
        });
}

function buildFinalFormulaShapeRouteFrameInventoryOutputMatchings() {
    const layer = "final-formula-shape-route-frame-inventory";
    const candidates = collectFinalFormulaShapeFunctions();
    const matchings = [];
    candidates.forEach((candidate) => {
        const expectation = FINAL_FORMULA_SHAPE_ROUTE_FRAME_EXPECTATIONS[candidate.key];
        if (!expectation) {
            matchings.push({
                layer,
                id: `${candidate.id}.classified`,
                status: "no-match",
                expected: "classified",
                actual: "unclassified",
            });
            return;
        }
        pushSimpleMatching(matchings, layer, `${candidate.id}.classified`, expectation.category || "", expectation.category || "");
        (Array.isArray(expectation.requiredTokens) ? expectation.requiredTokens : []).forEach((token) => {
            pushSimpleMatching(
                matchings,
                layer,
                `${candidate.id}.requiredToken.${token}`,
                candidate.text.includes(token)
            );
        });
    });
    Object.keys(FINAL_FORMULA_SHAPE_ROUTE_FRAME_EXPECTATIONS)
        .filter((key) => !candidates.some((candidate) => candidate.key === key))
        .forEach((key) => {
            matchings.push({
                layer,
                id: `${key}.expectedCandidate`,
                status: "no-match",
                expected: "present",
                actual: "missing",
            });
        });
    if (!matchings.length) {
        matchings.push({
            layer,
            id: "finalFormulaShapeInventory",
            status: "no-match",
            expected: ">0",
            actual: "0",
        });
    }
    return matchings;
}

function layerHasNoNoMatches(outputMatchings = [], layer = "") {
    return outputMatchings
        .filter((entry) => entry.layer === layer)
        .every((entry) => entry.status === "match");
}

function buildCompletionRequirementOutputMatchings(audit = null, baseOutputMatchings = []) {
    const layer = "objective-completion-requirement";
    const coverage = audit?.dimensionalIndex?.obstacleCoordinateCoverage || {};
    const requirements = [
        {
            id: "seven-routes-and-1576-obstacle-coordinates",
            actual: (Array.isArray(audit?.routeRecords) ? audit.routeRecords.length : 0) === 7
                && Number(audit?.dimensionalIndex?.obstacleCoordinateCount || 0) === 1576
                && coverage.allObstacleCatalogItemsHaveCoordinateFrame === true,
        },
        {
            id: "function-use-downstream-of-route-and-valence-frames",
            actual: coverage.functionUseGatesDownstreamAfterRouteFrame === true
                && coverage.valenceObjectGatesOwnedByValenceFrame === true
                && layerHasNoNoMatches(baseOutputMatchings, "andrews-dimensional-coordinate-coverage"),
        },
        {
            id: "sparse-entrada-de-superposed-before-function-use",
            actual: layerHasNoNoMatches(baseOutputMatchings, "entrada-grammar-object-layering"),
        },
        {
            id: "function-use-structural-mutations-inventoried-and-gated",
            actual: layerHasNoNoMatches(baseOutputMatchings, "function-use-structural-mutation-inventory")
                && layerHasNoNoMatches(baseOutputMatchings, "composer-function-use-mutation-hard-gate")
                && layerHasNoNoMatches(baseOutputMatchings, "composer-function-use-mutation-static-gate"),
        },
        {
            id: "object-valence-mutations-hard-gated-before-generation",
            actual: layerHasNoNoMatches(baseOutputMatchings, "generation-valency-object-slot-mutation-static-gate")
                && layerHasNoNoMatches(baseOutputMatchings, "generation-valency-object-slot-mutation-runtime-gate"),
        },
        {
            id: "route-ranking-and-ui-actions-block-unfixed-function-use",
            actual: layerHasNoNoMatches(baseOutputMatchings, "rendering-function-use-continuation-forwarding")
                && layerHasNoNoMatches(baseOutputMatchings, "visible-continuation-route"),
        },
        {
            id: "compound-incorporation-route-frames-carry-required-fields",
            actual: layerHasNoNoMatches(baseOutputMatchings, "route-frame-completeness"),
        },
        {
            id: "final-formula-shape-does-not-license-role-or-object-slots",
            actual: layerHasNoNoMatches(baseOutputMatchings, "final-formula-shape-route-frame-inventory")
                && layerHasNoNoMatches(baseOutputMatchings, "andrews-static-route-frame-invariant"),
        },
        {
            id: "shared-final-formula-shape-retains-object-adverb-complement-role-effects",
            actual: layerHasNoNoMatches(baseOutputMatchings, "shared-final-formula-route-frame"),
        },
    ];
    return requirements.map((requirement) => ({
        layer,
        id: requirement.id,
        status: requirement.actual === true ? "match" : "no-match",
        expected: "true",
        actual: String(requirement.actual === true),
    }));
}

function pushComposerMutationGateFieldMatching(matchings, entry, field, expected) {
    matchings.push({
        layer: "composer-function-use-mutation-hard-gate",
        id: `${entry.id}.${field}`,
        routeId: entry.routeRecordId,
        status: String(entry.actual?.[field]) === String(expected) ? "match" : "no-match",
        expected: String(expected),
        actual: String(entry.actual?.[field]),
    });
}

function buildComposerFunctionUseMutationHardGateOutputMatchings(context) {
    if (typeof context.buildAndrewsCnvCnnBackAndForthRouteActionContract !== "function") {
        return [{
            layer: "composer-function-use-mutation-hard-gate",
            id: "buildAndrewsCnvCnnBackAndForthRouteActionContract",
            status: "no-match",
            expected: "function",
            actual: "missing",
        }];
    }
    return COMPOSER_FUNCTION_USE_MUTATION_ROUTE_ACTION_EXPECTATIONS.flatMap((entry) => {
        const contract = context.buildAndrewsCnvCnnBackAndForthRouteActionContract({
            dataset: entry.dataset,
            objectPrefix: entry.objectPrefix || "",
        }, {
            routeRecordId: entry.routeRecordId,
            generationAllowed: true,
        });
        const actual = {
            gateStatus: contract?.functionUseValenceGate?.status || "",
            reason: contract?.functionUseValenceGate?.reason || "",
            routeRankingAllowed: contract?.routeRankingAllowed === true,
            generationAllowed: contract?.generationAllowed === true,
            diagnosticOnly: contract?.diagnosticOnly === true,
            sourceRouteFrameRequired: contract?.sourceRouteFrameRequired === true,
            boundariesInstalled: contract?.functionUseValenceGate?.boundaries?.unresolvedValenceFrameIsHardGate === true
                && contract?.functionUseValenceGate?.boundaries?.functionUseMayAnnotateLicensedReadingsOnly === true,
        };
        const matchingEntry = { ...entry, actual };
        const matchings = [];
        pushComposerMutationGateFieldMatching(matchings, matchingEntry, "gateStatus", "blocked");
        pushComposerMutationGateFieldMatching(matchings, matchingEntry, "reason", "route-action-function-use-valence-frame-unfixed");
        pushComposerMutationGateFieldMatching(matchings, matchingEntry, "routeRankingAllowed", false);
        pushComposerMutationGateFieldMatching(matchings, matchingEntry, "generationAllowed", false);
        pushComposerMutationGateFieldMatching(matchings, matchingEntry, "diagnosticOnly", true);
        pushComposerMutationGateFieldMatching(matchings, matchingEntry, "sourceRouteFrameRequired", true);
        pushComposerMutationGateFieldMatching(matchings, matchingEntry, "boundariesInstalled", true);
        return matchings;
    });
}

function buildComposerFunctionUseMutationStaticOutputMatchings() {
    return COMPOSER_FUNCTION_USE_MUTATION_STATIC_EXPECTATIONS.flatMap((entry) => {
        const source = getTopLevelFunctionSource("src/ui/composer/composer.js", entry.functionName);
        if (!source) {
            return [{
                layer: "composer-function-use-mutation-static-gate",
                id: `${entry.id}.functionSource`,
                status: "no-match",
                expected: "present",
                actual: "missing",
            }];
        }
        if (entry.delegateToken) {
            return [
                {
                    layer: "composer-function-use-mutation-static-gate",
                    id: `${entry.id}.delegatesToGatedFunction`,
                    status: source.includes(entry.delegateToken) ? "match" : "no-match",
                    expected: entry.delegateToken,
                    actual: source.includes(entry.delegateToken) ? entry.delegateToken : "missing",
                },
                {
                    layer: "composer-function-use-mutation-static-gate",
                    id: `${entry.id}.delegatesRouteDataset`,
                    status: source.includes(entry.delegatedRouteDatasetToken) ? "match" : "no-match",
                    expected: entry.delegatedRouteDatasetToken,
                    actual: source.includes(entry.delegatedRouteDatasetToken) ? entry.delegatedRouteDatasetToken : "missing",
                },
                {
                    layer: "composer-function-use-mutation-static-gate",
                    id: `${entry.id}.delegatesGateArg`,
                    status: source.includes(entry.delegatedGateArgToken) ? "match" : "no-match",
                    expected: entry.delegatedGateArgToken,
                    actual: source.includes(entry.delegatedGateArgToken) ? entry.delegatedGateArgToken : "missing",
                },
            ];
        }
        const guardIndex = source.indexOf(entry.guardToken);
        const blockIndex = source.indexOf(entry.blockToken);
        const mutationIndex = firstIndexOfAny(source, entry.mutationTokens);
        return [
            {
                layer: "composer-function-use-mutation-static-gate",
                id: `${entry.id}.guardBeforeBlock`,
                status: guardIndex >= 0 && blockIndex > guardIndex ? "match" : "no-match",
                expected: "guard-before-block",
                actual: `guard=${guardIndex};block=${blockIndex}`,
            },
            {
                layer: "composer-function-use-mutation-static-gate",
                id: `${entry.id}.blockBeforeMutation`,
                status: blockIndex >= 0 && mutationIndex > blockIndex ? "match" : "no-match",
                expected: "block-before-mutation",
                actual: `block=${blockIndex};mutation=${mutationIndex}`,
            },
        ];
    });
}

function buildRenderingFunctionUseContinuationForwardingOutputMatchings() {
    return RENDERING_FUNCTION_USE_CONTINUATION_FORWARDING_EXPECTATIONS.flatMap((functionName) => {
        const blocks = collectFunctionCallBlocks("src/ui/rendering/rendering.js", functionName);
        if (!blocks.length) {
            return [{
                layer: "rendering-function-use-continuation-forwarding",
                id: `${functionName}.callBlocks`,
                status: "no-match",
                expected: ">0",
                actual: "0",
            }];
        }
        return blocks.map((block, index) => ({
            layer: "rendering-function-use-continuation-forwarding",
            id: `${functionName}.${index}.routeOwnershipOptions`,
            status: block.includes("getFunctionUseContinuationRouteOwnershipOptions(contract)") ? "match" : "no-match",
            expected: "getFunctionUseContinuationRouteOwnershipOptions(contract)",
            actual: block.includes("getFunctionUseContinuationRouteOwnershipOptions(contract)") ? "present" : "missing",
        }));
    });
}

function collectRouteFrameCompletenessSamples(context) {
    const samples = [];
    const addSample = (id, frame) => {
        if (frame && typeof frame === "object") {
            samples.push({ id, frame });
        }
    };
    if (typeof context.buildLesson31CompoundNounstemPursuitFrame === "function") {
        const frame = context.buildLesson31CompoundNounstemPursuitFrame();
        addSample("lesson31.compoundNounstemRouteFrame", frame?.compoundNounstemRouteFrame);
    }
    if (typeof context.buildLesson35PreteritAgentivePursuitFrame === "function") {
        const frame = context.buildLesson35PreteritAgentivePursuitFrame();
        (Array.isArray(frame?.vncEmbedAdverbialFrame?.routeFrames) ? frame.vncEmbedAdverbialFrame.routeFrames : [])
            .forEach((routeFrame, index) => addSample(`lesson35.vncEmbedAdverbialFrame.routeFrames.${index}`, routeFrame));
    }
    if (typeof context.buildLesson39PatientiveOperationsPursuitFrame === "function") {
        const frame = context.buildLesson39PatientiveOperationsPursuitFrame();
        addSample("lesson39.incorporatedComplementFrame.incorporationRouteFrame", frame?.incorporatedComplementFrame?.incorporationRouteFrame);
        addSample("lesson39.incorporatedObjectFrame.incorporationRouteFrame", frame?.incorporatedObjectFrame?.incorporationRouteFrame);
    }
    if (typeof context.buildLesson41AdjectivalNncPursuitFrame === "function") {
        const frame = context.buildLesson41AdjectivalNncPursuitFrame();
        (Array.isArray(frame?.compoundVerbstemNominalEmbedFrame?.routeFrames) ? frame.compoundVerbstemNominalEmbedFrame.routeFrames : [])
            .forEach((routeFrame, index) => addSample(`lesson41.compoundVerbstemNominalEmbedFrame.routeFrames.${index}`, routeFrame));
    }
    if (typeof context.parseVerbInput === "function") {
        const parsed = context.parseVerbInput("(a)+ta-(ish-kwi)");
        addSample("parser.compoundAst.routeFrame", parsed?.compoundAst?.routeFrame);
    }
    if (typeof context.buildDerivationContinuationIncorporationRouteFrame === "function") {
        const routeSpecs = [
            { id: "derivation.sharedShape.object", role: "incorporated-object", root: "kal", matrix: "mati", valency: "transitive" },
            { id: "derivation.sharedShape.complement", role: "incorporated-complement", root: "kal", matrix: "mati", valency: "transitive" },
            { id: "derivation.sharedShape.adverb", role: "incorporated-adverb", root: "kal", matrix: "nemi", valency: "intransitive" },
        ];
        routeSpecs.forEach((spec) => {
            addSample(spec.id, context.buildDerivationContinuationIncorporationRouteFrame({
                outputKind: `${spec.role}-continuation-contract`,
                grammarSource: "Andrews route-frame completeness probe",
                supported: true,
                sourceSurface: "source-vnc",
                sourceFormulaSlots: {
                    obj1: { slot: "obj1", prefix: "ki" },
                    predicateStem: { slot: "STEM", stem: "source" },
                },
                incorporatedRoot: spec.root,
                formationFrame: {
                    incorporated: {
                        role: spec.role,
                        root: spec.root,
                    },
                    matrix: {
                        root: spec.matrix,
                        valency: spec.valency,
                    },
                },
            }, {
                outputKind: `${spec.role}-continuation-contract`,
                supported: true,
                targetInput: "-(kal/mati)",
                routeStage: "preview-continuation",
                andrewsRefs: ["Andrews route-frame completeness probe"],
            }));
        });
    }
    return samples;
}

function getRouteFrameCompletenessFieldValue(frame = null, field = "") {
    const sourcePrincipal = frame?.sourcePrincipalVnc || frame?.sourcePrincipalNnc || null;
    switch (field) {
        case "kind":
            return Boolean(String(frame?.kind || "").trim());
        case "sourcePrincipal":
            return Boolean(sourcePrincipal && typeof sourcePrincipal === "object");
        case "sourceAdjunctNnc":
            return Boolean(
                (frame?.sourceAdjunctNnc && typeof frame.sourceAdjunctNnc === "object")
                || (Array.isArray(frame?.sourceAdjunctNncs) && frame.sourceAdjunctNncs.length > 0)
            );
        case "matrixValence":
            return Boolean(String(frame?.matrixValence || "").trim());
        case "embedRole":
            return Boolean(String(frame?.embedRole || "").trim());
        case "consumedObjectSlot":
            return Object.prototype.hasOwnProperty.call(frame || {}, "consumedObjectSlot");
        case "valenceDelta":
            return Object.prototype.hasOwnProperty.call(frame || {}, "valenceDelta");
        case "remainingExternalObjectSlots":
            return Array.isArray(frame?.remainingExternalObjectSlots);
        case "andrewsSection":
            return Boolean(String(frame?.andrewsSection || "").trim());
        case "generationStatus":
            return Boolean(String(frame?.generationStatus || "").trim());
        case "sourceRouteFrameRequired":
            return frame?.sourceRouteFrameRequired === true;
        case "finalFormulaShapeDoesNotLicenseObjectSlots":
            return frame?.finalFormulaShapeDoesNotLicenseObjectSlots === true;
        case "functionUseDoesNotLicenseObjectSlots":
            return frame?.functionUseDoesNotLicenseObjectSlots === true;
        case "objectSlotOwnershipDoesNotBelongToFunctionUseOrFinalShape":
            return frame?.objectSlotOwnership?.functionUseOwnsObjectSlots === false
                && frame?.objectSlotOwnership?.finalFormulaShapeOwnsObjectSlots === false;
        case "routeObjectLicensingRequiresFixedMatrixValence":
            return frame?.routeFrameLicensesObjectSlotOwnership !== true
                || frame?.objectSlotOwnership?.matrixValenceFrameFixed === true;
        default:
            return false;
    }
}

function buildRouteFrameCompletenessOutputMatchings(context) {
    const samples = collectRouteFrameCompletenessSamples(context);
    if (!samples.length) {
        return [{
            layer: "route-frame-completeness",
            id: "samples",
            status: "no-match",
            expected: ">0",
            actual: "0",
        }];
    }
    return samples.flatMap((sample) => ROUTE_FRAME_COMPLETENESS_FIELDS.map((field) => ({
        layer: "route-frame-completeness",
        id: `${sample.id}.${field}`,
        status: getRouteFrameCompletenessFieldValue(sample.frame, field) ? "match" : "no-match",
        expected: "true",
        actual: String(getRouteFrameCompletenessFieldValue(sample.frame, field)),
    })));
}

function buildSharedFinalFormulaRouteFrameOutputMatchings(context) {
    const layer = "shared-final-formula-route-frame";
    if (typeof context.buildDerivationContinuationIncorporationRouteFrame !== "function") {
        return [{
            layer,
            id: "buildDerivationContinuationIncorporationRouteFrame",
            status: "no-match",
            expected: "function",
            actual: "missing",
        }];
    }
    const specs = [
        { id: "object", role: "incorporated-object", matrix: "mati", valency: "transitive" },
        { id: "complement", role: "incorporated-complement", matrix: "mati", valency: "transitive" },
        { id: "adverb", role: "incorporated-adverb", matrix: "nemi", valency: "intransitive" },
    ];
    const buildFrame = (spec, includeMatrixValence = true) => context.buildDerivationContinuationIncorporationRouteFrame({
        outputKind: `audit-${spec.role}-continuation-contract`,
        grammarSource: "Andrews shared final formula route-frame audit",
        supported: true,
        sourceSurface: "source-vnc",
        sourceFormulaSlots: {
            obj1: { slot: "obj1", prefix: "ki" },
            predicateStem: { slot: "STEM", stem: "source" },
        },
        incorporatedRoot: "kal",
        formationFrame: {
            incorporated: {
                role: spec.role,
                root: "kal",
            },
            matrix: {
                root: spec.matrix,
                ...(includeMatrixValence ? { valency: spec.valency } : {}),
            },
        },
    }, {
        outputKind: `audit-${spec.role}-continuation-contract`,
        supported: true,
        targetInput: `-(kal/${spec.matrix})`,
        routeStage: "preview-continuation",
        andrewsRefs: ["Andrews shared final formula route-frame audit"],
    });
    try {
        const frames = specs.map((spec) => buildFrame(spec));
        const unresolvedMatrixValenceFrame = buildFrame(specs[0], false);
        const finalShapes = frames.map((frame) => frame?.finalFormulaShape || "");
        const roles = frames.map((frame) => frame?.embedRole || "");
        const consumedSlots = frames.map((frame) => frame?.consumedObjectSlot || "");
        const effectSignatures = frames.map((frame) => [
            frame?.valenceEffects?.stemInternalObjectSlotDelta ?? null,
            frame?.valenceEffects?.complementSlotDelta ?? null,
            frame?.valenceEffects?.adverbialFunctionDelta ?? null,
        ].join(":"));
        const matchings = [];
        pushSimpleMatching(matchings, layer, "sameFinalFormulaShape", new Set(finalShapes).size === 1 && Boolean(finalShapes[0]));
        pushSimpleMatching(matchings, layer, "distinctEmbedRoles", roles.join("|"), "incorporated-object|incorporated-complement|incorporated-adverb");
        pushSimpleMatching(matchings, layer, "consumedSlotsStayRouteOwned", consumedSlots.join("|"), "obj1|complement|");
        pushSimpleMatching(matchings, layer, "valenceEffectSignaturesDiffer", effectSignatures.join("|"), "1:0:0|0:1:0|0:0:1");
        pushSimpleMatching(matchings, layer, "sourcePrincipalVncCarried", frames.every((frame) => Boolean(frame?.sourcePrincipalVnc)));
        pushSimpleMatching(matchings, layer, "sourceAdjunctNncCarried", frames.every((frame) => Boolean(frame?.sourceAdjunctNnc)));
        pushSimpleMatching(matchings, layer, "matrixValenceCarried", frames.every((frame) => Boolean(String(frame?.matrixValence || "").trim())));
        pushSimpleMatching(matchings, layer, "routeFrameLicensesEmbedRole", frames.every((frame) => frame?.routeFrameLicensesEmbedRole === true));
        pushSimpleMatching(matchings, layer, "routeFrameRequiresFixedMatrixValenceForObjectSlots", frames.every((frame) => frame?.routeFrameLicensesObjectSlotOwnership === true));
        pushSimpleMatching(matchings, layer, "sourceRouteFrameRequired", frames.every((frame) => frame?.sourceRouteFrameRequired === true));
        pushSimpleMatching(matchings, layer, "finalShapeDoesNotLicenseRole", frames.every((frame) => frame?.finalFormulaShapeDoesNotLicenseRole === true));
        pushSimpleMatching(matchings, layer, "finalShapeDoesNotLicenseObjectSlots", frames.every((frame) => frame?.finalFormulaShapeDoesNotLicenseObjectSlots === true));
        pushSimpleMatching(matchings, layer, "functionUseDoesNotLicenseRole", frames.every((frame) => frame?.functionUseDoesNotLicenseRole === true));
        pushSimpleMatching(matchings, layer, "functionUseDoesNotLicenseObjectSlots", frames.every((frame) => frame?.functionUseDoesNotLicenseObjectSlots === true));
        pushSimpleMatching(matchings, layer, "objectSlotOwnershipNotFunctionUseOrFinalShape", frames.every((frame) => (
            frame?.objectSlotOwnership?.functionUseOwnsObjectSlots === false
            && frame?.objectSlotOwnership?.finalFormulaShapeOwnsObjectSlots === false
        )));
        pushSimpleMatching(matchings, layer, "unresolvedMatrixValenceBlocksObjectSlotLicensing", unresolvedMatrixValenceFrame?.routeFrameLicensesObjectSlotOwnership === false);
        pushSimpleMatching(matchings, layer, "unresolvedMatrixValenceFrameNotFixed", unresolvedMatrixValenceFrame?.objectSlotOwnership?.matrixValenceFrameFixed === false);
        pushSimpleMatching(matchings, layer, "unresolvedFinalShapeStillNotLicenseObjectSlots", unresolvedMatrixValenceFrame?.finalFormulaShapeDoesNotLicenseObjectSlots === true);
        return matchings;
    } catch (error) {
        return [{
            layer,
            id: "sharedFinalFormulaRouteFrameProbe",
            status: "no-match",
            expected: "no-error",
            actual: error?.message || String(error),
        }];
    }
}

function buildAuditOutputMatchings(context, audit) {
    const baseOutputMatchings = [
        ...buildVisibleContinuationOutputMatchings(context),
        ...buildEnginePathOutputMatchings(audit),
        ...buildRouteRecordOutputMatchings(audit),
        ...buildDimensionalCoordinateOutputMatchings(audit),
        ...buildStaticRouteFrameInvariantOutputMatchings(),
        ...buildEntradaGrammarObjectLayeringOutputMatchings(context),
        ...buildGenerationValencyObjectMutationStaticOutputMatchings(),
        ...buildGenerationValencyObjectMutationRuntimeOutputMatchings(context),
        ...buildFunctionUseStructuralMutationInventoryOutputMatchings(),
        ...buildFinalFormulaShapeRouteFrameInventoryOutputMatchings(),
        ...buildComposerFunctionUseMutationHardGateOutputMatchings(context),
        ...buildComposerFunctionUseMutationStaticOutputMatchings(),
        ...buildRenderingFunctionUseContinuationForwardingOutputMatchings(),
        ...buildRouteFrameCompletenessOutputMatchings(context),
        ...buildSharedFinalFormulaRouteFrameOutputMatchings(context),
    ];
    const outputMatchings = [
        ...baseOutputMatchings,
        ...buildCompletionRequirementOutputMatchings(audit, baseOutputMatchings),
    ];
    const outputNoMatches = outputMatchings.filter((entry) => entry.status !== "match");
    return {
        kind: "audit_output_matchings",
        version: 1,
        outputMatchingCount: outputMatchings.length,
        outputMatchCount: outputMatchings.length - outputNoMatches.length,
        outputNoMatchCount: outputNoMatches.length,
        outputNoMatches,
        outputMatchings,
    };
}

function main() {
    const { context } = createVmContext({ rootDir: ROOT });
    applyStaticData(context);
    if (typeof context.buildAndrewsCnvCnnBackAndForthAudit !== "function") {
        throw new Error("buildAndrewsCnvCnnBackAndForthAudit is not available in the runtime.");
    }
    const audit = context.buildAndrewsCnvCnnBackAndForthAudit();
    const auditOutputMatchings = buildAuditOutputMatchings(context, audit);
    if (process.argv.includes("--summary")) {
        const coverage = audit.dimensionalIndex?.obstacleCoordinateCoverage || {};
        const staticInvariantNoMatchCount = auditOutputMatchings.outputMatchings
            .filter((entry) => entry.layer === "andrews-static-route-frame-invariant" && entry.status !== "match")
            .length;
        const composerFunctionUseMutationNoMatchCount = auditOutputMatchings.outputMatchings
            .filter((entry) => entry.layer === "composer-function-use-mutation-hard-gate" && entry.status !== "match")
            .length;
        const composerFunctionUseMutationStaticNoMatchCount = auditOutputMatchings.outputMatchings
            .filter((entry) => entry.layer === "composer-function-use-mutation-static-gate" && entry.status !== "match")
            .length;
        const entradaGrammarObjectNoMatchCount = auditOutputMatchings.outputMatchings
            .filter((entry) => entry.layer === "entrada-grammar-object-layering" && entry.status !== "match")
            .length;
        const generationValencyMutationStaticNoMatchCount = auditOutputMatchings.outputMatchings
            .filter((entry) => entry.layer === "generation-valency-object-slot-mutation-static-gate" && entry.status !== "match")
            .length;
        const generationValencyMutationRuntimeNoMatchCount = auditOutputMatchings.outputMatchings
            .filter((entry) => entry.layer === "generation-valency-object-slot-mutation-runtime-gate" && entry.status !== "match")
            .length;
        const functionUseStructuralMutationInventoryNoMatchCount = auditOutputMatchings.outputMatchings
            .filter((entry) => entry.layer === "function-use-structural-mutation-inventory" && entry.status !== "match")
            .length;
        const finalFormulaShapeRouteFrameInventoryNoMatchCount = auditOutputMatchings.outputMatchings
            .filter((entry) => entry.layer === "final-formula-shape-route-frame-inventory" && entry.status !== "match")
            .length;
        const renderingFunctionUseForwardingNoMatchCount = auditOutputMatchings.outputMatchings
            .filter((entry) => entry.layer === "rendering-function-use-continuation-forwarding" && entry.status !== "match")
            .length;
        const routeFrameCompletenessNoMatchCount = auditOutputMatchings.outputMatchings
            .filter((entry) => entry.layer === "route-frame-completeness" && entry.status !== "match")
            .length;
        const sharedFinalFormulaRouteFrameNoMatchCount = auditOutputMatchings.outputMatchings
            .filter((entry) => entry.layer === "shared-final-formula-route-frame" && entry.status !== "match")
            .length;
        const completionRequirementNoMatchCount = auditOutputMatchings.outputMatchings
            .filter((entry) => entry.layer === "objective-completion-requirement" && entry.status !== "match")
            .length;
        console.log(JSON.stringify({
            kind: "andrews-cnv-cnn-back-and-forth-audit-summary",
            routeRecords: Array.isArray(audit.routeRecords) ? audit.routeRecords.length : 0,
            routeCoordinateFrames: audit.dimensionalIndex?.routeCoordinateCount || 0,
            obstacleCatalogCount: audit.obstacleCatalogCount || audit.dimensionalIndex?.obstacleCatalogCount || 0,
            obstacleCoordinateCount: audit.dimensionalIndex?.obstacleCoordinateCount || 0,
            allObstacleCatalogItemsHaveCoordinateFrame: coverage.allObstacleCatalogItemsHaveCoordinateFrame === true,
            functionUseGateCoordinateCount: coverage.functionUseGateCoordinateCount || 0,
            functionUseGatesDownstreamAfterRouteFrame: coverage.functionUseGatesDownstreamAfterRouteFrame === true,
            valenceObjectGateCoordinateCount: coverage.valenceObjectGateCoordinateCount || 0,
            valenceObjectGatesOwnedByValenceFrame: coverage.valenceObjectGatesOwnedByValenceFrame === true,
            enginePathProbeCount: audit.enginePathProbeCount || 0,
            enginePathHitCount: audit.enginePathHitCount || 0,
            outputMatchingCount: auditOutputMatchings.outputMatchingCount,
            outputMatchCount: auditOutputMatchings.outputMatchCount,
            outputNoMatchCount: auditOutputMatchings.outputNoMatchCount,
            staticInvariantNoMatchCount,
            composerFunctionUseMutationNoMatchCount,
            composerFunctionUseMutationStaticNoMatchCount,
            entradaGrammarObjectNoMatchCount,
            generationValencyMutationStaticNoMatchCount,
            generationValencyMutationRuntimeNoMatchCount,
            functionUseStructuralMutationInventoryNoMatchCount,
            finalFormulaShapeRouteFrameInventoryNoMatchCount,
            renderingFunctionUseForwardingNoMatchCount,
            routeFrameCompletenessNoMatchCount,
            sharedFinalFormulaRouteFrameNoMatchCount,
            completionRequirementNoMatchCount,
        }, null, 2));
        return;
    }
    console.log(JSON.stringify({
        ...audit,
        auditOutputMatchings,
    }, null, 2));
}

if (require.main === module) {
    main();
}
