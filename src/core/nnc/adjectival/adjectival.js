// core/nnc/adjectival/adjectival.js
// Lessons 40-41 adjectival NNC function boundary metadata. This keeps current
// adjetivo generated surfaces and predicate-function labels separate from
// confirmed adjectival NNC paradigms or clause-level modification ASTs.

"use strict";

const ADJECTIVAL_NNC_BOUNDARY_VERSION = 1;
const ADJECTIVAL_NNC_GENERATION_VERSION = 1;

const ADJECTIVAL_NNC_FUNCTION = Object.freeze({
    predicateFunction: "predicate-function",
    patientiveAdjectival: "patientive-adjectival",
    vncAdjectival: "vnc-adjectival",
    compoundSourceAdjectival: "compound-source-adjectival",
    denominalCompoundAdjectival: "denominal-compound-adjectival",
    adjectivalSurface: "adjectival-surface",
    potentialPatient: "potential-patient",
    modifierCandidate: "modifier-candidate",
    unknown: "unknown",
});

const ADJECTIVAL_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
    adjetivoRoute: "adjetivo-route",
    nominalizationProfile: "nominalization-profile",
    adjectivalModificationBoundary: "adjectival-modification-boundary",
    ordinaryNncFormulaSlots: "ordinary-nnc-formula-slots",
    translationAdjective: "translation-adjective",
    singleGeneratedWord: "single-generated-word",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const ADJECTIVAL_NNC_ANTI_CONFLATION_RULES = Object.freeze([
    "adjectival NNC function generation is opt-in and does not create a modification AST",
    "adjetivo route output is a generated surface, not complete Lessons 40-41 coverage",
    "nominalizationProfile adjectivalFunction is explanatory metadata, not modifier/head syntax",
    "Lessons 40-41 adjectival function is separate from Lessons 42-43 modification AST",
    "single generated words do not prove adjectival modification, supplementation, or topic relations",
    "Andrews adjectival categories govern grammar behavior, while Nawat/Pipil orthography governs output spelling",
]);

const ADJECTIVAL_NNC_DIAGNOSTIC_IDS = Object.freeze({
    unavailable: "adjectival-nnc-unavailable",
    requiresAbsolutiveState: "adjectival-nnc-requires-absolutive-state",
    requiresPatientiveSurface: "adjectival-nnc-requires-patientive-surface",
    requiresVncSurface: "adjectival-nnc-requires-vnc-surface",
    requiresCompoundSourceSurface: "adjectival-nnc-requires-compound-source-surface",
    requiresCompoundSourceFrame: "adjectival-nnc-requires-compound-source-frame",
    requiresDenominalCompoundSurface: "adjectival-nnc-requires-denominal-compound-surface",
    requiresDenominalCompoundFrame: "adjectival-nnc-requires-denominal-compound-frame",
    requiresFormulaSlots: "adjectival-nnc-requires-formula-slots",
    requiresNominalizedVncSurface: "adjectival-nnc-requires-nominalized-vnc-surface",
    unsupportedNominalizedVncKind: "adjectival-nnc-unsupported-nominalized-vnc-kind",
    requiresRootPlusYa: "adjectival-nnc-requires-root-plus-ya",
    rootPlusYaException: "adjectival-nnc-root-plus-ya-exception",
    segmentedRootPlusYaUnsupported: "adjectival-nnc-segmented-root-plus-ya-unsupported",
});

const ADJECTIVAL_NNC_FORMATION = Object.freeze({
    ordinaryAbsolutive: "ordinary-absolutive",
    patientiveAdjectival: "patientive-adjectival",
    vncAdjectival: "vnc-adjectival",
    compoundSourceAdjectival: "compound-source-adjectival",
    denominalCompoundAdjectival: "denominal-compound-adjectival",
    nominalizedVncAdjectival: "nominalized-vnc-adjectival",
    rootPlusYaObsoletePreterit: "root-plus-ya-obsolete-preterit",
    intensifiedAdjectival: "intensified-adjectival",
});

const ADJECTIVAL_NNC_NOMINALIZED_VNC_KIND_LESSONS = Object.freeze({
    "customary-present-agentive": Object.freeze({
        lessonRef: "Andrews 40.6",
        functionKind: "agentive-adjectival",
        rule: "customary-present agentive NNC predicates may function adjectivally",
    }),
    "preterit-agentive": Object.freeze({
        lessonRef: "Andrews 40.8",
        functionKind: "preterit-agentive-adjectival",
        rule: "preterit-agentive NNC predicates may function adjectivally",
    }),
    "potential-patient": Object.freeze({
        lessonRef: "Andrews 40.4.2",
        functionKind: "potential-patient-adjectival",
        rule: "potential-patient NNC predicates may function adjectivally",
    }),
    "customary-present-patientive": Object.freeze({
        lessonRef: "Andrews 40.7",
        functionKind: "customary-present-patientive-adjectival",
        rule: "customary-present patientive NNC predicates may function adjectivally",
    }),
});

const ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE = Object.freeze({
    rootPlusYa: "root-plus-ya",
    denominalTiya: "denominal-tiya",
    segmentedDenominalTiya: "segmented-denominal-tiya",
});

const ADJECTIVAL_NNC_SOURCE_PATTERN = Object.freeze({
    rootPlusYa: "root-plus-ya",
    tiYa: "ti-ya",
    kTiYa: "k-ti-ya",
    zTiYa: "z-ti-ya",
});

const ADJECTIVAL_NNC_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "functionKind",
        asks: "Does the generated surface function as predicate, modifier candidate, patientive adjective, VNC surface, or unknown?",
    }),
    Object.freeze({
        field: "sourceCategory",
        asks: "Is the source NNC, VNC, patientive, ordinary nounstem, or unknown?",
    }),
    Object.freeze({
        field: "predicateSurface",
        asks: "What role does the visible Nawat/Pipil surface have before any clause-level modification analysis?",
    }),
    Object.freeze({
        field: "adjectivalRole",
        asks: "Is there confirmed clause evidence for modifier/head behavior, or only an adjective-like word output?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided evidence supports adjectival function beyond route output?",
    }),
]);

function normalizeAdjectivalNncEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeAdjectivalNncFunction(value = "") {
    return normalizeAdjectivalNncEnum(
        value,
        Object.values(ADJECTIVAL_NNC_FUNCTION),
        ADJECTIVAL_NNC_FUNCTION.unknown
    );
}

function normalizeAdjectivalNncFalsePositiveSource(value = "") {
    return normalizeAdjectivalNncEnum(
        value,
        Object.values(ADJECTIVAL_NNC_FALSE_POSITIVE_SOURCE),
        ADJECTIVAL_NNC_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getAdjectivalNncAntiConflationRules() {
    return Array.from(ADJECTIVAL_NNC_ANTI_CONFLATION_RULES);
}

function getAdjectivalNncStructuralQuestions() {
    return ADJECTIVAL_NNC_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function buildAdjectivalNncFunctionBoundaryMetadata() {
    return {
        kind: "adjectival-nnc-function-boundary",
        version: ADJECTIVAL_NNC_BOUNDARY_VERSION,
        lessons: [40, 41],
        status: "partial",
        structuralSource: "Andrews Lessons 40-41",
        targetAuthority: "Andrews grammar rule with Nawat/Pipil orthography",
        generationAllowed: "opt-in",
        confirmedExamples: [],
        structuralQuestions: getAdjectivalNncStructuralQuestions(),
        boundaries: {
            hasAdjectiveModeOutputs: true,
            hasNominalizationProfileAdjectivalFunction: true,
            hasAdjectivalNncGeneration: true,
            hasOptInAdjectivalNncGeneration: true,
            hasModificationAst: false,
            hasConfirmedModifierHeadExamples: false,
            changesAdjectiveGeneration: false,
            changesNncGeneration: false,
            changesVncGeneration: false,
            treatsAdjetivoOutputAsFullLessonEvidence: false,
        },
        antiConflationRules: getAdjectivalNncAntiConflationRules(),
    };
}

function buildAdjectivalNncBoundaryMetadata() {
    return buildAdjectivalNncFunctionBoundaryMetadata();
}

function classifyAdjectivalNncFunctionCandidate({
    candidate = "",
    functionKind = "",
    sourceCategory = "",
    predicateSurface = "",
    adjectivalRole = "",
    evidenceSource = "",
    falsePositiveSource = "",
    hasNominalizationProfile = false,
} = {}) {
    const normalizedFunction = normalizeAdjectivalNncFunction(functionKind);
    const normalizedFalsePositive = normalizeAdjectivalNncFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    return {
        kind: "adjectival-nnc-function-candidate-classification",
        version: ADJECTIVAL_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        functionKind: normalizedFunction,
        sourceCategory: String(sourceCategory || ""),
        predicateSurface: String(predicateSurface || ""),
        adjectivalRole: String(adjectivalRole || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        hasNominalizationProfile: hasNominalizationProfile === true,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "adjectival-nnc-needs-validation" : "adjectival-nnc-needs-nawat-evidence",
            normalizedFunction !== ADJECTIVAL_NNC_FUNCTION.unknown
                ? "adjectival-nnc-function-recognized"
                : "adjectival-nnc-function-unconfirmed",
            hasNominalizationProfile ? "nominalization-profile-adjectival-function-is-metadata" : "nominalization-profile-absent",
            normalizedFalsePositive !== ADJECTIVAL_NNC_FALSE_POSITIVE_SOURCE.unknown
                ? "adjectival-nnc-false-positive-source"
                : "adjectival-nnc-unconfirmed",
        ],
        boundary: buildAdjectivalNncFunctionBoundaryMetadata(),
    };
}

function classifyAdjectivalNncCandidate(options = {}) {
    return classifyAdjectivalNncFunctionCandidate({
        ...options,
        functionKind: options.functionKind || options.adjectivalFunction || "",
        predicateSurface: options.predicateSurface || options.surfaceRole || "",
        adjectivalRole: options.adjectivalRole || "",
    });
}

function classifyAdjectivalNncFalsePositive(source = "") {
    const normalizedSource = normalizeAdjectivalNncFalsePositiveSource(source);
    return {
        kind: "adjectival-nnc-false-positive",
        version: ADJECTIVAL_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isAdjectivalNncEvidence: false,
        isAdjectivalFunctionEvidence: false,
        isModifierHeadEvidence: false,
        isAdjectivalParadigmEvidence: false,
        isModificationEvidence: false,
        isSupplementationEvidence: false,
        isTopicEvidence: false,
        generationAllowed: false,
        diagnostics: ["adjectival-nnc-false-positive-source"],
        antiConflationRules: getAdjectivalNncAntiConflationRules(),
    };
}

function normalizeAdjectivalNncText(value = "") {
    return String(value || "").trim().toLowerCase();
}

function normalizeAdjectivalNncState(value = "") {
    const normalized = normalizeAdjectivalNncText(value || "absolutive");
    if (normalized === "absolutivo") {
        return "absolutive";
    }
    if (normalized === "posesivo" || normalized === "possessed") {
        return "possessive";
    }
    return normalized || "absolutive";
}

function buildAdjectivalNncDiagnostic(id = "", message = "", severity = "unsupported") {
    return { id, severity, message };
}

function normalizeAdjectivalNncSurfaceValue(value = "") {
    if (typeof normalizeGrammarSurfaceValue === "function") {
        return normalizeGrammarSurfaceValue(value);
    }
    const surface = String(value || "").trim();
    return surface === "—" ? "" : surface;
}

function splitAdjectivalNncSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeAdjectivalNncSurfaceValue(entry))
        .filter(Boolean);
}

function getAdjectivalNncResultFrame(result = null) {
    return (
        (result?.grammarFrame && typeof result.grammarFrame === "object" ? result.grammarFrame : null)
        || (result?.frames && typeof result.frames === "object" ? result.frames : null)
    );
}

function getAdjectivalNncResultFramePayload(result = null) {
    const grammarFrame = getAdjectivalNncResultFrame(result);
    return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
}

function getAdjectivalNncSurfaceForms(result = null) {
    const output = result && typeof result === "object" ? result : {};
    const frameResult = getAdjectivalNncResultFramePayload(output);
    const hasResultFrame = Boolean(frameResult);
    const forms = [];
    if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
    }
    if (frameResult?.surface) {
        forms.push(frameResult.surface);
    }
    if (hasResultFrame) {
        return forms
            .flatMap((entry) => splitAdjectivalNncSurfaceText(entry))
            .filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    if (!hasResultFrame && Array.isArray(output.surfaceForms)) {
        forms.push(...output.surfaceForms);
    }
    if (!hasResultFrame && output.surface) {
        forms.push(output.surface);
    }
    if (!hasResultFrame && output.result) {
        forms.push(output.result);
    }
    return forms
        .flatMap((entry) => splitAdjectivalNncSurfaceText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function getAdjectivalNncSurface(result = null) {
    return getAdjectivalNncSurfaceForms(result)[0] || "";
}

function resolveAdjectivalNncGrammarFrameSourceInput(output = null, functionFrame = null, surface = "") {
    const resultFrame = getAdjectivalNncResultFramePayload(output);
    if (resultFrame && !surface) {
        return "";
    }
    const frame = functionFrame && typeof functionFrame === "object" ? functionFrame : {};
    const result = output && typeof output === "object" ? output : {};
    return normalizeAdjectivalNncSurfaceValue(
        frame.patientivoSurface
        || frame.nominalizedSurface
        || frame.denominalCompoundSurface
        || frame.vncSurface
        || result.stem
        || ""
    );
}

function buildAdjectivalNncGrammarFrame(result = null) {
    if (typeof buildGrammarFrame !== "function") {
        return null;
    }
    const output = result && typeof result === "object" ? result : {};
    const functionFrame = output.adjectivalNncFunctionFrame || {};
    const diagnostics = Array.isArray(output.diagnostics) ? output.diagnostics : [];
    const surfaceForms = getAdjectivalNncSurfaceForms(output);
    const surface = getAdjectivalNncSurface(output);
    const ok = Boolean(surface || surfaceForms.length) && output.supported !== false && output.error !== true;
    const sourceFormulaSlots = output.formulaSlots || functionFrame.sourceFormulaSlots || null;
    const sourceFormulaEcho = output.formulaEcho || functionFrame.sourceFormulaEcho || "";
    const sourceInput = resolveAdjectivalNncGrammarFrameSourceInput(output, functionFrame, surface);
    const hasEmptyResultFrame = Boolean(getAdjectivalNncResultFramePayload(output) && !surface);
    const routeContract = typeof buildGrammarRouteContractFrame === "function"
        ? buildGrammarRouteContractFrame({
            routeFamily: "adjectival-nnc",
            routeStage: "execute",
            sourceContract: {
                sourceCategory: functionFrame.sourceCategory || "",
                sourceClauseKind: functionFrame.sourceClauseKind || output.clauseKind || "",
                requiredPredicateState: functionFrame.requiredPredicateState || "",
                requestedPredicateState: functionFrame.requestedPredicateState || output.state || "",
                sourceVerb: functionFrame.sourceVerb || "",
                sourceTenseValue: functionFrame.sourceTenseValue || "",
                sourceCombinedMode: functionFrame.sourceCombinedMode || "",
                sourceVoiceMode: functionFrame.sourceVoiceMode || "",
                sourceDenominalCompoundFrame: functionFrame.sourceDenominalCompoundFrame || null,
                sourceCompoundFrame: functionFrame.sourceCompoundFrame || null,
            },
            targetContract: {
                outputKind: output.outputKind || "",
                functionKind: functionFrame.functionKind || "",
                generationRoute: output.generationRoute || "adjectival-nnc",
            },
            generationAllowed: ok,
            blockingDiagnostics: ok ? [] : diagnostics,
        })
        : null;
    const resultFrame = typeof buildGrammarResultFrame === "function"
        ? buildGrammarResultFrame({
            ok,
            surface,
            surfaceForms,
            outputKind: output.outputKind || "",
            generationRoute: output.generationRoute || "adjectival-nnc",
            sourceInput,
        })
        : null;
    const diagnosticFrame = typeof buildGrammarDiagnosticFrame === "function"
        ? buildGrammarDiagnosticFrame({
            status: ok ? "generated" : (diagnostics.length ? "blocked" : "pending"),
            diagnostics,
            blockers: ok ? [] : diagnostics,
        })
        : null;
    const authorityFrame = typeof buildGrammarAuthorityFrame === "function"
        ? buildGrammarAuthorityFrame({
            evidenceStatus: ok ? "generated" : (diagnostics.length ? "blocked" : "pending"),
            andrewsRefs: [functionFrame.lessonRef || "Andrews 40"].filter(Boolean),
            supported: ok,
        })
        : null;
    return buildGrammarFrame({
        authorityFrame,
        unitFrame: {
            unitKind: functionFrame.sourceClauseKind === "verbal-nuclear-clause"
                ? "verbal-nuclear-clause"
                : "ordinary-nnc",
            outputKind: output.outputKind || "",
            generationRoute: output.generationRoute || "adjectival-nnc",
        },
        orthographyFrame: {
            surface,
            surfaceForms,
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
        },
        morphBoundaryFrame: {
            formulaSlots: sourceFormulaSlots,
            formulaEcho: String(sourceFormulaEcho || ""),
        },
        stemFrame: {
            stem: hasEmptyResultFrame ? "" : String(output.stem || surface || ""),
            sourceStem: hasEmptyResultFrame
                ? ""
                : (sourceInput || normalizeAdjectivalNncSurfaceValue(functionFrame.sourcePredicateStem || "")),
        },
        nuclearClauseFrame: null,
        participantFrame: null,
        inflectionFrame: {
            tenseMode: "adjetivo",
            state: output.state || functionFrame.actualPredicateState || "",
            sourceTenseValue: functionFrame.sourceTenseValue || "",
            sourceCombinedMode: functionFrame.sourceCombinedMode || "",
            sourceVoiceMode: functionFrame.sourceVoiceMode || "",
        },
        routeContract,
        astFrame: null,
        resultFrame,
        diagnosticFrame,
    });
}

function attachAdjectivalNncGrammarContract(result = null) {
    const output = result && typeof result === "object" ? result : {};
    const grammarFrame = buildAdjectivalNncGrammarFrame(output);
    const resultContract = typeof buildGrammarResultContract === "function"
        ? buildGrammarResultContract({ result: output, grammarFrame })
        : {
            ok: Boolean(getAdjectivalNncSurface(output)) && output.supported !== false && output.error !== true,
            surface: getAdjectivalNncSurface(output),
            surfaceForms: getAdjectivalNncSurfaceForms(output),
            frames: grammarFrame,
            diagnostics: Array.isArray(output.diagnostics) ? output.diagnostics : [],
        };
    return {
        ...output,
        grammarFrame,
        ...resultContract,
    };
}

function isRootPlusYaAdjectivalNncFormation(value = "") {
    return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.rootPlusYaObsoletePreterit;
}

function shouldGenerateRootPlusYaAdjectivalNnc(options = {}) {
    return options?.rootPlusYaObsoletePreterit === true
        || isRootPlusYaAdjectivalNncFormation(options?.formation)
        || isRootPlusYaAdjectivalNncFormation(options?.subtype)
        || isRootPlusYaAdjectivalNncFormation(options?.sourceFormation);
}

function isIntensifiedAdjectivalNncFormation(value = "") {
    return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.intensifiedAdjectival;
}

function shouldGenerateIntensifiedAdjectivalNnc(options = {}) {
    return options?.intensifiedAdjectival === true
        || isIntensifiedAdjectivalNncFormation(options?.formation)
        || isIntensifiedAdjectivalNncFormation(options?.subtype)
        || isIntensifiedAdjectivalNncFormation(options?.sourceFormation);
}

function isPatientiveAdjectivalNncFormation(value = "") {
    return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.patientiveAdjectival;
}

function shouldGeneratePatientiveAdjectivalNnc(options = {}) {
    return options?.patientiveAdjectival === true
        || isPatientiveAdjectivalNncFormation(options?.formation)
        || isPatientiveAdjectivalNncFormation(options?.subtype)
        || isPatientiveAdjectivalNncFormation(options?.sourceFormation);
}

function isVncAdjectivalNncFormation(value = "") {
    return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.vncAdjectival;
}

function shouldGenerateVncAdjectivalNnc(options = {}) {
    return options?.vncAdjectival === true
        || isVncAdjectivalNncFormation(options?.formation)
        || isVncAdjectivalNncFormation(options?.subtype)
        || isVncAdjectivalNncFormation(options?.sourceFormation);
}

function isCompoundSourceAdjectivalNncFormation(value = "") {
    return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.compoundSourceAdjectival;
}

function shouldGenerateCompoundSourceAdjectivalNnc(options = {}) {
    return options?.compoundSourceAdjectival === true
        || isCompoundSourceAdjectivalNncFormation(options?.formation)
        || isCompoundSourceAdjectivalNncFormation(options?.subtype)
        || isCompoundSourceAdjectivalNncFormation(options?.sourceFormation);
}

function isDenominalCompoundAdjectivalNncFormation(value = "") {
    return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.denominalCompoundAdjectival;
}

function shouldGenerateDenominalCompoundAdjectivalNnc(options = {}) {
    return options?.denominalCompoundAdjectival === true
        || isDenominalCompoundAdjectivalNncFormation(options?.formation)
        || isDenominalCompoundAdjectivalNncFormation(options?.subtype)
        || isDenominalCompoundAdjectivalNncFormation(options?.sourceFormation);
}

function isNominalizedVncAdjectivalNncFormation(value = "") {
    return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.nominalizedVncAdjectival;
}

function shouldGenerateNominalizedVncAdjectivalNnc(options = {}) {
    return options?.nominalizedVncAdjectival === true
        || isNominalizedVncAdjectivalNncFormation(options?.formation)
        || isNominalizedVncAdjectivalNncFormation(options?.subtype)
        || isNominalizedVncAdjectivalNncFormation(options?.sourceFormation);
}

function getAdjectivalNncFormulaSlotResultFrame(slot = null) {
    if (!slot || typeof slot !== "object") {
        return null;
    }
    const grammarFrame = slot.grammarFrame && typeof slot.grammarFrame === "object"
        ? slot.grammarFrame
        : (slot.frames && typeof slot.frames === "object" ? slot.frames : null);
    return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
}

function getAdjectivalNncFormulaSlotFramedSurface(slot = null) {
    const resultFrame = getAdjectivalNncFormulaSlotResultFrame(slot);
    if (!resultFrame) {
        return null;
    }
    const forms = [];
    if (Array.isArray(resultFrame.surfaceForms)) {
        forms.push(...resultFrame.surfaceForms);
    }
    if (resultFrame.surface) {
        forms.push(resultFrame.surface);
    }
    return forms.flatMap((entry) => splitAdjectivalNncSurfaceText(entry))[0] || "";
}

function resolveAdjectivalNncFormulaSlotText(slot = null, fields = []) {
    const framedSurface = getAdjectivalNncFormulaSlotFramedSurface(slot);
    if (framedSurface !== null) {
        return framedSurface;
    }
    const source = slot && typeof slot === "object" ? slot : {};
    for (const field of fields) {
        const value = normalizeAdjectivalNncSurfaceValue(source[field]);
        if (value) {
            return value;
        }
    }
    return "";
}

function buildAdjectivalNncFormulaEchoFromSlots(formulaSlots = null) {
    if (!formulaSlots || typeof formulaSlots !== "object") {
        return "";
    }
    const subject = formulaSlots.subjectPerson || {};
    const predicate = formulaSlots.predicate || {};
    const connector = formulaSlots.subjectNumberConnector || {};
    const stem = resolveAdjectivalNncFormulaSlotText(predicate, ["stem", "surface"]);
    if (!stem) {
        return "";
    }
    const prefix = String(subject.displayPrefix || subject.prefix || "Ø") || "Ø";
    const suffix = String(subject.displaySuffix || subject.suffix || "Ø") || "Ø";
    const connectorSurface = resolveAdjectivalNncFormulaSlotText(connector, ["connector", "surface"]) || "Ø";
    return `#${prefix}...${suffix}(${stem})${connectorSurface}#`;
}

function buildRootPlusYaAdjectivalNncFormulaSlots({
    rootPlusYaBase = "",
    subject = null,
    sourceFormationSubtype = ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.rootPlusYa,
} = {}) {
    return {
        subjectPerson: {
            role: "subject-person",
            slot: "pers1-pers2",
            prefix: String(subject?.subjectPrefix || ""),
            suffix: String(subject?.subjectSuffix || ""),
            displayPrefix: String(subject?.subjectPrefix || "") || "Ø",
            displaySuffix: String(subject?.subjectSuffix || "") || "Ø",
            label: String(subject?.personSubKey || "3sg"),
        },
        predicate: {
            role: "predicate",
            slot: "STEM",
            stem: rootPlusYaBase,
            state: "absolutive",
            sourceFormation: ADJECTIVAL_NNC_FORMATION.rootPlusYaObsoletePreterit,
            sourceFormationSubtype,
        },
        subjectNumberConnector: {
            role: "subject-number-connector",
            slot: "num1-num2",
            connector: "k",
            surface: "k",
            label: "obsolete preterit Class A subject-number connector",
            belongsTo: "subject",
            referenceNumber: "singular",
            pluralType: "",
            nounClass: "",
            connectorClass: "preterit-agentive-a",
            notNounSuffix: true,
            notStatePosition: true,
        },
    };
}

function buildIntensifiedAdjectivalNncFormulaSlots({
    sourceFormulaSlots = null,
    intensifiedStem = "",
} = {}) {
    const sourceSlots = sourceFormulaSlots && typeof sourceFormulaSlots === "object"
        ? sourceFormulaSlots
        : {};
    const predicate = sourceSlots.predicate || {};
    const sourceStem = resolveAdjectivalNncFormulaSlotText(predicate, ["stem", "surface"]);
    const {
        grammarFrame: _sourcePredicateGrammarFrame,
        frames: _sourcePredicateFrames,
        ...predicateMetadata
    } = predicate;
    return {
        subjectPerson: {
            ...(sourceSlots.subjectPerson || {}),
        },
        predicate: {
            ...predicateMetadata,
            stem: String(intensifiedStem || "").trim(),
            sourceStem,
            sourceFormation: ADJECTIVAL_NNC_FORMATION.intensifiedAdjectival,
            sourceFormationSubtype: "reduplicative-intensification",
        },
        subjectNumberConnector: {
            ...(sourceSlots.subjectNumberConnector || {}),
        },
    };
}

function resolveAdjectivalNncParsedVerb(rawStem = "") {
    const raw = String(rawStem || "").trim();
    if (!raw) {
        return null;
    }
    return typeof parseVerbInput === "function"
        ? parseVerbInput(raw)
        : {
            sourceRawVerb: raw,
            verb: raw.replace(/[()]/g, ""),
            analysisVerb: raw.replace(/[()]/g, ""),
            isRootPlusYa: false,
            rootPlusYaBase: "",
            rootPlusYaBasePronounceable: "",
            isWeya: false,
        };
}

function resolveRootPlusYaAdjectivalNncSource(parsedVerb = null) {
    if (!parsedVerb || typeof parsedVerb !== "object") {
        return {
            supported: false,
            rootPlusYaBase: "",
            sourceFormationSubtype: "",
            diagnosticId: ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa,
        };
    }
    const sourceVerb = String(parsedVerb.verb || parsedVerb.analysisVerb || "").trim();
    const rawSource = String(parsedVerb.sourceRawVerb || parsedVerb.displayVerb || "").trim();
    const displayCore = String(parsedVerb.displayCore || "").trim();
    const hasSlashTiyaSource = /\/\s*tiya\s*\)?$/i.test(rawSource)
        || /\/\s*tiya\s*$/i.test(displayCore);
    const sourceEndsInTiya = /tiya$/i.test(sourceVerb);
    const parsedBase = String(
        parsedVerb.rootPlusYaBasePronounceable
        || parsedVerb.rootPlusYaBase
        || parsedVerb.bareRootPlusYaBasePronounceable
        || parsedVerb.bareRootPlusYaBase
        || ""
    ).trim();
    if (parsedVerb.isWeya === true) {
        return {
            supported: false,
            rootPlusYaBase: parsedBase,
            sourceFormationSubtype: "",
            diagnosticId: ADJECTIVAL_NNC_DIAGNOSTIC_IDS.rootPlusYaException,
        };
    }
    if (hasSlashTiyaSource && sourceEndsInTiya) {
        return {
            supported: true,
            rootPlusYaBase: sourceVerb.slice(0, -2),
            sourceFormationSubtype: ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.segmentedDenominalTiya,
            diagnosticId: "",
        };
    }
    if (parsedVerb.hasSlashMarker === true) {
        return {
            supported: false,
            rootPlusYaBase: parsedBase,
            sourceFormationSubtype: "",
            diagnosticId: ADJECTIVAL_NNC_DIAGNOSTIC_IDS.segmentedRootPlusYaUnsupported,
        };
    }
    if (parsedVerb.isRootPlusYa === true && parsedBase) {
        return {
            supported: true,
            rootPlusYaBase: parsedBase,
            sourceFormationSubtype: sourceEndsInTiya
                ? ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.denominalTiya
                : ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.rootPlusYa,
            diagnosticId: "",
        };
    }
    return {
        supported: false,
        rootPlusYaBase: parsedBase,
        sourceFormationSubtype: "",
        diagnosticId: ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa,
    };
}

function resolveAdjectivalNncSourceFormationFrame({
    parsedVerb = null,
    rootPlusYaBase = "",
    sourceFormationSubtype = ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.rootPlusYa,
} = {}) {
    const sourceVerb = normalizeAdjectivalNncText(parsedVerb?.verb || parsedVerb?.analysisVerb || "");
    const sourceBase = normalizeAdjectivalNncText(rootPlusYaBase || "");
    const subtype = normalizeAdjectivalNncText(sourceFormationSubtype || ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.rootPlusYa);
    const usesKTiYa = /(?:c|k)tiya$/.test(sourceVerb) || /(?:c|k)ti$/.test(sourceBase);
    const usesZTiYa = /ztiya$/.test(sourceVerb) || /zti$/.test(sourceBase);
    const isDenominalTiya = subtype === ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.denominalTiya
        || subtype === ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.segmentedDenominalTiya;
    const sourcePattern = usesZTiYa
        ? ADJECTIVAL_NNC_SOURCE_PATTERN.zTiYa
        : (usesKTiYa
            ? ADJECTIVAL_NNC_SOURCE_PATTERN.kTiYa
            : (isDenominalTiya
                ? ADJECTIVAL_NNC_SOURCE_PATTERN.tiYa
                : ADJECTIVAL_NNC_SOURCE_PATTERN.rootPlusYa));
    const lessonRef = usesZTiYa
        ? "Andrews 40.11"
        : (usesKTiYa ? "Andrews 40.10" : "Andrews 40.9");
    const synonymSetKind = usesZTiYa
        ? "triplet"
        : (usesKTiYa ? "pair" : "none");
    const andrewsSourcePattern = usesZTiYa
        ? "z-ti-ya"
        : (usesKTiYa ? "c-ti-ya" : sourcePattern);
    const nawatOrthographyPattern = usesZTiYa
        ? "z-ti-ya -> z-tik"
        : (usesKTiYa
            ? "k-ti-ya/c-ti-ya -> k-tik/c-tik"
            : (sourcePattern === ADJECTIVAL_NNC_SOURCE_PATTERN.tiYa ? "ti-ya -> tik" : "root-plus-ya -> k"));
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        kind: "adjectival-nnc-source-formation-frame",
        lessonRef,
        formation: ADJECTIVAL_NNC_FORMATION.rootPlusYaObsoletePreterit,
        sourceFormationSubtype: subtype,
        sourcePattern,
        andrewsSourcePattern,
        nawatOrthographyPattern,
        synonymSetKind,
        outputContract: "generate-current-source-only",
        generatesSiblingSynonymForms: false,
        doesNotGenerateSiblingForms: true,
        sourceVerb,
        sourceRootPlusYaBase: sourceBase,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function getAdjectivalNncDenominalCompoundSourceParts(parsedVerb = null) {
    const rawCandidates = [
        parsedVerb?.sourceRawVerb,
        parsedVerb?.displayVerb,
        parsedVerb?.displayCore,
    ].map((entry) => String(entry || "").trim()).filter(Boolean);
    for (const raw of rawCandidates) {
        const inner = raw.replace(/^\(+/, "").replace(/\)+$/, "");
        const parts = inner
            .split("/")
            .map((part) => normalizeAdjectivalNncText(part.replace(/[()]/g, "")))
            .filter(Boolean);
        if (parts.length >= 3 && parts[parts.length - 1] === "tiya") {
            return parts.slice(0, -1);
        }
    }
    return [];
}

function resolveDenominalCompoundAdjectivalNncSourceFrame({
    parsedVerb = null,
    rootPlusYaBase = "",
    sourceFormationSubtype = "",
} = {}) {
    const subtype = normalizeAdjectivalNncText(sourceFormationSubtype || "");
    if (subtype !== ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.segmentedDenominalTiya) {
        return null;
    }
    const compoundParts = getAdjectivalNncDenominalCompoundSourceParts(parsedVerb);
    if (compoundParts.length < 2) {
        return null;
    }
    const matrixStem = compoundParts[compoundParts.length - 1] || "";
    const embeds = compoundParts.slice(0, -1).map((value, index) => ({
        role: index === compoundParts.length - 2 ? "adjacent-compound-noun-embed" : "outer-compound-noun-embed",
        kind: "nounstem",
        value,
        source: "segmented-denominal-tiya",
        index,
        explicit: true,
    }));
    return {
        kind: "denominal-compound-nounstem-frame",
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        lessonRef: "Andrews 41.3",
        cites: ["Andrews 54.2", "Andrews 40.8.1"],
        outputKind: "adjectival-nnc-denominal-compound-source",
        sourceCategory: "compound-nounstem",
        sourceStemType: "compound-nounstem",
        operation: {
            type: "denominal-verbstem",
            suffix: "ti",
            nawatInputSuffix: "tiya",
        },
        resultantNncKind: "preterit-agentive-adjectival",
        matrix: {
            role: "matrix",
            stem: matrixStem,
        },
        embeds,
        sourceInput: {
            rawInput: String(parsedVerb?.sourceRawVerb || ""),
            displayVerb: String(parsedVerb?.displayVerb || ""),
            displayCore: String(parsedVerb?.displayCore || ""),
            verb: String(parsedVerb?.verb || ""),
            analysisVerb: String(parsedVerb?.analysisVerb || ""),
            parts: compoundParts,
        },
        generatedVerbstem: String(parsedVerb?.verb || parsedVerb?.analysisVerb || ""),
        sourceRootPlusYaBase: String(rootPlusYaBase || ""),
        generatedSurfacePreserved: true,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
        boundaries: {
            changesSurfaceForms: false,
            noNewSurfaceForms: true,
            noModificationAst: true,
            noClassicalSurfaceImport: true,
        },
    };
}

function buildRootPlusYaAdjectivalNncFunctionFrame({
    parsedVerb = null,
    rootPlusYaBase = "",
    formulaSlots = null,
    requestedState = "absolutive",
    role = "predicate-surface",
    sourceFormationSubtype = ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.rootPlusYa,
} = {}) {
    const formulaEcho = buildAdjectivalNncFormulaEchoFromSlots(formulaSlots);
    const sourceFormationFrame = resolveAdjectivalNncSourceFormationFrame({
        parsedVerb,
        rootPlusYaBase,
        sourceFormationSubtype,
    });
    const denominalCompoundSourceFrame = resolveDenominalCompoundAdjectivalNncSourceFrame({
        parsedVerb,
        rootPlusYaBase,
        sourceFormationSubtype,
    });
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-root-plus-ya",
        lessonRef: "Andrews 40.9",
        nncKind: "adjectival",
        functionKind: ADJECTIVAL_NNC_FUNCTION.adjectivalSurface,
        role,
        rule: "root-plus-ya adjectival NNC uses the obsolete preterit/root base plus the subject-number connector",
        formation: ADJECTIVAL_NNC_FORMATION.rootPlusYaObsoletePreterit,
        sourceFormationSubtype,
        sourceFormationFrame,
        requiredPredicateState: "absolutive",
        requestedPredicateState: requestedState,
        actualPredicateState: "absolutive",
        sourceVerb: parsedVerb?.sourceRawVerb || parsedVerb?.verb || "",
        sourceRootPlusYaBase: rootPlusYaBase,
        denominalCompoundSourceFrame,
        sourceFormulaSlots: formulaSlots,
        sourceFormulaEcho: formulaEcho,
        usesObsoletePreteritBase: true,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildRootPlusYaAdjectivalNncUnsupportedOutput({
    stem = "",
    requestedState = "absolutive",
    diagnostic = null,
    parsedVerb = null,
    rootPlusYaBase = "",
    sourceFormationSubtype = "",
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    const frame = buildRootPlusYaAdjectivalNncFunctionFrame({
        parsedVerb,
        rootPlusYaBase: rootPlusYaBase || parsedVerb?.rootPlusYaBasePronounceable || parsedVerb?.rootPlusYaBase || "",
        formulaSlots: null,
        requestedState,
        sourceFormationSubtype,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-root-plus-ya",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(parsedVerb?.verb || stem || ""),
        state: requestedState,
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: frame,
        rootPlusYaAdjectivalNncFrame: frame,
        denominalCompoundSourceFrame: frame.denominalCompoundSourceFrame || null,
        diagnostics,
    });
}

function buildAdjectivalNncFunctionFrame({
    sourceNnc = null,
    requestedState = "absolutive",
    role = "modifier-candidate",
} = {}) {
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-function",
        lessonRef: "Andrews 40.1",
        nncKind: "adjectival",
        functionKind: ADJECTIVAL_NNC_FUNCTION.modifierCandidate,
        role,
        rule: "adjectival NNC is an NNC in adjectival function and normally absolutive-state",
        requiredPredicateState: "absolutive",
        requestedPredicateState: requestedState,
        actualPredicateState: sourceNnc?.state || "",
        sourceClauseKind: sourceNnc?.clauseKind || "",
        sourceFormulaSlots: sourceNnc?.nncBasic?.formulaSlots || sourceNnc?.clauseFrame?.formulaSlots || null,
        sourceFormulaEcho: sourceNnc?.nncBasic?.formulaEcho || sourceNnc?.clauseFrame?.formulaEcho || "",
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildAdjectivalNncUnsupportedOutput({
    stem = "",
    requestedState = "absolutive",
    diagnostic = null,
    sourceNnc = null,
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    if (sourceNnc && Array.isArray(sourceNnc.diagnostics)) {
        diagnostics.push(...sourceNnc.diagnostics);
    }
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-function",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(sourceNnc?.stem || stem || ""),
        state: sourceNnc?.state || requestedState,
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildAdjectivalNncFunctionFrame({
            sourceNnc,
            requestedState,
        }),
        sourceNnc: sourceNnc || null,
        diagnostics,
    });
}

function buildPatientivoAdjectivalNncFunctionFrame({
    patientivoSurface = "",
    patientivoSource = "",
    sourceTenseValue = "",
    sourceCombinedMode = "",
    nominalizationProfile = null,
    formulaSlots = null,
    formulaEcho = "",
    requestedState = "absolutive",
    role = "predicate-surface",
} = {}) {
    const patientiveFamilyProfile = nominalizationProfile?.patientiveFamilyProfile || null;
    const source = nominalizationProfile?.source || {};
    const resolvedPatientivoSource = String(
        patientivoSource
        || patientiveFamilyProfile?.family
        || nominalizationProfile?.role?.patientiveFamily
        || ""
    ).trim();
    const resolvedSourceTense = String(
        sourceTenseValue
        || patientiveFamilyProfile?.sourceTense
        || source.sourceTense
        || ""
    ).trim();
    const resolvedSourceMode = String(
        sourceCombinedMode
        || source.sourceCombinedMode
        || ""
    ).trim();
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-patientive-function",
        lessonRef: "Andrews 40.4",
        nncKind: "adjectival",
        functionKind: ADJECTIVAL_NNC_FUNCTION.patientiveAdjectival,
        role,
        rule: "patientive nounstem NNCs can function adjectivally as resultant-state predicates",
        formation: ADJECTIVAL_NNC_FORMATION.patientiveAdjectival,
        requiredPredicateState: "absolutive",
        requestedPredicateState: requestedState,
        actualPredicateState: "absolutive",
        sourceCategory: "patientive-nounstem",
        sourceClauseKind: "nominal-nuclear-clause",
        patientivoSurface: String(patientivoSurface || "").trim(),
        patientivoSource: resolvedPatientivoSource,
        sourceTenseValue: resolvedSourceTense,
        sourceCombinedMode: resolvedSourceMode,
        sourceFormulaSlots: formulaSlots || null,
        sourceFormulaEcho: String(formulaEcho || ""),
        generatedSurfacePreserved: true,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildPatientivoAdjectivalNncUnsupportedOutput({
    patientivoSurface = "",
    requestedState = "absolutive",
    diagnostic = null,
    nominalizationProfile = null,
    formulaSlots = null,
    formulaEcho = "",
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-patientive-function",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(patientivoSurface || ""),
        state: requestedState,
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildPatientivoAdjectivalNncFunctionFrame({
            patientivoSurface,
            nominalizationProfile,
            formulaSlots,
            formulaEcho,
            requestedState,
        }),
        diagnostics,
    });
}

function buildPatientivoAdjectivalNncFunctionOutput({
    patientivoSurface = "",
    state = "absolutive",
    patientivoSource = "",
    sourceTenseValue = "",
    sourceCombinedMode = "",
    nominalizationProfile = null,
    formulaSlots = null,
    formulaEcho = "",
    role = "predicate-surface",
} = {}) {
    const requestedState = normalizeAdjectivalNncState(state);
    const surface = String(patientivoSurface || "").trim();
    if (requestedState !== "absolutive") {
        return buildPatientivoAdjectivalNncUnsupportedOutput({
            patientivoSurface: surface,
            requestedState,
            nominalizationProfile,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresAbsolutiveState,
                "Patientive adjectival NNC generation follows Andrews 40.4 and requires absolutive predicate state."
            ),
        });
    }
    if (!surface) {
        return buildPatientivoAdjectivalNncUnsupportedOutput({
            patientivoSurface: surface,
            requestedState,
            nominalizationProfile,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresPatientiveSurface,
                "Patientive adjectival NNC generation requires a generated patientive noun surface from #3 salida."
            ),
        });
    }
    const frame = buildPatientivoAdjectivalNncFunctionFrame({
        patientivoSurface: surface,
        patientivoSource,
        sourceTenseValue,
        sourceCombinedMode,
        nominalizationProfile,
        formulaSlots,
        formulaEcho,
        requestedState,
        role,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-patientive-function",
        clauseKind: "nominal-nuclear-clause",
        supported: true,
        result: surface,
        surfaceForms: [surface],
        stem: surface,
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        formulaSlots: formulaSlots || null,
        formulaEcho: String(formulaEcho || ""),
        adjectivalNncFunctionFrame: frame,
        patientivoAdjectivalNncFunctionFrame: frame,
        diagnostics: [],
    });
}

function buildVncAdjectivalNncFunctionFrame({
    vncSurface = "",
    sourceVerb = "",
    sourceTenseValue = "",
    sourceCombinedMode = "",
    sourceVoiceMode = "",
    role = "predicate-surface",
} = {}) {
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-vnc-function",
        lessonRef: "Andrews 40.3",
        nncKind: "",
        clauseKind: "verbal-nuclear-clause",
        functionKind: ADJECTIVAL_NNC_FUNCTION.vncAdjectival,
        role,
        rule: "VNCs may function adjectivally without becoming ordinary NNC nounstems",
        formation: ADJECTIVAL_NNC_FORMATION.vncAdjectival,
        requiredPredicateState: "",
        requestedPredicateState: "",
        actualPredicateState: "",
        sourceCategory: "verbal-nuclear-clause",
        sourceClauseKind: "verbal-nuclear-clause",
        vncSurface: String(vncSurface || "").trim(),
        sourceVerb: String(sourceVerb || "").trim(),
        sourceTenseValue: String(sourceTenseValue || "").trim(),
        sourceCombinedMode: String(sourceCombinedMode || "").trim(),
        sourceVoiceMode: String(sourceVoiceMode || "").trim(),
        sourceFormulaSlots: null,
        sourceFormulaEcho: "",
        generatedSurfacePreserved: true,
        hasModificationAst: false,
        doesNotCreateNncStem: true,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildVncAdjectivalNncUnsupportedOutput({
    vncSurface = "",
    diagnostic = null,
    sourceVerb = "",
    sourceTenseValue = "",
    sourceCombinedMode = "",
    sourceVoiceMode = "",
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-vnc-function",
        clauseKind: "verbal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(vncSurface || ""),
        state: "",
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildVncAdjectivalNncFunctionFrame({
            vncSurface,
            sourceVerb,
            sourceTenseValue,
            sourceCombinedMode,
            sourceVoiceMode,
        }),
        diagnostics,
    });
}

function buildVncAdjectivalNncFunctionOutput({
    vncSurface = "",
    surface = "",
    stem = "",
    sourceVerb = "",
    sourceTenseValue = "",
    sourceCombinedMode = "",
    sourceVoiceMode = "",
    role = "predicate-surface",
} = {}) {
    const resolvedSurface = String(vncSurface || surface || stem || "").trim();
    if (!resolvedSurface) {
        return buildVncAdjectivalNncUnsupportedOutput({
            vncSurface: resolvedSurface,
            sourceVerb,
            sourceTenseValue,
            sourceCombinedMode,
            sourceVoiceMode,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresVncSurface,
                "VNC adjectival function generation follows Andrews 40.3 and requires a generated VNC surface from #3 salida."
            ),
        });
    }
    const frame = buildVncAdjectivalNncFunctionFrame({
        vncSurface: resolvedSurface,
        sourceVerb,
        sourceTenseValue,
        sourceCombinedMode,
        sourceVoiceMode,
        role,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-vnc-function",
        clauseKind: "verbal-nuclear-clause",
        supported: true,
        result: resolvedSurface,
        surfaceForms: [resolvedSurface],
        stem: resolvedSurface,
        state: "",
        generationRoute: "adjectival-nnc",
        formulaSlots: null,
        formulaEcho: "",
        adjectivalNncFunctionFrame: frame,
        vncAdjectivalNncFunctionFrame: frame,
        diagnostics: [],
    });
}

function cloneAdjectivalNncCompoundSourceFrame(frame = null) {
    if (!frame || typeof frame !== "object") {
        return null;
    }
    return {
        kind: String(frame.kind || "").trim(),
        lessonRange: String(frame.lessonRange || "").trim(),
        matrix: frame.matrix && typeof frame.matrix === "object"
            ? { ...frame.matrix }
            : null,
        embeds: Array.isArray(frame.embeds)
            ? frame.embeds.map((entry) => ({ ...entry }))
            : [],
        sourceInput: frame.sourceInput && typeof frame.sourceInput === "object"
            ? { ...frame.sourceInput }
            : null,
        boundaries: frame.boundaries && typeof frame.boundaries === "object"
            ? { ...frame.boundaries }
            : null,
    };
}

function buildCompoundSourceAdjectivalNncFunctionFrame({
    compoundSourceSurface = "",
    sourceCompoundFrame = null,
    nominalizationKind = "",
    formulaSlots = null,
    formulaEcho = "",
    requestedState = "absolutive",
    role = "predicate-surface",
} = {}) {
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-compound-source",
        lessonRef: "Andrews 41.2",
        nncKind: "adjectival",
        functionKind: ADJECTIVAL_NNC_FUNCTION.compoundSourceAdjectival,
        role,
        rule: "compound verbstems with nominal embeds may yield compound nounstems whose NNCs function adjectivally",
        formation: ADJECTIVAL_NNC_FORMATION.compoundSourceAdjectival,
        requiredPredicateState: "absolutive",
        requestedPredicateState: requestedState,
        actualPredicateState: "absolutive",
        sourceCategory: "compound-verbstem",
        sourceClauseKind: "nominal-nuclear-clause",
        sourceVerbalClauseKind: "verbal-nuclear-clause",
        compoundSourceSurface: String(compoundSourceSurface || "").trim(),
        nominalizationKind: normalizeAdjectivalNncText(nominalizationKind) || "adjectival-surface",
        sourceCompoundFrame: cloneAdjectivalNncCompoundSourceFrame(sourceCompoundFrame),
        sourceFormulaSlots: formulaSlots || null,
        sourceFormulaEcho: String(formulaEcho || ""),
        generatedSurfacePreserved: true,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildCompoundSourceAdjectivalNncUnsupportedOutput({
    compoundSourceSurface = "",
    requestedState = "absolutive",
    diagnostic = null,
    sourceCompoundFrame = null,
    nominalizationKind = "",
    formulaSlots = null,
    formulaEcho = "",
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-compound-source",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(compoundSourceSurface || ""),
        state: requestedState,
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildCompoundSourceAdjectivalNncFunctionFrame({
            compoundSourceSurface,
            sourceCompoundFrame,
            nominalizationKind,
            formulaSlots,
            formulaEcho,
            requestedState,
        }),
        diagnostics,
    });
}

function buildCompoundSourceAdjectivalNncFunctionOutput({
    compoundSourceSurface = "",
    surface = "",
    stem = "",
    state = "absolutive",
    sourceCompoundFrame = null,
    compoundFrame = null,
    nominalizationKind = "",
    nominalizationProfile = null,
    formulaSlots = null,
    formulaEcho = "",
    role = "predicate-surface",
} = {}) {
    const requestedState = normalizeAdjectivalNncState(state);
    const resolvedSurface = String(compoundSourceSurface || surface || stem || "").trim();
    const resolvedCompoundFrame = sourceCompoundFrame || compoundFrame || null;
    const resolvedNominalizationKind = nominalizationKind
        || nominalizationProfile?.role?.nominalizationKind
        || "adjectival-surface";
    if (requestedState !== "absolutive") {
        return buildCompoundSourceAdjectivalNncUnsupportedOutput({
            compoundSourceSurface: resolvedSurface,
            requestedState,
            sourceCompoundFrame: resolvedCompoundFrame,
            nominalizationKind: resolvedNominalizationKind,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresAbsolutiveState,
                "Compound-source adjectival NNC generation follows Andrews 41.2 and requires absolutive predicate state."
            ),
        });
    }
    if (!resolvedSurface) {
        return buildCompoundSourceAdjectivalNncUnsupportedOutput({
            compoundSourceSurface: resolvedSurface,
            requestedState,
            sourceCompoundFrame: resolvedCompoundFrame,
            nominalizationKind: resolvedNominalizationKind,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresCompoundSourceSurface,
                "Compound-source adjectival NNC generation requires a generated compound-source NNC surface from #3 salida."
            ),
        });
    }
    if (
        !resolvedCompoundFrame
        || typeof resolvedCompoundFrame !== "object"
        || String(resolvedCompoundFrame.kind || "").trim() !== "compound-frame"
    ) {
        return buildCompoundSourceAdjectivalNncUnsupportedOutput({
            compoundSourceSurface: resolvedSurface,
            requestedState,
            sourceCompoundFrame: resolvedCompoundFrame,
            nominalizationKind: resolvedNominalizationKind,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresCompoundSourceFrame,
                "Andrews 41.2 compound-source adjectival generation requires a parsed compound verbstem source frame."
            ),
        });
    }
    const frame = buildCompoundSourceAdjectivalNncFunctionFrame({
        compoundSourceSurface: resolvedSurface,
        sourceCompoundFrame: resolvedCompoundFrame,
        nominalizationKind: resolvedNominalizationKind,
        formulaSlots,
        formulaEcho,
        requestedState,
        role,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-compound-source",
        clauseKind: "nominal-nuclear-clause",
        supported: true,
        result: resolvedSurface,
        surfaceForms: [resolvedSurface],
        stem: resolvedSurface,
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        formulaSlots: formulaSlots || null,
        formulaEcho: String(formulaEcho || ""),
        adjectivalNncFunctionFrame: frame,
        compoundSourceAdjectivalNncFunctionFrame: frame,
        diagnostics: [],
    });
}

function cloneAdjectivalNncDenominalCompoundSourceFrame(frame = null) {
    if (!frame || typeof frame !== "object") {
        return null;
    }
    return {
        kind: String(frame.kind || "").trim(),
        version: frame.version || ADJECTIVAL_NNC_GENERATION_VERSION,
        lessonRef: String(frame.lessonRef || "").trim(),
        cites: Array.isArray(frame.cites) ? frame.cites.map((entry) => String(entry || "").trim()).filter(Boolean) : [],
        outputKind: String(frame.outputKind || "").trim(),
        sourceCategory: String(frame.sourceCategory || "").trim(),
        sourceStemType: String(frame.sourceStemType || "").trim(),
        operation: frame.operation && typeof frame.operation === "object" ? { ...frame.operation } : null,
        resultantNncKind: String(frame.resultantNncKind || "").trim(),
        matrix: frame.matrix && typeof frame.matrix === "object" ? { ...frame.matrix } : null,
        embeds: Array.isArray(frame.embeds) ? frame.embeds.map((entry) => ({ ...entry })) : [],
        sourceInput: frame.sourceInput && typeof frame.sourceInput === "object"
            ? {
                ...frame.sourceInput,
                parts: Array.isArray(frame.sourceInput.parts) ? [...frame.sourceInput.parts] : [],
            }
            : null,
        generatedVerbstem: String(frame.generatedVerbstem || "").trim(),
        sourceRootPlusYaBase: String(frame.sourceRootPlusYaBase || "").trim(),
        generatedSurfacePreserved: frame.generatedSurfacePreserved === true,
        hasModificationAst: frame.hasModificationAst === true,
        spellingAuthority: String(frame.spellingAuthority || "").trim(),
        grammarAuthority: String(frame.grammarAuthority || "").trim(),
        boundaries: frame.boundaries && typeof frame.boundaries === "object" ? { ...frame.boundaries } : null,
    };
}

function buildDenominalCompoundAdjectivalNncFunctionFrame({
    denominalCompoundSurface = "",
    sourceDenominalCompoundFrame = null,
    formulaSlots = null,
    formulaEcho = "",
    requestedState = "absolutive",
    role = "predicate-surface",
} = {}) {
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-denominal-compound-source",
        lessonRef: "Andrews 41.3",
        cites: ["Andrews 54.2", "Andrews 40.8.1"],
        nncKind: "adjectival",
        functionKind: ADJECTIVAL_NNC_FUNCTION.denominalCompoundAdjectival,
        role,
        rule: "compound nounstems may source ti denominal verbstems whose preterit-agentive NNCs function adjectivally",
        formation: ADJECTIVAL_NNC_FORMATION.denominalCompoundAdjectival,
        requiredPredicateState: "absolutive",
        requestedPredicateState: requestedState,
        actualPredicateState: "absolutive",
        sourceCategory: "compound-nounstem",
        operation: {
            type: "denominal-verbstem",
            suffix: "ti",
            nawatInputSuffix: "tiya",
        },
        nominalizationKind: "preterit-agentive",
        resultantNncKind: "preterit-agentive-adjectival",
        denominalCompoundSurface: String(denominalCompoundSurface || "").trim(),
        sourceDenominalCompoundFrame: cloneAdjectivalNncDenominalCompoundSourceFrame(sourceDenominalCompoundFrame),
        sourceFormulaSlots: formulaSlots || null,
        sourceFormulaEcho: String(formulaEcho || ""),
        generatedSurfacePreserved: true,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildDenominalCompoundAdjectivalNncUnsupportedOutput({
    denominalCompoundSurface = "",
    requestedState = "absolutive",
    diagnostic = null,
    sourceDenominalCompoundFrame = null,
    formulaSlots = null,
    formulaEcho = "",
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-denominal-compound-source",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(denominalCompoundSurface || ""),
        state: requestedState,
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildDenominalCompoundAdjectivalNncFunctionFrame({
            denominalCompoundSurface,
            sourceDenominalCompoundFrame,
            formulaSlots,
            formulaEcho,
            requestedState,
        }),
        diagnostics,
    });
}

function buildDenominalCompoundAdjectivalNncFunctionOutput({
    denominalCompoundSurface = "",
    surface = "",
    stem = "",
    state = "absolutive",
    sourceDenominalCompoundFrame = null,
    denominalCompoundFrame = null,
    formulaSlots = null,
    formulaEcho = "",
    role = "predicate-surface",
} = {}) {
    const requestedState = normalizeAdjectivalNncState(state);
    const resolvedSurface = String(denominalCompoundSurface || surface || stem || "").trim();
    const resolvedFrame = sourceDenominalCompoundFrame || denominalCompoundFrame || null;
    if (requestedState !== "absolutive") {
        return buildDenominalCompoundAdjectivalNncUnsupportedOutput({
            denominalCompoundSurface: resolvedSurface,
            requestedState,
            sourceDenominalCompoundFrame: resolvedFrame,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresAbsolutiveState,
                "Denominal-compound adjectival NNC generation follows Andrews 41.3 and requires absolutive predicate state."
            ),
        });
    }
    if (!resolvedSurface) {
        return buildDenominalCompoundAdjectivalNncUnsupportedOutput({
            denominalCompoundSurface: resolvedSurface,
            requestedState,
            sourceDenominalCompoundFrame: resolvedFrame,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresDenominalCompoundSurface,
                "Denominal-compound adjectival NNC generation requires a generated preterit-agentive NNC surface from #3 salida."
            ),
        });
    }
    if (
        !resolvedFrame
        || typeof resolvedFrame !== "object"
        || String(resolvedFrame.kind || "").trim() !== "denominal-compound-nounstem-frame"
    ) {
        return buildDenominalCompoundAdjectivalNncUnsupportedOutput({
            denominalCompoundSurface: resolvedSurface,
            requestedState,
            sourceDenominalCompoundFrame: resolvedFrame,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresDenominalCompoundFrame,
                "Andrews 41.3 denominal-compound adjectival generation requires a parsed compound nounstem source frame."
            ),
        });
    }
    const frame = buildDenominalCompoundAdjectivalNncFunctionFrame({
        denominalCompoundSurface: resolvedSurface,
        sourceDenominalCompoundFrame: resolvedFrame,
        formulaSlots,
        formulaEcho,
        requestedState,
        role,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-denominal-compound-source",
        clauseKind: "nominal-nuclear-clause",
        supported: true,
        result: resolvedSurface,
        surfaceForms: [resolvedSurface],
        stem: resolvedSurface,
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        formulaSlots: formulaSlots || null,
        formulaEcho: String(formulaEcho || ""),
        adjectivalNncFunctionFrame: frame,
        denominalCompoundAdjectivalNncFunctionFrame: frame,
        diagnostics: [],
    });
}

function buildIntensifiedAdjectivalNncFunctionFrame({
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    formulaSlots = null,
    formulaEcho = "",
    intensifiedStem = "",
    role = "predicate-surface",
} = {}) {
    const sourcePredicateStem = resolveAdjectivalNncFormulaSlotText(
        sourceFormulaSlots?.predicate,
        ["stem", "surface"]
    );
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-intensified",
        lessonRef: "Andrews 41.1",
        nncKind: "adjectival",
        functionKind: "intensified-adjectival",
        role,
        rule: "adjectival stems with verbal or deverbal source may be intensified by reduplication",
        formation: ADJECTIVAL_NNC_FORMATION.intensifiedAdjectival,
        sourceCategory: "adjectival-nnc",
        sourceClauseKind: "nominal-nuclear-clause",
        sourceSurface: String(sourceSurface || "").trim(),
        sourcePredicateStem,
        intensifiedStem: String(intensifiedStem || "").trim(),
        baseFormulaSlots: sourceFormulaSlots || null,
        baseFormulaEcho: String(sourceFormulaEcho || ""),
        sourceFormulaSlots: formulaSlots || null,
        sourceFormulaEcho: String(formulaEcho || ""),
        reduplicationKind: "adjectival-intensification",
        reusesFrequentativeEngine: false,
        generatedSurfacePreserved: false,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildIntensifiedAdjectivalNncUnsupportedOutput({
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    diagnostic = null,
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-intensified",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(sourceSurface || ""),
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildIntensifiedAdjectivalNncFunctionFrame({
            sourceSurface,
            sourceFormulaSlots,
            sourceFormulaEcho,
        }),
        diagnostics,
    });
}

function buildIntensifiedAdjectivalNncOutput({
    sourceSurface = "",
    surface = "",
    sourceFormulaSlots = null,
    formulaSlots = null,
    sourceFormulaEcho = "",
    formulaEcho = "",
    role = "predicate-surface",
} = {}) {
    const sourceSlots = sourceFormulaSlots || formulaSlots || null;
    const sourceEcho = sourceFormulaEcho || formulaEcho || "";
    const predicateStem = resolveAdjectivalNncFormulaSlotText(
        sourceSlots?.predicate,
        ["stem", "surface"]
    );
    const connector = resolveAdjectivalNncFormulaSlotText(
        sourceSlots?.subjectNumberConnector,
        ["connector", "surface"]
    );
    if (!predicateStem || !sourceSlots?.subjectNumberConnector) {
        return buildIntensifiedAdjectivalNncUnsupportedOutput({
            sourceSurface: String(sourceSurface || surface || "").trim(),
            sourceFormulaSlots: sourceSlots,
            sourceFormulaEcho: sourceEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresFormulaSlots,
                "Andrews 41.1 adjectival intensification requires generated NNC formula slots from #3 salida."
            ),
        });
    }
    const intensifiedStem = typeof buildOrdinaryNncReduplicatedSurface === "function"
        ? buildOrdinaryNncReduplicatedSurface(predicateStem)
        : `${predicateStem.slice(0, 1)}j${predicateStem}`;
    const intensifiedFormulaSlots = buildIntensifiedAdjectivalNncFormulaSlots({
        sourceFormulaSlots: sourceSlots,
        intensifiedStem,
    });
    const intensifiedFormulaEcho = buildAdjectivalNncFormulaEchoFromSlots(intensifiedFormulaSlots);
    const subjectPrefix = String(sourceSlots?.subjectPerson?.prefix || sourceSlots?.subjectPerson?.subjectPrefix || "");
    const result = `${subjectPrefix}${intensifiedStem}${connector === "Ø" ? "" : connector}`;
    const frame = buildIntensifiedAdjectivalNncFunctionFrame({
        sourceSurface: String(sourceSurface || surface || "").trim(),
        sourceFormulaSlots: sourceSlots,
        sourceFormulaEcho: sourceEcho,
        formulaSlots: intensifiedFormulaSlots,
        formulaEcho: intensifiedFormulaEcho,
        intensifiedStem,
        role,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-intensified",
        clauseKind: "nominal-nuclear-clause",
        supported: true,
        result,
        surfaceForms: [result],
        stem: intensifiedStem,
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        formulaSlots: intensifiedFormulaSlots,
        formulaEcho: intensifiedFormulaEcho,
        adjectivalNncFunctionFrame: frame,
        intensifiedAdjectivalNncFunctionFrame: frame,
        diagnostics: [],
    });
}

function resolveNominalizedVncAdjectivalLessonSpec(nominalizationKind = "") {
    const normalizedKind = normalizeAdjectivalNncText(nominalizationKind);
    return ADJECTIVAL_NNC_NOMINALIZED_VNC_KIND_LESSONS[normalizedKind] || null;
}

function buildNominalizedVncAdjectivalNncFunctionFrame({
    nominalizedSurface = "",
    nominalizationProfile = null,
    formulaSlots = null,
    formulaEcho = "",
    requestedState = "absolutive",
    role = "predicate-surface",
} = {}) {
    const nominalizationKind = normalizeAdjectivalNncText(nominalizationProfile?.role?.nominalizationKind || "");
    const lessonSpec = resolveNominalizedVncAdjectivalLessonSpec(nominalizationKind) || {};
    const source = nominalizationProfile?.source || {};
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-nominalized-vnc-function",
        lessonRef: lessonSpec.lessonRef || "Andrews 40.5",
        nncKind: "adjectival",
        functionKind: lessonSpec.functionKind || "nominalized-vnc-adjectival",
        role,
        rule: lessonSpec.rule || "nominalized VNC predicates may function adjectivally when the current Nawat engine has a generated NNC surface",
        formation: ADJECTIVAL_NNC_FORMATION.nominalizedVncAdjectival,
        requiredPredicateState: "absolutive",
        requestedPredicateState: requestedState,
        actualPredicateState: "absolutive",
        sourceCategory: "nominalized-vnc",
        sourceClauseKind: "nominal-nuclear-clause",
        nominalizedSurface: String(nominalizedSurface || "").trim(),
        nominalizationKind,
        sourceTenseValue: String(source.sourceTense || "").trim(),
        sourceCombinedMode: String(source.sourceCombinedMode || "").trim(),
        sourceFormulaSlots: formulaSlots || null,
        sourceFormulaEcho: String(formulaEcho || ""),
        generatedSurfacePreserved: true,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildNominalizedVncAdjectivalNncUnsupportedOutput({
    nominalizedSurface = "",
    requestedState = "absolutive",
    diagnostic = null,
    nominalizationProfile = null,
    formulaSlots = null,
    formulaEcho = "",
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-nominalized-vnc-function",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(nominalizedSurface || ""),
        state: requestedState,
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildNominalizedVncAdjectivalNncFunctionFrame({
            nominalizedSurface,
            nominalizationProfile,
            formulaSlots,
            formulaEcho,
            requestedState,
        }),
        diagnostics,
    });
}

function buildNominalizedVncAdjectivalNncFunctionOutput({
    nominalizedSurface = "",
    state = "absolutive",
    nominalizationProfile = null,
    formulaSlots = null,
    formulaEcho = "",
    role = "predicate-surface",
} = {}) {
    const requestedState = normalizeAdjectivalNncState(state);
    const surface = String(nominalizedSurface || "").trim();
    const nominalizationKind = normalizeAdjectivalNncText(nominalizationProfile?.role?.nominalizationKind || "");
    const lessonSpec = resolveNominalizedVncAdjectivalLessonSpec(nominalizationKind);
    if (requestedState !== "absolutive") {
        return buildNominalizedVncAdjectivalNncUnsupportedOutput({
            nominalizedSurface: surface,
            requestedState,
            nominalizationProfile,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresAbsolutiveState,
                "Nominalized VNC adjectival NNC generation follows Andrews 40.5-40.8 and requires absolutive predicate state."
            ),
        });
    }
    if (!surface) {
        return buildNominalizedVncAdjectivalNncUnsupportedOutput({
            nominalizedSurface: surface,
            requestedState,
            nominalizationProfile,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresNominalizedVncSurface,
                "Nominalized VNC adjectival NNC generation requires a generated NNC surface from #3 salida."
            ),
        });
    }
    if (!lessonSpec) {
        return buildNominalizedVncAdjectivalNncUnsupportedOutput({
            nominalizedSurface: surface,
            requestedState,
            nominalizationProfile,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.unsupportedNominalizedVncKind,
                "This generated nominalized VNC kind is not yet mapped to an Andrews 40.5-40.8 adjectival-function contract."
            ),
        });
    }
    const frame = buildNominalizedVncAdjectivalNncFunctionFrame({
        nominalizedSurface: surface,
        nominalizationProfile,
        formulaSlots,
        formulaEcho,
        requestedState,
        role,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-nominalized-vnc-function",
        clauseKind: "nominal-nuclear-clause",
        supported: true,
        result: surface,
        surfaceForms: [surface],
        stem: surface,
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        formulaSlots: formulaSlots || null,
        formulaEcho: String(formulaEcho || ""),
        adjectivalNncFunctionFrame: frame,
        nominalizedVncAdjectivalNncFunctionFrame: frame,
        diagnostics: [],
    });
}

function generateAdjectivalNncFunctionOutput({
    stem = "",
    state = "absolutive",
    subject = null,
    number = "singular",
    pluralType = "auto",
    nounClass = "",
    animacy = "",
    role = "modifier-candidate",
} = {}) {
    const requestedState = normalizeAdjectivalNncState(state);
    if (requestedState !== "absolutive") {
        return buildAdjectivalNncUnsupportedOutput({
            stem,
            requestedState,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresAbsolutiveState,
                "Adjectival NNC generation follows Andrews 40.1 and requires absolutive predicate state."
            ),
        });
    }
    if (typeof generateOrdinaryNncParadigm !== "function") {
        return buildAdjectivalNncUnsupportedOutput({
            stem,
            requestedState,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.unavailable,
                "Ordinary NNC generation is unavailable, so adjectival NNC function generation cannot run."
            ),
        });
    }
    const sourceNnc = generateOrdinaryNncParadigm({
        stem,
        state: "absolutive",
        subject,
        number,
        pluralType,
        nounClass,
        animacy,
    });
    const frame = buildAdjectivalNncFunctionFrame({
        sourceNnc,
        requestedState,
        role,
    });
    if (!sourceNnc?.supported) {
        return buildAdjectivalNncUnsupportedOutput({
            stem,
            requestedState,
            sourceNnc,
        });
    }
    return attachAdjectivalNncGrammarContract({
        ...sourceNnc,
        outputKind: "adjectival-nnc-function",
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: frame,
        sourceNnc,
        diagnostics: Array.isArray(sourceNnc.diagnostics) ? [...sourceNnc.diagnostics] : [],
    });
}

function generateRootPlusYaAdjectivalNncOutput({
    stem = "",
    state = "absolutive",
    subject = null,
    role = "predicate-surface",
} = {}) {
    const requestedState = normalizeAdjectivalNncState(state);
    const parsedVerb = resolveAdjectivalNncParsedVerb(stem);
    if (requestedState !== "absolutive") {
        return buildRootPlusYaAdjectivalNncUnsupportedOutput({
            stem,
            requestedState,
            parsedVerb,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresAbsolutiveState,
                "Root-plus-ya adjectival NNC generation follows Andrews 40.9 and requires absolutive predicate state."
            ),
        });
    }
    const source = resolveRootPlusYaAdjectivalNncSource(parsedVerb);
    const rootPlusYaBase = source.rootPlusYaBase;
    if (!source.supported || !rootPlusYaBase) {
        const diagnosticId = source.diagnosticId || ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa;
        const messageById = {
            [ADJECTIVAL_NNC_DIAGNOSTIC_IDS.rootPlusYaException]: "Andrews 40.9 excludes the hue-i-ya/weya path from the obsolete-preterit adjectival route.",
            [ADJECTIVAL_NNC_DIAGNOSTIC_IDS.segmentedRootPlusYaUnsupported]: "Segmented slash sources require a denominal tiya source before using the Andrews 40.9 adjectival route.",
            [ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa]: "Root-plus-ya adjectival NNC generation requires a recognized root-plus-ya source.",
        };
        return buildRootPlusYaAdjectivalNncUnsupportedOutput({
            stem,
            requestedState,
            parsedVerb,
            rootPlusYaBase,
            sourceFormationSubtype: source.sourceFormationSubtype,
            diagnostic: buildAdjectivalNncDiagnostic(
                diagnosticId,
                messageById[diagnosticId] || messageById[ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa]
            ),
        });
    }
    const subjectSlot = subject && typeof subject === "object" ? subject : {};
    const formulaSlots = buildRootPlusYaAdjectivalNncFormulaSlots({
        rootPlusYaBase,
        subject: subjectSlot,
        sourceFormationSubtype: source.sourceFormationSubtype,
    });
    const formulaEcho = buildAdjectivalNncFormulaEchoFromSlots(formulaSlots);
    const subjectPrefix = String(subjectSlot.subjectPrefix || "");
    const result = `${subjectPrefix}${rootPlusYaBase}k`;
    const frame = buildRootPlusYaAdjectivalNncFunctionFrame({
        parsedVerb,
        rootPlusYaBase,
        formulaSlots,
        requestedState,
        role,
        sourceFormationSubtype: source.sourceFormationSubtype,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-root-plus-ya",
        clauseKind: "nominal-nuclear-clause",
        supported: true,
        result,
        surfaceForms: [result],
        stem: String(parsedVerb?.verb || stem || ""),
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        formulaSlots,
        formulaEcho,
        adjectivalNncFunctionFrame: frame,
        rootPlusYaAdjectivalNncFrame: frame,
        denominalCompoundSourceFrame: frame.denominalCompoundSourceFrame || null,
        diagnostics: [],
    });
}
