// core/derivation/source_model.js
// Source-model and source-chain helpers shared by derivation, patientivo,
// nominal, and explainability paths.
// Depends on parsing helpers, allomorphy stem-spec builders, and global config.

"use strict";

function buildNonactiveSourceChain(verbMeta, verb, analysisVerb) {
    const model = buildDerivationSourceModel(verbMeta, verb, analysisVerb);
    const outerPieces = Array.isArray(model?.outerPieces) ? model.outerPieces : [];
    const directionalPrefixes = outerPieces
        .filter((piece) => piece?.type === "directional" && piece?.value)
        .map((piece) => piece.value);
    const lexicalPrefixes = outerPieces
        .filter((piece) => piece?.type === "lexical" && piece?.value)
        .map((piece) => piece.value);
    const explicitBoundNonspecificPrefixes = outerPieces
        .filter((piece) => piece?.type === "valence" && piece?.value)
        .map((piece) => piece.value);
    const impersonalPrefixes = outerPieces
        .filter((piece) => piece?.type === "impersonal" && piece?.value)
        .map((piece) => piece.value);
    const prefixParts = outerPieces.map((piece) => piece?.value || "").filter(Boolean);
    const corePrefixParts = Array.isArray(model?.corePrefixParts)
        ? model.corePrefixParts
            .filter((piece) => piece?.type === "adjacent-embed" && piece?.value)
            .map((piece) => piece.value)
        : [];
    const supportiveMarker = String(model?.supportiveMarker || "");
    const normalizedSourceBase = normalizeRuleBase(model?.matrixBase || analysisVerb || verb || "");
    const normalizedSourcePrefix = lexicalPrefixes.join("");
    return {
        baseVerb: normalizedSourceBase,
        prefix: prefixParts.join(""),
        prefixParts,
        corePrefixParts,
        supportiveMarker,
        directionalPrefixes,
        lexicalPrefixes,
        valencePrefixes: explicitBoundNonspecificPrefixes,
        impersonalPrefixes,
        sourceKind: String(model?.sourceKind || "surface"),
        sourceBase: normalizedSourceBase,
        sourcePrefix: normalizedSourcePrefix,
        model,
    };
}

function buildFullDerivationSourceChain(verbMeta, verb, analysisVerb) {
    return buildNonactiveSourceChain(verbMeta, verb, analysisVerb);
}

var FULL_SOURCE_CHAIN_REALIZATION_POLICY = Object.freeze({
    preserveDirectional: true,
    preserveLexical: true,
    preserveValence: true,
    preserveImpersonal: true,
    preserveSupportive: true,
    preserveAdjacentEmbed: true,
});

const PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY = Object.freeze({
    preserveDirectional: true,
    preserveLexical: true,
    preserveValence: true,
    preserveImpersonal: true,
    preserveSupportive: true,
    preserveAdjacentEmbed: true,
});

const PATIENTIVO_PERFECTIVO_SOURCE_CHAIN_POLICY = Object.freeze({
    preserveDirectional: true,
    preserveLexical: true,
    preserveValence: true,
    preserveImpersonal: true,
    preserveSupportive: true,
    preserveAdjacentEmbed: true,
});

const SUSTANTIVO_VERBAL_SOURCE_CHAIN_POLICY = Object.freeze({
    preserveDirectional: true,
    preserveLexical: true,
    preserveValence: true,
    preserveImpersonal: true,
    preserveSupportive: true,
    preserveAdjacentEmbed: true,
});

const CALIFICATIVO_INSTRUMENTIVO_SOURCE_CHAIN_POLICY = Object.freeze({
    preserveDirectional: true,
    preserveLexical: true,
    preserveValence: true,
    preserveImpersonal: true,
    preserveSupportive: true,
    preserveAdjacentEmbed: true,
});

function getDerivationContinuationContractTargetInput(record = null) {
    const source = record && typeof record === "object" ? record : {};
    return String(
        source.prelocativeVerbInput
        || source.compoundVerbInput
        || source.ordinaryNncInput
        || source.ownerhoodVerbInput
        || source.complementVerbInput
        || source.adverbialVerbInput
        || source.compoundStem
        || ""
    ).trim();
}

function normalizeDerivationContinuationContractSurface(value = "") {
    if (typeof normalizeGrammarSurfaceValue === "function") {
        return normalizeGrammarSurfaceValue(value);
    }
    const text = String(value || "").trim();
    return text === "—" ? "" : text;
}

function splitDerivationContinuationContractSurface(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeDerivationContinuationContractSurface(entry))
        .filter(Boolean);
}

function getDerivationContinuationContractGrammarFrame(record = null) {
    const source = record && typeof record === "object" ? record : {};
    return (
        (source.grammarFrame && typeof source.grammarFrame === "object" ? source.grammarFrame : null)
        || (source.frames && typeof source.frames === "object" ? source.frames : null)
    );
}

function getDerivationContinuationContractResultFrame(record = null) {
    const grammarFrame = getDerivationContinuationContractGrammarFrame(record);
    return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
}

function getDerivationContinuationContractSourceInput(record = null) {
    const source = record && typeof record === "object" ? record : {};
    const resultFrame = getDerivationContinuationContractResultFrame(source);
    const framedForms = [];
    if (Array.isArray(resultFrame?.surfaceForms)) {
        framedForms.push(...resultFrame.surfaceForms);
    }
    if (resultFrame?.surface) {
        framedForms.push(resultFrame.surface);
    }
    const normalizedFrameForms = framedForms
        .flatMap((entry) => splitDerivationContinuationContractSurface(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
    if (normalizedFrameForms.length) {
        return normalizedFrameForms[0];
    }
    if (resultFrame) {
        return "";
    }
    const contractForms = [];
    if (Array.isArray(source.surfaceForms)) {
        contractForms.push(...source.surfaceForms);
    }
    if (source.surface) {
        contractForms.push(source.surface);
    }
    if (source.result) {
        contractForms.push(source.result);
    }
    const normalizedContractForms = contractForms
        .flatMap((entry) => splitDerivationContinuationContractSurface(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
    if (normalizedContractForms.length) {
        return normalizedContractForms[0];
    }
    return normalizeDerivationContinuationContractSurface(
        source.sourceSurface
        || source.patientivoSurface
        || source.characteristicSurface
        || source.actionNominalSurface
        || source.preteritAgentiveStem
        || source.customaryAgentiveStem
        || source.nounStem
        || ""
    );
}

function getDerivationContinuationContractAndrewsRefs(record = null) {
    const source = record && typeof record === "object" ? record : {};
    const refs = [
        source.grammarSource,
        source.matrix?.grammarSource,
        source.formationFrame?.grammarSource,
    ]
        .map((entry) => String(entry || "").trim())
        .filter(Boolean);
    return refs.filter((entry, index, list) => list.indexOf(entry) === index);
}

function getDerivationContinuationSourceAdjunctSurface(record = null) {
    const source = record && typeof record === "object" ? record : {};
    return String(
        source.patientivoSurface
        || source.characteristicSurface
        || source.actionNominalSurface
        || source.preteritAgentiveStem
        || source.customaryAgentiveStem
        || source.nounStem
        || source.incorporatedRoot
        || ""
    ).trim();
}

function getDerivationContinuationSourceAdjunctKind(record = null, outputKind = "") {
    const source = record && typeof record === "object" ? record : {};
    if (source.patientivoSurface) {
        return "patientive-nounstem";
    }
    if (source.characteristicSurface) {
        return "characteristic-property-nounstem";
    }
    if (source.actionNominalSurface) {
        return "active-action-nounstem";
    }
    if (source.preteritAgentiveStem) {
        return "preterit-agentive-nounstem";
    }
    if (source.customaryAgentiveStem) {
        return "customary-agentive-nounstem";
    }
    if (source.nounStem) {
        return "ordinary-nounstem";
    }
    if (/nominal|nnc|noun/i.test(String(outputKind || ""))) {
        return "nounstem";
    }
    return "";
}

function getDerivationContinuationEmbedRole(record = null, outputKind = "") {
    const source = record && typeof record === "object" ? record : {};
    const formationFrame = source.formationFrame && typeof source.formationFrame === "object"
        ? source.formationFrame
        : {};
    const framedRole = String(
        formationFrame.incorporated?.role
        || formationFrame.embed?.role
        || ""
    ).trim();
    if (framedRole) {
        return framedRole;
    }
    const kind = String(outputKind || source.outputKind || "").trim();
    if (/complement/i.test(kind)) {
        return "incorporated-complement";
    }
    if (/adverbial/i.test(kind)) {
        return "incorporated-adverb";
    }
    if (/ownerhood/i.test(kind)) {
        return "incorporated-ownerhood";
    }
    if (/compound-embed/i.test(kind)) {
        return "compound-embed";
    }
    if (/nominal-compound/i.test(kind)) {
        return "nominal-compound-embed";
    }
    return "";
}

function getDerivationContinuationEmbeddedRoot(record = null) {
    const source = record && typeof record === "object" ? record : {};
    const formationFrame = source.formationFrame && typeof source.formationFrame === "object"
        ? source.formationFrame
        : {};
    return String(
        formationFrame.incorporated?.root
        || formationFrame.embed?.root
        || source.incorporatedRoot
        || source.nounStem
        || ""
    ).trim();
}

function getDerivationContinuationMatrixValence(record = null) {
    const source = record && typeof record === "object" ? record : {};
    const formationFrame = source.formationFrame && typeof source.formationFrame === "object"
        ? source.formationFrame
        : {};
    return String(
        source.matrix?.matrixValency
        || source.matrix?.valency
        || formationFrame.matrix?.matrixValency
        || formationFrame.matrix?.valency
        || ""
    ).trim();
}

function getDerivationContinuationMatrixFrame(record = null) {
    const source = record && typeof record === "object" ? record : {};
    const formationFrame = source.formationFrame && typeof source.formationFrame === "object"
        ? source.formationFrame
        : {};
    const matrix = source.matrix && typeof source.matrix === "object" ? source.matrix : {};
    const framedMatrix = formationFrame.matrix && typeof formationFrame.matrix === "object"
        ? formationFrame.matrix
        : {};
    return {
        id: String(matrix.id || framedMatrix.id || "").trim(),
        root: String(matrix.nawatRoot || matrix.root || framedMatrix.root || source.matrixRoot || "").trim(),
        classicalMatrix: String(matrix.classicalMatrix || framedMatrix.classicalMatrix || "").trim(),
        valence: getDerivationContinuationMatrixValence(source),
        objectPrefix: String(matrix.objectPrefix || source.objectPrefix || "").trim(),
        grammarSource: String(matrix.grammarSource || source.grammarSource || formationFrame.grammarSource || "").trim(),
        status: String(matrix.status || "").trim(),
        supported: matrix.supported === true || source.supported === true,
    };
}

function getDerivationContinuationFinalFormulaShape(targetInput = "", outputKind = "") {
    const target = String(targetInput || "").trim();
    if (/^-?\([^()/]+\/[^()/]+\)$/.test(target)) {
        return "compound-vnc-embed-before-matrix";
    }
    if (/^\([^()]+\)-\([^()]+\)$/.test(target)) {
        return "adjacent-nnc-ownerhood-matrix";
    }
    if (/nominal-compound/i.test(String(outputKind || ""))) {
        return "compound-nnc-embed-before-matrix";
    }
    return target ? "route-target-specific-shape" : "";
}

function getDerivationContinuationSourceExternalObjectSlots(sourceFormulaSlots = null) {
    const slots = sourceFormulaSlots && typeof sourceFormulaSlots === "object"
        ? sourceFormulaSlots
        : {};
    return ["obj1", "obj2", "obj3", "reflexivo"]
        .map((slotId) => {
            const slot = slots[slotId] && typeof slots[slotId] === "object"
                ? slots[slotId]
                : null;
            const value = String(
                slot?.token
                || slot?.prefix
                || slot?.displayPrefix
                || slot?.surface
                || slot?.value
                || ""
            ).trim();
            return value ? { slotId, prefix: value, sourceLayer: "source-formula-slots" } : null;
        })
        .filter(Boolean);
}

function getDerivationContinuationRemainingExternalObjectSlots(record = null) {
    const source = record && typeof record === "object" ? record : {};
    const formationFrame = source.formationFrame && typeof source.formationFrame === "object"
        ? source.formationFrame
        : {};
    const prefix = String(
        source.objectPrefix
        || source.objectTransfer?.objectPrefix
        || formationFrame.outsideObject?.prefix
        || source.matrix?.objectPrefix
        || ""
    ).trim();
    return prefix ? [{
        slotId: "obj1",
        prefix,
        owner: "matrix",
        sourceLayer: "route-frame",
    }] : [];
}

function getDerivationContinuationConsumedObjectSlot(embedRole = "") {
    const role = String(embedRole || "").trim();
    if (role === "incorporated-object") {
        return "obj1";
    }
    if (/complement/i.test(role)) {
        return "complement";
    }
    if (/ownerhood|possess/i.test(role)) {
        return "possessor";
    }
    return "";
}

function buildDerivationContinuationObjectSlotOwnershipFrame({
    embedRole = "",
    matrixValence = "",
    consumedObjectSlot = "",
    sourceExternalObjectSlots = [],
    remainingExternalObjectSlots = [],
} = {}) {
    const sourceSlots = Array.isArray(sourceExternalObjectSlots) ? sourceExternalObjectSlots : [];
    const remainingSlots = Array.isArray(remainingExternalObjectSlots) ? remainingExternalObjectSlots : [];
    const resolvedMatrixValence = String(matrixValence || "").trim();
    const matrixValenceFrameFixed = Boolean(resolvedMatrixValence);
    return {
        kind: "andrews-incorporation-object-slot-ownership-frame",
        version: 1,
        embedRole: String(embedRole || "").trim(),
        matrixValence: resolvedMatrixValence,
        matrixValenceFrameFixed,
        consumedObjectSlot: String(consumedObjectSlot || "").trim(),
        consumedObjectSlotOwnedBy: consumedObjectSlot ? "route-frame" : "none",
        sourceExternalObjectSlotsOwnedBy: sourceSlots.length
            ? "source-principal-vnc-formula-frame"
            : "none",
        remainingExternalObjectSlotsOwnedBy: remainingSlots.length
            ? "matrix-route-frame"
            : "none",
        embeddedRoleLicensedBy: embedRole ? "andrews-incorporation-route-frame" : "none",
        routeFrameOwnsObjectSlotLicensing: matrixValenceFrameFixed,
        functionUseOwnsObjectSlots: false,
        finalFormulaShapeOwnsObjectSlots: false,
        functionUseMayAnnotateLicensedReadingsOnly: true,
        matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership: true,
        objectSlotLicensingOrder: [
            "source-principal-vnc",
            "source-adjunct-nnc",
            "matrix-valence-frame",
            "route-frame",
            "function-use-annotation",
        ],
    };
}

function buildDerivationContinuationIncorporationRouteFrame(record = null, {
    outputKind = "",
    supported = false,
    targetInput = "",
    routeStage = "",
    andrewsRefs = [],
} = {}) {
    if (!record || typeof record !== "object") {
        return null;
    }
    const kind = String(outputKind || record.outputKind || "").trim();
    const embeddedRoot = getDerivationContinuationEmbeddedRoot(record);
    const embedRole = getDerivationContinuationEmbedRole(record, kind);
    const remainingExternalObjectSlots = getDerivationContinuationRemainingExternalObjectSlots(record);
    const sourceExternalObjectSlots = getDerivationContinuationSourceExternalObjectSlots(record.sourceFormulaSlots);
    const sourceInput = getDerivationContinuationContractSourceInput(record);
    const sourceAdjunctSurface = getDerivationContinuationSourceAdjunctSurface(record);
    const finalFormulaShape = getDerivationContinuationFinalFormulaShape(targetInput, kind);
    if (!embeddedRoot && !embedRole && !finalFormulaShape) {
        return null;
    }
    const stemInternalObjectSlotDelta = embedRole === "incorporated-object" ? 1 : 0;
    const complementSlotDelta = /complement/i.test(embedRole) ? 1 : 0;
    const adverbialFunctionDelta = /adverb/i.test(embedRole) ? 1 : 0;
    const externalObjectSlotDelta = remainingExternalObjectSlots.length - sourceExternalObjectSlots.length;
    const matrixValence = getDerivationContinuationMatrixValence(record);
    const consumedObjectSlot = getDerivationContinuationConsumedObjectSlot(embedRole);
    const objectSlotOwnership = buildDerivationContinuationObjectSlotOwnershipFrame({
        embedRole,
        matrixValence,
        consumedObjectSlot,
        sourceExternalObjectSlots,
        remainingExternalObjectSlots,
    });
    const matrixValenceFrameFixed = objectSlotOwnership.matrixValenceFrameFixed === true;
    const refs = (Array.isArray(andrewsRefs) ? andrewsRefs : [])
        .map((entry) => String(entry || "").trim())
        .filter(Boolean);
    return {
        kind: "andrews-incorporation-route-frame",
        version: 1,
        sourcePrincipalVnc: {
            surface: sourceInput,
            formulaSlots: record.sourceFormulaSlots && typeof record.sourceFormulaSlots === "object"
                ? record.sourceFormulaSlots
                : null,
            formulaEcho: String(record.sourceFormulaEcho || "").trim(),
        },
        sourceAdjunctNnc: {
            surface: sourceAdjunctSurface,
            stem: embeddedRoot,
            kind: getDerivationContinuationSourceAdjunctKind(record, kind),
            role: embedRole,
        },
        matrix: getDerivationContinuationMatrixFrame(record),
        matrixValence,
        embedRole,
        embeddedRoot,
        consumedObjectSlot,
        sourceExternalObjectSlots,
        remainingExternalObjectSlots,
        remainingExternalObjectSlotIds: remainingExternalObjectSlots.map((slot) => slot.slotId),
        objectSlotOwnership,
        valenceDelta: externalObjectSlotDelta,
        valenceEffects: {
            sourceExternalObjectSlotCount: sourceExternalObjectSlots.length,
            remainingExternalObjectSlotCount: remainingExternalObjectSlots.length,
            externalObjectSlotDelta,
            stemInternalObjectSlotDelta,
            complementSlotDelta,
            adverbialFunctionDelta,
        },
        andrewsSection: refs[0] || String(record.grammarSource || record.formationFrame?.grammarSource || "").trim(),
        andrewsRefs: refs,
        generationStatus: supported ? "supported" : "blocked",
        generationAllowed: supported === true,
        routeStage: String(routeStage || "").trim(),
        finalFormulaShape,
        routeFrameLicensesEmbedRole: true,
        routeFrameLicensesObjectSlotOwnership: matrixValenceFrameFixed,
        finalFormulaShapeDoesNotLicenseRole: true,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseRole: true,
        functionUseDoesNotLicenseObjectSlots: true,
        sourceRouteFrameRequired: true,
        boundaries: {
            matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership: true,
            routeFrameOwnsEmbedRoleLicensing: true,
            finalFormulaShapeDoesNotLicenseRole: true,
            functionUseDoesNotLicenseRole: true,
        },
    };
}

function getDerivationContinuationDiagnosticLayerContract(entry = null) {
    const diagnosticId = typeof entry === "string"
        ? entry
        : String(entry?.id || entry?.code || entry?.message || "");
    const id = String(diagnosticId || "").trim();
    if (/missing-(patientivo|characteristic|action-nominal|general-use|fully-nominalized|noun-stem|incorporated-root|surface)/i.test(id)) {
        return { failedLayer: "stem", contractLayer: "stemFrame" };
    }
    if (/unmapped-(possessor|subject)|object-transfer|source-state/i.test(id)) {
        return { failedLayer: "agreement", contractLayer: "participantFrame" };
    }
    if (/missing-(verb-input|nnc-input)|missing-.*input/i.test(id)) {
        return { failedLayer: "output", contractLayer: "resultFrame" };
    }
    if (/unsupported-matrix|class-matrix-mismatch|ambiguous-ti-class|unsupported-noun-class/i.test(id)) {
        return { failedLayer: "route", contractLayer: "routeContract" };
    }
    return { failedLayer: "route", contractLayer: "routeContract" };
}

function normalizeDerivationContinuationDiagnosticEntries(diagnostics = [], {
    routeStage = "",
} = {}) {
    return (Array.isArray(diagnostics) ? diagnostics : [])
        .map((entry) => {
            if (!entry) {
                return null;
            }
            const normalizedEntry = typeof entry === "string"
                ? { id: String(entry || "").trim(), message: "" }
                : (entry && typeof entry === "object" ? { ...entry } : null);
            if (!normalizedEntry) {
                return null;
            }
            const id = String(normalizedEntry.id || normalizedEntry.code || normalizedEntry.message || "").trim();
            if (!id) {
                return null;
            }
            const layerContract = getDerivationContinuationDiagnosticLayerContract(normalizedEntry);
            return {
                ...normalizedEntry,
                id,
                code: String(normalizedEntry.code || id.toUpperCase().replace(/-/g, "_")).trim(),
                severity: String(normalizedEntry.severity || "error").trim(),
                message: String(normalizedEntry.message || "").trim(),
                failedLayer: normalizedEntry.failedLayer || layerContract.failedLayer,
                contractLayer: normalizedEntry.contractLayer || layerContract.contractLayer,
                routeFamily: normalizedEntry.routeFamily || "derivation-continuation",
                routeStage: normalizedEntry.routeStage || String(routeStage || "").trim(),
            };
        })
        .filter(Boolean)
        .filter((entry, index, list) => {
            const key = `${entry.id || ""}|${entry.severity || ""}|${entry.message || ""}`;
            return list.findIndex((candidate) => (
                `${candidate.id || ""}|${candidate.severity || ""}|${candidate.message || ""}` === key
            )) === index;
        });
}

function attachDerivationContinuationGrammarContract(record = null) {
    if (!record || typeof record !== "object" || typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    const outputKind = String(record.outputKind || "derivation-continuation-contract").trim();
    const supported = record.supported === true;
    const sourceInput = getDerivationContinuationContractSourceInput(record);
    const sourceSurface = sourceInput;
    const targetInput = getDerivationContinuationContractTargetInput(record);
    const inputDiagnostics = Array.isArray(record.diagnostics) ? record.diagnostics : [];
    const routeStage = supported ? "preview-continuation" : "blocked";
    const diagnostics = normalizeDerivationContinuationDiagnosticEntries(inputDiagnostics, {
        routeStage,
    });
    const andrewsRefs = getDerivationContinuationContractAndrewsRefs(record);
    const incorporationRouteFrame = buildDerivationContinuationIncorporationRouteFrame(record, {
        outputKind,
        supported,
        targetInput,
        routeStage,
        andrewsRefs,
    });
    const framedRecord = incorporationRouteFrame
        ? {
            ...record,
            incorporationRouteFrame,
            sourceRouteFrame: incorporationRouteFrame,
            routeFrame: incorporationRouteFrame,
        }
        : record;
    const output = attachGrammarMetadataContract({
        ...framedRecord,
        diagnostics: [],
    }, {
        enumerable: false,
        metadataKind: outputKind,
        unitKind: "derivation-continuation-contract",
        routeFamily: "derivation-continuation",
        routeStage,
        generationAllowed: supported,
        supported,
        structuralSource: andrewsRefs[0] || "Andrews derivation continuation",
        andrewsRefs,
        evidenceStatus: supported ? "continuation-supported" : "blocked",
        diagnosticStatus: supported ? "continuation-supported" : "blocked",
        surface: "",
        surfaceForms: [],
        sourceInput,
        diagnostics,
        sourceContract: {
            unitKind: "generated-source-output",
            sourceInput,
            sourceSurface,
            patientivoSurface: String(record.patientivoSurface || "").trim(),
            sourceState: String(record.sourceState || "").trim(),
            sourceKind: String(record.sourceKind || "").trim(),
            sourceFormulaSlots: record.sourceFormulaSlots && typeof record.sourceFormulaSlots === "object"
                ? record.sourceFormulaSlots
                : null,
            sourceFormulaEcho: String(record.sourceFormulaEcho || "").trim(),
            incorporationRouteFrame,
            sourceRouteFrame: incorporationRouteFrame,
            routeFrame: incorporationRouteFrame,
        },
        targetContract: {
            unitKind: "continuation-target",
            outputKind,
            targetInput,
            generationAllowed: supported,
            incorporationRouteFrame,
            sourceRouteFrame: incorporationRouteFrame,
            routeFrame: incorporationRouteFrame,
            request: record.prelocativeRequest
                || record.compoundRequest
                || record.ownerhoodRequest
                || record.complementRequest
                || record.adverbialRequest
                || record.ordinaryNncRequest
                || null,
        },
        orthographyFrame: {
            surface: "",
            surfaceForms: [],
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
            targetInput,
        },
        stemFrame: {
            sourceStem: sourceInput,
            incorporatedRoot: String(record.incorporatedRoot || "").trim(),
            matrixRoot: String(record.matrixRoot || "").trim(),
            nounStem: String(record.nounStem || "").trim(),
            compoundStem: String(record.compoundStem || "").trim(),
            targetInput,
            matrix: record.matrix || null,
            formationFrame: record.formationFrame || null,
            incorporationRouteFrame,
            sourceRouteFrame: incorporationRouteFrame,
            routeFrame: incorporationRouteFrame,
        },
        morphBoundaryFrame: {
            formationFrame: record.formationFrame || null,
            incorporationRouteFrame,
            sourceRouteFrame: incorporationRouteFrame,
            routeFrame: incorporationRouteFrame,
            objectTransfer: record.objectTransfer || null,
            omittedSuffix: String(record.omittedSuffix || "").trim(),
            nounClass: String(record.nounClass || "").trim(),
            ownerhoodKind: String(record.ownerhoodKind || "").trim(),
            formulaSlots: record.sourceFormulaSlots && typeof record.sourceFormulaSlots === "object"
                ? record.sourceFormulaSlots
                : null,
            formulaEcho: String(record.sourceFormulaEcho || "").trim(),
        },
        participantFrame: {
            object: record.objectTransfer || {
                prefix: String(record.objectPrefix || "").trim(),
            },
            objectSlotOwnership: incorporationRouteFrame?.objectSlotOwnership || null,
            incorporationRouteFrame,
            sourceRouteFrame: incorporationRouteFrame,
            routeFrame: incorporationRouteFrame,
            possessor: {
                prefix: String(record.possessorPrefix || "").trim(),
            },
        },
        inflectionFrame: {
            outputKind,
            sourceTenseValue: String(record.sourceTenseValue || "").trim(),
            sourceCombinedMode: String(record.sourceCombinedMode || "").trim(),
        },
    });
    Object.defineProperty(output, "diagnostics", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: inputDiagnostics,
    });
    return output;
}

function normalizeDerivationSourceOuterPiece(piece = null) {
    if (!piece || !piece.type || !piece.value) {
        return null;
    }
    if (piece.type === "lexical") {
        const lexicalValue = normalizeRuleBase(piece.value);
        return lexicalValue ? { type: "lexical", value: lexicalValue } : null;
    }
    if (piece.type === "valence") {
        const valenceValue = normalizeComposerSecondaryValenceSurfaceToken(piece.value)
            || normalizeComposerValenceToken(piece.value)
            || normalizeComposerStem(piece.value);
        return valenceValue ? { type: "valence", value: valenceValue } : null;
    }
    if (piece.type === "directional") {
        const directionalValue = normalizeComposerStem(piece.value);
        return directionalValue ? { type: "directional", value: directionalValue } : null;
    }
    if (piece.type === "impersonal") {
        const impersonalValue = normalizeRuleBase(piece.value);
        return impersonalValue ? { type: "impersonal", value: impersonalValue } : null;
    }
    return null;
}

function buildCurrentRegexDerivationSourceModel(rawValue = "") {
    const raw = serializeRegexInputValue(String(rawValue || "").trim());
    if (!raw) {
        return null;
    }
    const movingTargetParsed = parseMovingTargetRegexInput(raw);
    if (!movingTargetParsed || movingTargetParsed.isValid !== true) {
        return null;
    }
    const outerPieces = (Array.isArray(movingTargetParsed.outerPieces) ? movingTargetParsed.outerPieces : [])
        .map((piece) => normalizeDerivationSourceOuterPiece(piece))
        .filter(Boolean);
    const markedCore = convertEnvelopeSupportiveMarkersToRegexInput(
        normalizeRegexCoreTokenCase(String(movingTargetParsed.coreText || "").trim())
    );
    const supportiveMatch = String(markedCore || "").match(/^\[([iy])\]/i);
    const supportiveMarker = supportiveMatch
        ? String(supportiveMatch[1] || "").toLowerCase()
        : "";
    const plainCore = String(markedCore || "")
        .replace(/^\[([iy])\]/i, "")
        .trim()
        .toLowerCase();
    const inline = parseInlineTiCausativeClassFromBase(collapseSerialStemDashInput(plainCore));
    const normalizedCoreBase = String(inline.base || plainCore || "").trim().toLowerCase();
    const adjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(normalizedCoreBase);
    const matrixBase = normalizeRuleBase(adjacentCoreEmbed ? adjacentCoreEmbed.stem : normalizedCoreBase);
    const corePrefixParts = [];
    if (supportiveMarker) {
        corePrefixParts.push({ type: "supportive", value: supportiveMarker });
    }
    if (adjacentCoreEmbed?.embed) {
        const normalizedEmbed = normalizeRuleBase(adjacentCoreEmbed.embed);
        if (normalizedEmbed) {
            corePrefixParts.push({ type: "adjacent-embed", value: normalizedEmbed });
        }
    }
    return {
        sourceKind: "current-regex",
        parseLanguage: "current-regex",
        rawRegex: raw,
        transitivity: movingTargetParsed.transitivity || COMPOSER_TRANSITIVITY.intransitive,
        outerPieces,
        corePrefixParts,
        supportiveMarker,
        adjacentCoreEmbed: normalizeRuleBase(adjacentCoreEmbed?.embed || ""),
        matrixBase,
    };
}

function buildFallbackDerivationSourceModel(verbMeta = {}, verb = "", analysisVerb = "") {
    const meta = verbMeta || {};
    const parseLanguage = String(meta?.parseLanguage || meta?.canonical?.parseLanguage || "");
    const splitSource = resolveCanonicalSourceSplit(meta, {
        verb: verb || "",
        analysisVerb: analysisVerb || "",
    });
    const structuralOuterPieces = Array.isArray(meta?.structuralOuterPieces)
        ? meta.structuralOuterPieces
        : (
            Array.isArray(meta?.canonical?.structuralOuterPieces)
                ? meta.canonical.structuralOuterPieces
                : null
        );
    const structuralCorePrefixParts = Array.isArray(meta?.coreStructuralPrefixParts)
        ? meta.coreStructuralPrefixParts
        : (
            Array.isArray(meta?.canonical?.coreStructuralPrefixParts)
                ? meta.canonical.coreStructuralPrefixParts
                : null
        );
    const boundPrefixes = Array.isArray(meta?.boundPrefixes) ? meta.boundPrefixes : [];
    const boundExplicitFlags = Array.isArray(meta?.boundExplicitFlags) ? meta.boundExplicitFlags : [];
    const outerPieces = parseLanguage === "current-regex" && Array.isArray(structuralOuterPieces)
        ? structuralOuterPieces
            .map((piece) => normalizeDerivationSourceOuterPiece(piece))
            .filter(Boolean)
        : (() => {
            const lexicalPieces = (
                Array.isArray(meta?.lexicalBoundPrefixes) && meta.lexicalBoundPrefixes.length
                    ? meta.lexicalBoundPrefixes
                    : getLexicalBoundPrefixes(boundPrefixes, boundExplicitFlags)
            )
                .map((value) => normalizeRuleBase(value))
                .filter(Boolean)
                .map((value) => ({ type: "lexical", value }));
            const valencePieces = getExplicitBoundNonspecificPrefixes(boundPrefixes, boundExplicitFlags)
                .map((value) => normalizeComposerSecondaryValenceSurfaceToken(value) || normalizeComposerValenceToken(value))
                .filter(Boolean)
                .map((value) => ({ type: "valence", value }));
            const directionalPrefix = normalizeComposerStem(
                meta?.directionalPrefix || splitSource?.directionalPrefix || ""
            );
            const directionalPieces = directionalPrefix
                ? [{ type: "directional", value: directionalPrefix }]
                : [];
            const impersonalPieces = meta?.hasImpersonalTaPrefix === true
                ? [{ type: "impersonal", value: "ta" }]
                : [];
            return [
                ...directionalPieces,
                ...lexicalPieces,
                ...valencePieces,
                ...impersonalPieces,
            ];
        })();
    const sourcePrefix = normalizeRuleBase(
        meta?.sourcePrefix
        || meta?.canonical?.sourcePrefix
        || splitSource?.sourcePrefix
        || ""
    );
    const supportiveMarker = parseLanguage === "current-regex" && Array.isArray(structuralCorePrefixParts)
        ? (
            structuralCorePrefixParts.find((piece) => piece?.type === "supportive" && piece?.value)?.value
            || ""
        )
        : (
            meta?.hasOptionalSupportiveI === true
                ? String(meta?.optionalSupportiveLetter || "").toLowerCase()
                : ""
        );
    const corePrefixParts = parseLanguage === "current-regex" && Array.isArray(structuralCorePrefixParts)
        ? structuralCorePrefixParts
            .map((piece) => {
                if (!piece || !piece.type || !piece.value) {
                    return null;
                }
                const normalizedType = String(piece.type || "").trim();
                const normalizedValue = normalizeRuleBase(piece.value);
                if (!normalizedType || !normalizedValue) {
                    return null;
                }
                return { type: normalizedType, value: normalizedValue };
            })
            .filter(Boolean)
        : (() => {
            const embeddedPrefix = normalizeRuleBase(getEmbeddedVerbPrefix(meta) || "");
            const nextCorePrefixParts = [];
            if (supportiveMarker) {
                nextCorePrefixParts.push({ type: "supportive", value: supportiveMarker });
            }
            if (embeddedPrefix && embeddedPrefix !== sourcePrefix) {
                nextCorePrefixParts.push({ type: "adjacent-embed", value: embeddedPrefix });
            }
            return nextCorePrefixParts;
        })();
    const adjacentCoreEmbed = Array.isArray(corePrefixParts)
        ? (
            corePrefixParts.find((piece) => piece?.type === "adjacent-embed" && piece?.value)?.value
            || ""
        )
        : "";
    return {
        sourceKind: "fallback",
        parseLanguage,
        rawRegex: "",
        transitivity: meta?.isMarkedTransitive
            ? (
                Number.isFinite(meta?.semanticObjectSlotCount) && Number(meta.semanticObjectSlotCount) >= 2
                    ? COMPOSER_TRANSITIVITY.bitransitive
                    : COMPOSER_TRANSITIVITY.transitive
            )
            : COMPOSER_TRANSITIVITY.intransitive,
        outerPieces,
        corePrefixParts,
        supportiveMarker,
        adjacentCoreEmbed,
        matrixBase: normalizeRuleBase(
            meta?.exactBaseVerb
            || meta?.sourceBase
            || meta?.canonical?.sourceBase
            || meta?.canonicalRuleBase
            || splitSource?.matrixBase
            || analysisVerb
            || verb
            || ""
        ),
    };
}

function buildDerivationSourceModel(verbMeta = {}, verb = "", analysisVerb = "") {
    const meta = verbMeta || {};
    const rawRegexCandidate = String(meta?.sourceRawVerb || verb || "").trim();
    const currentRegexModel = buildCurrentRegexDerivationSourceModel(rawRegexCandidate);
    if (currentRegexModel) {
        return currentRegexModel;
    }
    return buildFallbackDerivationSourceModel(meta, verb, analysisVerb);
}

function getDerivationSourceOuterSurface(sourceModel = null) {
    const outerPieces = Array.isArray(sourceModel?.outerPieces)
        ? sourceModel.outerPieces
        : [];
    return outerPieces
        .map((piece) => String(piece?.value || "").trim().toLowerCase())
        .filter(Boolean)
        .join("");
}

function buildSupportivePrecedingSurfaceFromVerbMeta(meta = null, verb = "", analysisVerb = "") {
    const normalizedMeta = meta && typeof meta === "object" ? meta : {};
    const sourceModel = buildDerivationSourceModel(
        normalizedMeta,
        normalizedMeta?.sourceRawVerb || verb || normalizedMeta?.verb || "",
        analysisVerb || normalizedMeta?.analysisVerb || verb || normalizedMeta?.verb || ""
    );
    return getDerivationSourceOuterSurface(sourceModel);
}

function buildSupportivePrecedingSurfaceFromMorphologyInput({
    sourceRawVerb = "",
    directionalPrefix = "",
    sourcePrefix = "",
    hasImpersonalTaPrefix = false,
    boundPrefixes = [],
    boundExplicitFlags = [],
} = {}) {
    const currentRegexModel = buildCurrentRegexDerivationSourceModel(sourceRawVerb || "");
    if (currentRegexModel) {
        return getDerivationSourceOuterSurface(currentRegexModel);
    }
    const lexicalPrefix = normalizeRuleBase(sourcePrefix || "");
    const explicitPrefixes = getExplicitBoundNonspecificPrefixes(boundPrefixes, boundExplicitFlags)
        .map((value) => normalizeComposerSecondaryValenceSurfaceToken(value) || normalizeComposerValenceToken(value))
        .filter(Boolean);
    return [
        normalizeComposerStem(directionalPrefix || ""),
        lexicalPrefix,
        ...explicitPrefixes,
        hasImpersonalTaPrefix ? "ta" : "",
    ].filter(Boolean).join("");
}

function getCurrentRegexStructuralOccupiedLexicalSourceSlots(verbMeta = null) {
    if (!verbMeta || typeof verbMeta !== "object") {
        return 0;
    }
    const sourceModel = buildDerivationSourceModel(
        verbMeta,
        verbMeta?.sourceRawVerb || verbMeta?.verb || "",
        verbMeta?.analysisVerb || verbMeta?.verb || ""
    );
    if (!sourceModel || sourceModel.sourceKind !== "current-regex") {
        return 0;
    }
    const transitivity = sourceModel.transitivity || COMPOSER_TRANSITIVITY.intransitive;
    if (transitivity === COMPOSER_TRANSITIVITY.intransitive) {
        return 0;
    }
    const outerPieces = Array.isArray(sourceModel.outerPieces) ? sourceModel.outerPieces : [];
    const lexicalPieceCount = outerPieces.filter((piece) => (
        piece?.type === "lexical" && piece?.value
    )).length;
    if (!lexicalPieceCount) {
        return 0;
    }
    const hasExplicitValenceOuterPiece = outerPieces.some((piece) => (
        piece?.type === "valence" && piece?.value
    ));
    if (hasExplicitValenceOuterPiece) {
        return 0;
    }
    const maxStructuralSlots = transitivity === COMPOSER_TRANSITIVITY.bitransitive ? 2 : 1;
    return Math.min(maxStructuralSlots, lexicalPieceCount);
}

function getDerivationSourceChainPrefixParts(chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
    if (!chain || typeof chain !== "object") {
        return [];
    }
    const resolvedPolicy = policy && typeof policy === "object"
        ? policy
        : FULL_SOURCE_CHAIN_REALIZATION_POLICY;
    const preserveDirectional = resolvedPolicy.preserveDirectional !== false;
    const preserveLexical = resolvedPolicy.preserveLexical !== false;
    const preserveValence = resolvedPolicy.preserveValence !== false;
    const preserveImpersonal = resolvedPolicy.preserveImpersonal !== false;
    const modelOuterPieces = Array.isArray(chain?.model?.outerPieces)
        ? chain.model.outerPieces
        : null;
    if (modelOuterPieces) {
        return modelOuterPieces
            .filter((piece) => {
                if (!piece || !piece.type || !piece.value) {
                    return false;
                }
                if (piece.type === "directional") {
                    return preserveDirectional;
                }
                if (piece.type === "lexical") {
                    return preserveLexical;
                }
                if (piece.type === "valence") {
                    return preserveValence;
                }
                if (piece.type === "impersonal") {
                    return preserveImpersonal;
                }
                return false;
            })
            .map((piece) => piece.value)
            .filter(Boolean);
    }
    const prefixParts = [];
    if (preserveDirectional && Array.isArray(chain.directionalPrefixes)) {
        prefixParts.push(...chain.directionalPrefixes.filter(Boolean));
    }
    if (preserveLexical && Array.isArray(chain.lexicalPrefixes)) {
        prefixParts.push(...chain.lexicalPrefixes.filter(Boolean));
    }
    if (preserveValence && Array.isArray(chain.valencePrefixes)) {
        prefixParts.push(...chain.valencePrefixes.filter(Boolean));
    }
    if (preserveImpersonal && Array.isArray(chain.impersonalPrefixes)) {
        prefixParts.push(...chain.impersonalPrefixes.filter(Boolean));
    }
    if (
        !prefixParts.length
        && preserveDirectional
        && preserveLexical
        && preserveValence
        && preserveImpersonal
        && Array.isArray(chain.prefixParts)
    ) {
        return chain.prefixParts.filter(Boolean);
    }
    return prefixParts;
}

function getDerivationSourceChainCorePrefixParts(chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
    if (!chain || typeof chain !== "object") {
        return [];
    }
    const resolvedPolicy = policy && typeof policy === "object"
        ? policy
        : FULL_SOURCE_CHAIN_REALIZATION_POLICY;
    const preserveSupportive = resolvedPolicy.preserveSupportive !== false;
    const preserveAdjacentEmbed = resolvedPolicy.preserveAdjacentEmbed !== false;
    const modelCorePrefixParts = Array.isArray(chain?.model?.corePrefixParts)
        ? chain.model.corePrefixParts
        : null;
    if (modelCorePrefixParts) {
        return modelCorePrefixParts
            .filter((piece) => {
                if (!piece || !piece.type || !piece.value) {
                    return false;
                }
                if (piece.type === "supportive") {
                    return preserveSupportive;
                }
                if (piece.type === "adjacent-embed") {
                    return preserveAdjacentEmbed;
                }
                return false;
            })
            .map((piece) => piece.value)
            .filter(Boolean);
    }
    const corePrefixParts = [];
    if (preserveSupportive && chain.supportiveMarker) {
        corePrefixParts.push(chain.supportiveMarker);
    }
    if (preserveAdjacentEmbed && Array.isArray(chain.corePrefixParts)) {
        corePrefixParts.push(...chain.corePrefixParts.filter(Boolean));
    }
    return corePrefixParts;
}

function applySourceChainStemSpecByPolicy(stemSpec = null, fallbackStem = "", chain = null, {
    sourceSuffix = "",
    policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY,
} = {}) {
    const resolvedSpec = (
        stemSpec
        && typeof stemSpec === "object"
        && stemSpec.kind
    ) ? stemSpec : (fallbackStem ? buildLiteralMorphStemSpec(fallbackStem) : null);
    if (!resolvedSpec) {
        return null;
    }
    const prefixParts = [
        ...getDerivationSourceChainPrefixParts(chain, policy),
        ...getDerivationSourceChainCorePrefixParts(chain, policy),
    ];
    if (!prefixParts.length) {
        return resolvedSpec;
    }
    return prefixParts.reduceRight((current, prefixPart) => (
        buildPrependMorphStemSpec(current, prefixPart, {
            sourceBase: prefixPart,
            sourceSuffix,
        })
    ), resolvedSpec);
}

function realizeSourceChainStemByPolicy(stem = "", chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
    const normalizedStem = String(stem || "");
    if (!normalizedStem) {
        return "";
    }
    const prefixParts = [
        ...getDerivationSourceChainPrefixParts(chain, policy),
        ...getDerivationSourceChainCorePrefixParts(chain, policy),
    ];
    return `${prefixParts.join("")}${normalizedStem}`;
}

function getNonactiveDerivationSource(verbMeta, verb, analysisVerb) {
    const chain = buildNonactiveSourceChain(verbMeta, verb, analysisVerb);
    return {
        baseVerb: chain.baseVerb,
        prefix: chain.prefix,
        chain,
    };
}

function getNonactiveSourceChainPrefixParts(chain = null) {
    return getDerivationSourceChainPrefixParts(chain, FULL_SOURCE_CHAIN_REALIZATION_POLICY);
}

function applyNonactiveSourceChainStemSpec(stemSpec = null, fallbackStem = "", chain = null, {
    sourceSuffix = "",
    policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY,
} = {}) {
    return applySourceChainStemSpecByPolicy(stemSpec, fallbackStem, chain, {
        sourceSuffix,
        policy,
    });
}

function realizeNonactiveSourceChainStem(stem = "", chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
    return realizeSourceChainStemByPolicy(stem, chain, policy);
}

function buildPatientivoImperfectiveSourceChain(verbMeta, verb, analysisVerb) {
    return buildFullDerivationSourceChain(verbMeta, verb, analysisVerb);
}

function resolvePatientivoImperfectiveBaseStemSpec(chain = null) {
    const baseVerb = normalizeDerivationStemValue(chain?.baseVerb || "");
    if (!baseVerb) {
        return null;
    }
    const normalizedSourceBase = normalizeRuleBase(chain?.sourceBase || baseVerb);
    let sourceStemSpec = null;
    if (endsWithAny(baseVerb, IA_UA_SUFFIXES)) {
        sourceStemSpec = buildReplaceSuffixMorphStemSpec(baseVerb, "a", "", {
            sourceBase: normalizedSourceBase,
            sourceSuffix: "a",
        });
    }
    const baseStemSpec = sourceStemSpec || buildLiteralMorphStemSpec(baseVerb, {
        sourceBase: normalizedSourceBase,
    });
    const baseStem = realizeMorphStemSpec(baseStemSpec, baseVerb);
    return buildAppendMorphStemSpec(baseStem, "ya", {
        sourceStemSpec: baseStemSpec,
        sourceBase: normalizedSourceBase,
        sourceSuffix: "ya",
    });
}

function applyPatientivoImperfectiveSourceChainStemSpec(stemSpec = null, fallbackStem = "", chain = null) {
    return applySourceChainStemSpecByPolicy(stemSpec, fallbackStem, chain, {
        policy: PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY,
    });
}

function realizePatientivoImperfectiveSourceChainStem(stem = "", chain = null) {
    return realizeSourceChainStemByPolicy(stem, chain, PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY);
}

const DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT = "tajtani";

const PATIENTIVO_PRELOCATIVE_MATRIX_SPECS = Object.freeze([
    Object.freeze({
        id: "tla-itta",
        classicalMatrix: "te- ~ tla-(itta)",
        nawatRoot: "ita",
        aliases: ["itta"],
        label: "perceive/see",
        status: "nawat-data-backed",
        sourceStates: ["absolutive"],
        evidence: ["data/data.csv: -ita", "data/basic-data.csv: -itta", "Andrews 39.7"],
    }),
    Object.freeze({
        id: "tla-mati",
        classicalMatrix: "te- ~ tla-(mati)",
        nawatRoot: "mati",
        label: "consider/know",
        status: "nawat-data-backed",
        sourceStates: ["absolutive"],
        evidence: ["data/data.csv: -mati", "Andrews 30.15.2", "Andrews 39.7"],
    }),
    Object.freeze({
        id: "tla-nequi",
        classicalMatrix: "te- ~ tla-(nequi)",
        nawatRoot: "neki",
        aliases: ["nejneki"],
        label: "want/pretend",
        status: "nawat-data-backed",
        sourceStates: ["absolutive"],
        evidence: ["data/data.csv: -neki", "data/basic-data.csv: -nejneki", "Andrews 30.15.2", "Andrews 39.7"],
    }),
    Object.freeze({
        id: "tla-toca",
        classicalMatrix: "te- ~ tla-(toca)",
        nawatRoot: "tuka",
        label: "consider without foundation",
        status: "nawat-data-backed",
        sourceStates: ["absolutive", "possessive"],
        evidence: ["data/data.csv: -tuka", "Andrews 30.15.2", "Andrews 39.7"],
    }),
    Object.freeze({
        id: "tla-tlani",
        classicalMatrix: "tla-(tlani)",
        nawatRoot: "tajtani",
        label: "want/request",
        status: "nawat-data-backed",
        sourceStates: ["absolutive", "possessive"],
        evidence: ["data/data.csv: -tajtani", "Andrews 39.7", "Andrews 39.8"],
    }),
    Object.freeze({
        id: "tla-ih-tlani",
        classicalMatrix: "tla-(ih-tlani)",
        nawatRoot: "tatajtania",
        label: "request",
        status: "nawat-data-backed",
        sourceStates: ["possessive"],
        evidence: ["data/basic-data.csv: -tatajtania", "Andrews 39.8"],
    }),
    Object.freeze({
        id: "tla-tem-o-a",
        classicalMatrix: "tla-(tem-o-a)",
        nawatRoot: "temua",
        label: "seek",
        status: "nawat-data-backed",
        sourceStates: ["possessive"],
        evidence: ["data/basic-data.csv: -ishtemua/-shuchitemua", "Andrews 39.8"],
    }),
]);

const DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT = "miki";

const PATIENTIVO_COMPOUND_EMBED_MATRIX_SPECS = Object.freeze([
    Object.freeze({
        id: "miqui",
        classicalMatrix: "(miqui)",
        nawatRoot: "miki",
        aliases: ["miqui"],
        label: "die/be affected as",
        status: "nawat-data-backed",
        matrixValency: "intransitive",
        evidence: ["data/data.csv: miki", "Andrews 39.6"],
    }),
]);

const DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT = "kal";

const PATIENTIVO_NOMINAL_COMPOUND_MATRIX_SPECS = Object.freeze([
    Object.freeze({
        id: "cal-li",
        classicalMatrix: "(cal)-li",
        nawatRoot: "kal",
        nounClass: "zero",
        animacy: "inanimate",
        label: "house/place noun matrix",
        status: "nawat-data-backed",
        evidence: ["data/static_nnc.json: kal", "data/basic-data.csv: kal", "Andrews 39.6"],
    }),
]);

const PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX = "yut";
const PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX = "yu";
const DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT = "chikawa";

const PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_SPECS = Object.freeze([
    Object.freeze({
        id: "chic-a-hu-a",
        classicalMatrix: "(chic-a-hu-a)",
        nawatRoot: "chikawa",
        label: "strengthen/intensify by the embedded property",
        status: "nawat-data-backed",
        matrixValency: "transitive",
        evidence: ["data/basic-data.csv: -yulchikawa", "data/exact_rules.json: kakchikawa/akchikawa", "Andrews 39.9"],
    }),
]);

const DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT = "tzajtzi";

const ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_SPECS = Object.freeze([
    Object.freeze({
        id: "tzahtzi",
        classicalMatrix: "(tzahtzi)",
        nawatRoot: "tzajtzi",
        aliases: ["tzahtzi"],
        label: "shout with the embedded action",
        status: "nawat-data-backed",
        matrixValency: "intransitive",
        evidence: ["data/data.csv: tzajtzi", "data/basic-data.csv: tzajtzi", "Andrews 37.5.4"],
    }),
]);

const DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT = "kal";

const ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_SPECS = Object.freeze([
    Object.freeze({
        id: "cal-li",
        classicalMatrix: "(cal)-li",
        nawatRoot: "kal",
        nounClass: "zero",
        animacy: "inanimate",
        label: "house/place noun matrix",
        status: "nawat-data-backed",
        evidence: ["data/static_nnc.json: kal", "data/basic-data.csv: kal", "Andrews 37.5.4"],
    }),
]);

const DEFAULT_PRETERIT_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT = DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT;
const DEFAULT_PRETERIT_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT = DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT;
const DEFAULT_CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT = "tuka";
const DEFAULT_CUSTOMARY_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT = DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT;
const DEFAULT_PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_ROOT = "wa";
const DEFAULT_PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_ROOT = "mati";
const DEFAULT_PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_ROOT = "nemi";

const CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_SPECS = Object.freeze([
    Object.freeze({
        id: "toca-incorporated-complement",
        classicalMatrix: "(toca)",
        nawatRoot: "tuka",
        grammarSource: "Andrews 36.3",
        status: "andrews-authoritative-nawat-data-backed",
        matrixValency: "transitive",
        objectPrefix: "ki",
        label: "consider as the embedded fully nominalized customary-agentive entity",
        evidence: [
            "Andrews 36.3: fully nominalized customary-present agentive stems can fill compound embed position",
            "data/basic-data.csv/data.csv: -tuka",
        ],
    }),
]);

const PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_SPECS = Object.freeze([
    Object.freeze({
        id: "tla-hua-ownerhood",
        classicalMatrix: "*tla-(-hua)",
        nawatRoot: "wa",
        surfaceMatrix: "waj",
        ownerhoodKind: "ownerhood",
        grammarSource: "Andrews 35.9",
        status: "andrews-authoritative-nawat-matrix-evidence",
        matrixValency: "transitive",
        label: "ownerhood matrix",
        evidence: [
            "Andrews 35.9: general-use preterit-agentive stems incorporate into *tla-(-hua)",
            "data/basic-data.csv: ashkawajkati",
        ],
    }),
    Object.freeze({
        id: "tla-yo-a-abundant-ownerhood",
        classicalMatrix: "*tla-(-yo-a)",
        nawatRoot: "yua",
        surfaceMatrix: "yuj",
        ownerhoodKind: "abundant-ownerhood",
        grammarSource: "Andrews 35.10",
        status: "andrews-authoritative-nawat-matrix-evidence",
        matrixValency: "transitive",
        label: "abundant ownerhood matrix",
        evidence: [
            "Andrews 35.10: abundant ownerhood uses *tla-(-yo-a)",
            "data/basic-data.csv: shuchiyua/shuchiyuj",
        ],
    }),
]);

const PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_SPECS = Object.freeze([
    Object.freeze({
        id: "te-tlalia",
        classicalMatrix: "te-(tlal-i-a)",
        nawatRoot: "talia",
        grammarSource: "Andrews 35.12",
        status: "andrews-authoritative-nawat-data-backed",
        matrixValency: "transitive",
        objectPrefix: "ki",
        label: "establish as the embedded preterit-agentive entity",
        evidence: ["Andrews 35.12: incorporated-complement VNC", "data/basic-data.csv: -talia"],
    }),
    Object.freeze({
        id: "te-cahua",
        classicalMatrix: "te-(cahua)",
        nawatRoot: "kawa",
        grammarSource: "Andrews 35.12",
        status: "andrews-authoritative-nawat-data-backed",
        matrixValency: "transitive",
        objectPrefix: "ki",
        label: "leave as the embedded preterit-agentive entity",
        evidence: ["Andrews 35.12: incorporated-complement VNC", "data/basic-data.csv/data.csv: -kawa"],
    }),
    Object.freeze({
        id: "te-pehpena",
        classicalMatrix: "te-(peh-pena)",
        nawatRoot: "pejpena",
        grammarSource: "Andrews 35.12",
        status: "andrews-authoritative-nawat-data-backed",
        matrixValency: "transitive",
        objectPrefix: "ki",
        label: "choose as the embedded preterit-agentive entity",
        evidence: ["Andrews 35.12: incorporated-complement VNC", "data/basic-data.csv/data.csv: -pejpena"],
    }),
    Object.freeze({
        id: "te-tla-mati",
        classicalMatrix: "te- ~ tla-(mati)",
        nawatRoot: "mati",
        grammarSource: "Andrews 35.12",
        status: "andrews-authoritative-nawat-data-backed",
        matrixValency: "transitive",
        objectPrefix: "ki",
        label: "consider as the embedded preterit-agentive entity",
        evidence: ["Andrews 35.12: incorporated-complement VNC", "data/basic-data.csv/data.csv: -mati"],
    }),
    Object.freeze({
        id: "te-toca",
        classicalMatrix: "te- ~ tla-(toca)",
        nawatRoot: "tuka",
        grammarSource: "Andrews 35.12",
        status: "andrews-authoritative-nawat-data-backed",
        matrixValency: "transitive",
        objectPrefix: "ki",
        label: "treat as the embedded preterit-agentive entity",
        evidence: ["Andrews 35.12: incorporated-complement VNC", "data/basic-data.csv/data.csv: -tuka"],
    }),
    Object.freeze({
        id: "te-nehnequi",
        classicalMatrix: "te- ~ tla-(neh-nequi)",
        nawatRoot: "nejneki",
        grammarSource: "Andrews 35.12",
        status: "andrews-authoritative-nawat-data-backed",
        matrixValency: "transitive",
        objectPrefix: "ki",
        label: "pretend as the embedded preterit-agentive entity",
        evidence: ["Andrews 35.12: incorporated-complement VNC", "data/basic-data.csv: -nejneki"],
    }),
]);

const PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_SPECS = Object.freeze([
    Object.freeze({
        id: "nemi-adverbial-manner",
        classicalMatrix: "(nemi)",
        nawatRoot: "nemi",
        grammarSource: "Andrews 35.12",
        status: "andrews-authoritative-nawat-data-backed",
        matrixValency: "intransitive",
        adverbialFocus: "subject",
        label: "live/go in the manner of the embedded preterit-agentive entity",
        evidence: ["Andrews 35.12: preterit-agentive nounstem as incorporated adverb of manner", "data/basic-data.csv: tamatkanemi"],
    }),
]);

const ORDINARY_NOUN_OWNERHOOD_MATRIX_SPECS = Object.freeze([
    Object.freeze({
        id: "tla-e-ownerhood",
        classicalMatrix: "*tla-(-e)",
        nawatRoot: "e",
        surfaceMatrix: "ej",
        ownerhoodKind: "ownerhood",
        grammarSource: "Andrews 35.9",
        status: "andrews-authoritative-nawat-orthography",
        matrixValency: "transitive",
        defaultForNounClasses: ["t"],
        label: "ownerhood matrix for compatible t-class nouns",
        evidence: [
            "Andrews 35.9: *tla-(-e) incorporates tli-class nounstems",
            "Nawat preterit engine: (tupil)-(e) -> tupilejka",
        ],
    }),
    Object.freeze({
        id: "tla-hua-ownerhood",
        classicalMatrix: "*tla-(-hua)",
        nawatRoot: "wa",
        surfaceMatrix: "waj",
        ownerhoodKind: "ownerhood",
        grammarSource: "Andrews 35.9",
        status: "andrews-authoritative-nawat-orthography",
        matrixValency: "transitive",
        defaultForNounClasses: ["in", "zero"],
        label: "ownerhood matrix for compatible in/zero-class nouns",
        evidence: [
            "Andrews 35.9: *tla-(-hua) incorporates in and zero nounstems",
            "data/basic-data.csv: ashkawajkati",
        ],
    }),
    Object.freeze({
        id: "tla-yo-a-abundant-ownerhood",
        classicalMatrix: "*tla-(-yo-a)",
        nawatRoot: "yua",
        surfaceMatrix: "yuj",
        ownerhoodKind: "abundant-ownerhood",
        grammarSource: "Andrews 35.10",
        status: "andrews-authoritative-nawat-orthography",
        matrixValency: "transitive",
        defaultForNounClasses: ["t", "ti", "in", "zero"],
        label: "abundant ownerhood matrix",
        evidence: [
            "Andrews 35.10: abundant ownerhood uses *tla-(-yo-a)",
            "data/basic-data.csv: shuchiyua/shuchiyuj",
        ],
    }),
]);

function getPatientivoPrelocativeMatrixInventory() {
    return PATIENTIVO_PRELOCATIVE_MATRIX_SPECS.map((entry) => ({ ...entry }));
}

function resolvePatientivoPrelocativeMatrixSpec(matrixRoot = DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT) {
    const normalizedRoot = String(matrixRoot || DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT).trim().toLowerCase()
        || DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT;
    const spec = PATIENTIVO_PRELOCATIVE_MATRIX_SPECS.find((entry) => (
        entry.nawatRoot === normalizedRoot
        || (Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot))
    ));
    return spec
        ? { ...spec, supported: true, diagnostics: [] }
        : {
            id: "",
            classicalMatrix: "",
            nawatRoot: normalizedRoot,
            label: "",
            status: "unsupported",
            supported: false,
            diagnostics: ["patientivo-prelocative-unsupported-matrix"],
        };
}

function resolvePatientivoPrelocativeConnectorSuffix(patientivoNominalSuffix = "") {
    const normalized = typeof normalizePatientivoNominalSuffixSelection === "function"
        ? normalizePatientivoNominalSuffixSelection(patientivoNominalSuffix)
        : String(patientivoNominalSuffix || "").trim();
    return normalized === null ? "t" : normalized;
}

function getPatientivoCompoundEmbedMatrixInventory() {
    return PATIENTIVO_COMPOUND_EMBED_MATRIX_SPECS.map((entry) => ({ ...entry }));
}

function getPatientivoNominalCompoundMatrixInventory() {
    return PATIENTIVO_NOMINAL_COMPOUND_MATRIX_SPECS.map((entry) => ({ ...entry }));
}

function getPatientivoCharacteristicPropertyMatrixInventory() {
    return PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_SPECS.map((entry) => ({ ...entry }));
}

function getActiveActionCompoundEmbedMatrixInventory() {
    return ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_SPECS.map((entry) => ({ ...entry }));
}

function getActiveActionNominalCompoundMatrixInventory() {
    return ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_SPECS.map((entry) => ({ ...entry }));
}

function getPreteritAgentiveCompoundEmbedMatrixInventory() {
    return ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_SPECS.map((entry) => ({
        ...entry,
        grammarSource: "Andrews 35.7",
    }));
}

function getPreteritAgentiveNominalCompoundMatrixInventory() {
    return ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_SPECS.map((entry) => ({
        ...entry,
        grammarSource: "Andrews 35.7",
    }));
}

function getCustomaryAgentiveCompoundEmbedMatrixInventory() {
    return CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_SPECS.map((entry) => ({ ...entry }));
}

function getCustomaryAgentiveNominalCompoundMatrixInventory() {
    return ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_SPECS.map((entry) => ({
        ...entry,
        grammarSource: "Andrews 36.3",
    }));
}

function getPreteritAgentiveOwnerhoodMatrixInventory() {
    return PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_SPECS.map((entry) => ({ ...entry }));
}

function getPreteritAgentiveComplementMatrixInventory() {
    return PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_SPECS.map((entry) => ({ ...entry }));
}

function getPreteritAgentiveAdverbialMatrixInventory() {
    return PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_SPECS.map((entry) => ({ ...entry }));
}

function getOrdinaryNounOwnerhoodMatrixInventory() {
    return ORDINARY_NOUN_OWNERHOOD_MATRIX_SPECS.map((entry) => ({ ...entry }));
}

function resolvePatientivoCompoundEmbedMatrixSpec(matrixRoot = DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT) {
    const normalizedRoot = String(matrixRoot || DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT).trim().toLowerCase()
        || DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT;
    const spec = PATIENTIVO_COMPOUND_EMBED_MATRIX_SPECS.find((entry) => (
        entry.nawatRoot === normalizedRoot
        || (Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot))
    ));
    return spec
        ? { ...spec, supported: true, diagnostics: [] }
        : {
            id: "",
            classicalMatrix: "",
            nawatRoot: normalizedRoot,
            label: "",
            status: "unsupported",
            matrixValency: "",
            supported: false,
            diagnostics: ["patientivo-compound-embed-unsupported-matrix"],
        };
}

function resolvePatientivoNominalCompoundMatrixSpec(matrixRoot = DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT) {
    const normalizedRoot = String(matrixRoot || DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT).trim().toLowerCase()
        || DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT;
    const spec = PATIENTIVO_NOMINAL_COMPOUND_MATRIX_SPECS.find((entry) => (
        entry.nawatRoot === normalizedRoot
        || (Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot))
    ));
    return spec
        ? { ...spec, supported: true, diagnostics: [] }
        : {
            id: "",
            classicalMatrix: "",
            nawatRoot: normalizedRoot,
            nounClass: "",
            animacy: "",
            label: "",
            status: "unsupported",
            supported: false,
            diagnostics: ["patientivo-nominal-compound-unsupported-matrix"],
        };
}

function resolvePatientivoCharacteristicPropertyMatrixSpec(matrixRoot = DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT) {
    const normalizedRoot = String(matrixRoot || DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT).trim().toLowerCase()
        || DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT;
    const spec = PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_SPECS.find((entry) => (
        entry.nawatRoot === normalizedRoot
        || (Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot))
    ));
    return spec
        ? { ...spec, supported: true, diagnostics: [] }
        : {
            id: "",
            classicalMatrix: "",
            nawatRoot: normalizedRoot,
            label: "",
            status: "unsupported",
            matrixValency: "",
            supported: false,
            diagnostics: ["patientivo-characteristic-property-unsupported-matrix"],
        };
}

function resolveActiveActionCompoundEmbedMatrixSpec(matrixRoot = DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT) {
    const normalizedRoot = String(matrixRoot || DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT).trim().toLowerCase()
        || DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT;
    const spec = ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_SPECS.find((entry) => (
        entry.nawatRoot === normalizedRoot
        || (Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot))
    ));
    return spec
        ? { ...spec, supported: true, diagnostics: [] }
        : {
            id: "",
            classicalMatrix: "",
            nawatRoot: normalizedRoot,
            label: "",
            status: "unsupported",
            matrixValency: "",
            supported: false,
            diagnostics: ["active-action-compound-embed-unsupported-matrix"],
        };
}

function resolveActiveActionNominalCompoundMatrixSpec(matrixRoot = DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT) {
    const normalizedRoot = String(matrixRoot || DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT).trim().toLowerCase()
        || DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT;
    const spec = ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_SPECS.find((entry) => (
        entry.nawatRoot === normalizedRoot
        || (Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot))
    ));
    return spec
        ? { ...spec, supported: true, diagnostics: [] }
        : {
            id: "",
            classicalMatrix: "",
            nawatRoot: normalizedRoot,
            nounClass: "",
            animacy: "",
            label: "",
            status: "unsupported",
            supported: false,
            diagnostics: ["active-action-nominal-compound-unsupported-matrix"],
        };
}

function resolvePreteritAgentiveCompoundEmbedMatrixSpec(matrixRoot = DEFAULT_PRETERIT_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT) {
    const resolved = resolveActiveActionCompoundEmbedMatrixSpec(matrixRoot);
    return resolved.supported
        ? {
            ...resolved,
            grammarSource: "Andrews 35.7",
        }
        : {
            ...resolved,
            diagnostics: (resolved.diagnostics || []).map((diagnostic) => (
                diagnostic === "active-action-compound-embed-unsupported-matrix"
                    ? "preterit-agentive-compound-embed-unsupported-matrix"
                    : diagnostic
            )),
        };
}

function resolvePreteritAgentiveNominalCompoundMatrixSpec(matrixRoot = DEFAULT_PRETERIT_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT) {
    const resolved = resolveActiveActionNominalCompoundMatrixSpec(matrixRoot);
    return resolved.supported
        ? {
            ...resolved,
            grammarSource: "Andrews 35.7",
        }
        : {
            ...resolved,
            diagnostics: (resolved.diagnostics || []).map((diagnostic) => (
                diagnostic === "active-action-nominal-compound-unsupported-matrix"
                    ? "preterit-agentive-nominal-compound-unsupported-matrix"
                    : diagnostic
            )),
        };
}

function resolveCustomaryAgentiveCompoundEmbedMatrixSpec(matrixRoot = DEFAULT_CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT) {
    const normalizedRoot = String(matrixRoot || DEFAULT_CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT).trim().toLowerCase()
        || DEFAULT_CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT;
    const spec = CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_SPECS.find((entry) => (
        entry.nawatRoot === normalizedRoot
        || entry.id === normalizedRoot
        || entry.classicalMatrix === normalizedRoot
    ));
    return spec
        ? { ...spec, supported: true, diagnostics: [] }
        : {
            id: "",
            classicalMatrix: "",
            nawatRoot: normalizedRoot,
            grammarSource: "",
            status: "unsupported",
            matrixValency: "",
            objectPrefix: "",
            label: "",
            supported: false,
            diagnostics: ["customary-agentive-compound-embed-unsupported-matrix"],
        };
}

function resolveCustomaryAgentiveNominalCompoundMatrixSpec(matrixRoot = DEFAULT_CUSTOMARY_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT) {
    const resolved = resolveActiveActionNominalCompoundMatrixSpec(matrixRoot);
    return resolved.supported
        ? {
            ...resolved,
            grammarSource: "Andrews 36.3",
        }
        : {
            ...resolved,
            diagnostics: (resolved.diagnostics || []).map((diagnostic) => (
                diagnostic === "active-action-nominal-compound-unsupported-matrix"
                    ? "customary-agentive-nominal-compound-unsupported-matrix"
                    : diagnostic
            )),
        };
}

function resolvePreteritAgentiveOwnerhoodMatrixSpec(matrixRoot = DEFAULT_PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_ROOT) {
    const normalizedRoot = String(matrixRoot || DEFAULT_PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_ROOT).trim().toLowerCase()
        || DEFAULT_PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_ROOT;
    const spec = PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_SPECS.find((entry) => (
        entry.nawatRoot === normalizedRoot
        || entry.surfaceMatrix === normalizedRoot
        || entry.id === normalizedRoot
    ));
    return spec
        ? { ...spec, supported: true, diagnostics: [] }
        : {
            id: "",
            classicalMatrix: "",
            nawatRoot: normalizedRoot,
            surfaceMatrix: "",
            ownerhoodKind: "",
            grammarSource: "",
            status: "unsupported",
            matrixValency: "",
            label: "",
            supported: false,
            diagnostics: ["preterit-agentive-ownerhood-unsupported-matrix"],
        };
}

function resolvePreteritAgentiveComplementMatrixSpec(matrixRoot = DEFAULT_PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_ROOT) {
    const normalizedRoot = String(matrixRoot || DEFAULT_PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_ROOT).trim().toLowerCase()
        || DEFAULT_PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_ROOT;
    const spec = PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_SPECS.find((entry) => (
        entry.nawatRoot === normalizedRoot
        || entry.id === normalizedRoot
        || entry.classicalMatrix === normalizedRoot
    ));
    return spec
        ? { ...spec, supported: true, diagnostics: [] }
        : {
            id: "",
            classicalMatrix: "",
            nawatRoot: normalizedRoot,
            grammarSource: "",
            status: "unsupported",
            matrixValency: "",
            objectPrefix: "",
            label: "",
            supported: false,
            diagnostics: ["preterit-agentive-complement-unsupported-matrix"],
        };
}

function resolvePreteritAgentiveAdverbialMatrixSpec(matrixRoot = DEFAULT_PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_ROOT) {
    const normalizedRoot = String(matrixRoot || DEFAULT_PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_ROOT).trim().toLowerCase()
        || DEFAULT_PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_ROOT;
    const spec = PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_SPECS.find((entry) => (
        entry.nawatRoot === normalizedRoot
        || entry.id === normalizedRoot
        || entry.classicalMatrix === normalizedRoot
    ));
    return spec
        ? { ...spec, supported: true, diagnostics: [] }
        : {
            id: "",
            classicalMatrix: "",
            nawatRoot: normalizedRoot,
            grammarSource: "",
            status: "unsupported",
            matrixValency: "",
            adverbialFocus: "",
            label: "",
            supported: false,
            diagnostics: ["preterit-agentive-adverbial-unsupported-matrix"],
        };
}

function normalizeOrdinaryNounOwnerhoodNounClass(nounClass = "") {
    const normalized = String(nounClass || "").trim().toLowerCase();
    if (normalized === "0" || normalized === "ø") {
        return "zero";
    }
    return ["t", "ti", "in", "zero"].includes(normalized) ? normalized : "";
}

function resolveOrdinaryNounOwnerhoodMatrixSpec(matrixRoot = "") {
    const normalizedRoot = String(matrixRoot || "").trim().toLowerCase();
    const spec = ORDINARY_NOUN_OWNERHOOD_MATRIX_SPECS.find((entry) => (
        entry.nawatRoot === normalizedRoot
        || entry.surfaceMatrix === normalizedRoot
        || entry.id === normalizedRoot
    ));
    return spec
        ? { ...spec, supported: true, diagnostics: [] }
        : {
            id: "",
            classicalMatrix: "",
            nawatRoot: normalizedRoot,
            surfaceMatrix: "",
            ownerhoodKind: "",
            grammarSource: "",
            status: "unsupported",
            matrixValency: "",
            defaultForNounClasses: [],
            label: "",
            supported: false,
            diagnostics: ["ordinary-noun-ownerhood-unsupported-matrix"],
        };
}

function resolveOrdinaryNounOwnerhoodDefaultMatrixRoot({
    nounClass = "",
    ownerhoodKind = "ownerhood",
} = {}) {
    const normalizedClass = normalizeOrdinaryNounOwnerhoodNounClass(nounClass);
    const normalizedKind = String(ownerhoodKind || "ownerhood").trim();
    if (normalizedKind === "abundant-ownerhood") {
        return "yua";
    }
    if (normalizedClass === "t") {
        return "e";
    }
    if (normalizedClass === "in" || normalizedClass === "zero") {
        return "wa";
    }
    return "";
}

function isOrdinaryNounOwnerhoodMatrixCompatibleWithNounClass(matrixSpec = null, nounClass = "") {
    if (!matrixSpec || matrixSpec.supported === false) {
        return false;
    }
    const normalizedClass = normalizeOrdinaryNounOwnerhoodNounClass(nounClass);
    if (!normalizedClass) {
        return false;
    }
    const defaultClasses = Array.isArray(matrixSpec.defaultForNounClasses)
        ? matrixSpec.defaultForNounClasses
        : [];
    return defaultClasses.includes(normalizedClass);
}

function buildPatientivoCompoundEmbedVerbInput({
    incorporatedRoot = "",
    matrixRoot = DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT,
} = {}) {
    const normalizedIncorporatedRoot = String(incorporatedRoot || "").trim();
    const matrixSpec = resolvePatientivoCompoundEmbedMatrixSpec(matrixRoot);
    const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
    if (!normalizedIncorporatedRoot || !normalizedMatrixRoot) {
        return "";
    }
    const transitiveMarker = matrixSpec.matrixValency === "transitive" ? "-" : "";
    return `${transitiveMarker}(${normalizedIncorporatedRoot}/${normalizedMatrixRoot})`;
}

function resolvePatientivoCompoundEmbedFormationFrame({
    matrixSpec = null,
    incorporatedRoot = "",
    patientivoSurface = "",
    sourceSurface = "",
    compoundVerbInput = "",
} = {}) {
    return {
        kind: "patientivo-compound-embed-formation-frame",
        version: 1,
        grammarSource: "Andrews 39.6",
        compoundStemType: "verbal",
        sourceSurface: String(sourceSurface || "").trim(),
        patientivoSurface: String(patientivoSurface || "").trim(),
        embed: {
            role: "compound-embed",
            root: String(incorporatedRoot || "").trim(),
            source: "generated-patientive-nounstem",
            insideStem: true,
        },
        matrix: {
            role: "compound-matrix",
            type: "verbal",
            id: String(matrixSpec?.id || "").trim(),
            root: matrixSpec?.supported ? matrixSpec.nawatRoot : "",
            classicalMatrix: String(matrixSpec?.classicalMatrix || ""),
            valency: String(matrixSpec?.matrixValency || ""),
        },
        output: {
            kind: "compound-vnc-input",
            verbInput: String(compoundVerbInput || "").trim(),
        },
        evidencePolicy: {
            matrixRequiresNawatData: true,
            matrixDataBacked: Boolean(matrixSpec?.supported),
            patientiveSurfaceComesFromSalida: true,
            createsOrdinaryNncFixture: false,
            copiesClassicalSurface: false,
        },
    };
}

function buildPatientivoNominalCompoundStem({
    incorporatedRoot = "",
    matrixRoot = DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT,
} = {}) {
    const normalizedIncorporatedRoot = String(incorporatedRoot || "").trim();
    const matrixSpec = resolvePatientivoNominalCompoundMatrixSpec(matrixRoot);
    const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
    if (!normalizedIncorporatedRoot || !normalizedMatrixRoot) {
        return "";
    }
    return `${normalizedIncorporatedRoot}${normalizedMatrixRoot}`;
}

function formatPatientivoNominalCompoundOrdinaryNncInput({
    compoundStem = "",
    nounClass = "",
} = {}) {
    const normalizedStem = String(compoundStem || "").trim();
    if (!normalizedStem) {
        return "";
    }
    const normalizedClass = String(nounClass || "").trim();
    const connector = ["t", "ti", "in"].includes(normalizedClass) ? normalizedClass : "";
    return `(${normalizedStem})${connector}`;
}

function stripPatientivoCharacteristicPropertySuffix(surface = "", {
    suffix = PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX,
    possessivePrefix = "",
} = {}) {
    const normalized = String(surface || "").trim();
    const normalizedSuffix = String(suffix || PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX).trim();
    if (!normalized) {
        return "";
    }
    if (normalizedSuffix && normalized.length > normalizedSuffix.length && normalized.endsWith(normalizedSuffix)) {
        return normalized.slice(0, -normalizedSuffix.length);
    }
    const normalizedPossessivePrefix = String(possessivePrefix || "").trim();
    const possessiveSuffix = PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX;
    if (
        normalizedPossessivePrefix
        && normalized.startsWith(normalizedPossessivePrefix)
        && normalized.length > normalizedPossessivePrefix.length + possessiveSuffix.length
        && normalized.endsWith(possessiveSuffix)
    ) {
        return normalized.slice(normalizedPossessivePrefix.length, -possessiveSuffix.length);
    }
    return "";
}

function resolvePatientivoCharacteristicPropertyEmbedSource({
    characteristicSurface = "",
    possessorPrefix = "",
} = {}) {
    const normalizedSurface = String(characteristicSurface || "").trim();
    const absolutiveRoot = stripPatientivoCharacteristicPropertySuffix(normalizedSurface);
    if (absolutiveRoot) {
        return {
            sourceState: "absolutive",
            sourceRole: "subject",
            incorporatedRoot: absolutiveRoot,
            omittedSuffix: PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX,
            possessorPrefix: "",
            objectPrefix: "ki",
            objectTransfer: {
                sourceState: "absolutive",
                sourceRole: "subject",
                objectPrefix: "ki",
                objectCase: "objective",
                objectLine: "mainline",
                diagnostics: [],
            },
            diagnostics: [],
        };
    }
    const normalizedPossessor = String(possessorPrefix || "").trim();
    if (!normalizedPossessor) {
        return {
            sourceState: "",
            sourceRole: "",
            incorporatedRoot: "",
            omittedSuffix: PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX,
            possessorPrefix: "",
            objectPrefix: "",
            objectTransfer: null,
            diagnostics: ["patientivo-characteristic-property-missing-yut-suffix"],
        };
    }
    const map = getPatientivoPrelocativePossessiveObjectMap();
    const objectPrefix = String(map[normalizedPossessor] || "").trim();
    if (!objectPrefix) {
        return {
            sourceState: "possessive",
            sourceRole: "possessor",
            incorporatedRoot: "",
            omittedSuffix: PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX,
            possessorPrefix: normalizedPossessor,
            objectPrefix: "",
            objectTransfer: null,
            diagnostics: ["patientivo-characteristic-property-unmapped-possessor"],
        };
    }
    const possessiveRoot = stripPatientivoCharacteristicPropertySuffix(normalizedSurface, {
        possessivePrefix: normalizedPossessor,
    });
    return {
        sourceState: "possessive",
        sourceRole: "possessor",
        incorporatedRoot: possessiveRoot,
        omittedSuffix: PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX,
        possessorPrefix: normalizedPossessor,
        objectPrefix,
        objectTransfer: {
            sourceState: "possessive",
            sourceRole: "possessor",
            sourcePrefix: normalizedPossessor,
            objectPrefix,
            objectCase: "objective",
            objectLine: "mainline",
            diagnostics: [],
        },
        diagnostics: possessiveRoot ? [] : ["patientivo-characteristic-property-missing-yu-suffix"],
    };
}

function buildPatientivoCharacteristicPropertyEmbedVerbInput({
    incorporatedRoot = "",
    matrixRoot = DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT,
} = {}) {
    const normalizedIncorporatedRoot = String(incorporatedRoot || "").trim();
    const matrixSpec = resolvePatientivoCharacteristicPropertyMatrixSpec(matrixRoot);
    const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
    if (!normalizedIncorporatedRoot || !normalizedMatrixRoot) {
        return "";
    }
    const transitiveMarker = matrixSpec.matrixValency === "transitive" ? "-" : "";
    return `${transitiveMarker}(${normalizedIncorporatedRoot}/${normalizedMatrixRoot})`;
}

function resolvePatientivoCharacteristicPropertyFormationFrame({
    embedSource = null,
    matrixSpec = null,
    characteristicSurface = "",
    sourceSurface = "",
    compoundVerbInput = "",
} = {}) {
    const sourceState = String(embedSource?.sourceState || "").trim();
    const omittedSuffix = String(embedSource?.omittedSuffix || "").trim();
    const objectPrefix = String(embedSource?.objectPrefix || "").trim();
    return {
        kind: "patientivo-characteristic-property-formation-frame",
        version: 1,
        grammarSource: "Andrews 39.9",
        sourceState,
        sourceSurface: String(sourceSurface || "").trim(),
        characteristicSurface: String(characteristicSurface || "").trim(),
        omittedMatrix: {
            classical: "(-yo)-tl",
            nawat: omittedSuffix,
            omissionScope: "matrix-only",
            leavesEmbedMeaning: true,
        },
        incorporated: {
            role: "incorporated-object",
            root: String(embedSource?.incorporatedRoot || "").trim(),
            source: "generated-characteristic-property-nounstem",
            insideVerbStem: true,
        },
        outsideObject: {
            role: objectPrefix ? "matrix-object" : "",
            originRole: sourceState === "possessive" ? "possessor" : "matrix-default-object",
            originPrefix: String(embedSource?.possessorPrefix || "").trim(),
            prefix: objectPrefix,
            line: String(embedSource?.objectTransfer?.objectLine || "mainline").trim(),
            case: String(embedSource?.objectTransfer?.objectCase || "objective").trim(),
        },
        matrix: {
            id: String(matrixSpec?.id || "").trim(),
            root: matrixSpec?.supported ? matrixSpec.nawatRoot : "",
            classicalMatrix: String(matrixSpec?.classicalMatrix || ""),
            valency: String(matrixSpec?.matrixValency || ""),
        },
        valencePolicy: {
            hasObjectInsideVerbStem: Boolean(embedSource?.incorporatedRoot),
            hasObjectOutsideVerbStem: Boolean(objectPrefix),
            possessorBecomesOutsideObject: sourceState === "possessive" && Boolean(objectPrefix),
            doesNotPreserveYoMatrix: true,
        },
        verbInput: String(compoundVerbInput || "").trim(),
    };
}

function buildActiveActionCompoundEmbedVerbInput({
    actionNominalSurface = "",
    matrixRoot = DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT,
} = {}) {
    const normalizedActionNominalSurface = String(actionNominalSurface || "").trim();
    const matrixSpec = resolveActiveActionCompoundEmbedMatrixSpec(matrixRoot);
    const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
    if (!normalizedActionNominalSurface || !normalizedMatrixRoot) {
        return "";
    }
    const transitiveMarker = matrixSpec.matrixValency === "transitive" ? "-" : "";
    return `${transitiveMarker}(${normalizedActionNominalSurface}/${normalizedMatrixRoot})`;
}

function buildActiveActionNominalCompoundStem({
    actionNominalSurface = "",
    matrixRoot = DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT,
} = {}) {
    const normalizedActionNominalSurface = String(actionNominalSurface || "").trim();
    const matrixSpec = resolveActiveActionNominalCompoundMatrixSpec(matrixRoot);
    const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
    if (!normalizedActionNominalSurface || !normalizedMatrixRoot) {
        return "";
    }
    return `${normalizedActionNominalSurface}${normalizedMatrixRoot}`;
}

function buildPreteritAgentiveCompoundEmbedVerbInput({
    preteritAgentiveStem = "",
    matrixRoot = DEFAULT_PRETERIT_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT,
} = {}) {
    const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
    const matrixSpec = resolvePreteritAgentiveCompoundEmbedMatrixSpec(matrixRoot);
    const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
    if (!normalizedPreteritAgentiveStem || !normalizedMatrixRoot) {
        return "";
    }
    const transitiveMarker = matrixSpec.matrixValency === "transitive" ? "-" : "";
    return `${transitiveMarker}(${normalizedPreteritAgentiveStem}/${normalizedMatrixRoot})`;
}

function buildPreteritAgentiveNominalCompoundStem({
    preteritAgentiveStem = "",
    matrixRoot = DEFAULT_PRETERIT_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT,
} = {}) {
    const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
    const matrixSpec = resolvePreteritAgentiveNominalCompoundMatrixSpec(matrixRoot);
    const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
    if (!normalizedPreteritAgentiveStem || !normalizedMatrixRoot) {
        return "";
    }
    return `${normalizedPreteritAgentiveStem}${normalizedMatrixRoot}`;
}

function buildCustomaryAgentiveNominalCompoundStem({
    customaryAgentiveStem = "",
    matrixRoot = DEFAULT_CUSTOMARY_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT,
} = {}) {
    const normalizedCustomaryAgentiveStem = String(customaryAgentiveStem || "").trim();
    const matrixSpec = resolveCustomaryAgentiveNominalCompoundMatrixSpec(matrixRoot);
    const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
    if (!normalizedCustomaryAgentiveStem || !normalizedMatrixRoot) {
        return "";
    }
    return `${normalizedCustomaryAgentiveStem}${normalizedMatrixRoot}`;
}

function buildCustomaryAgentiveCompoundEmbedVerbInput({
    customaryAgentiveStem = "",
    matrixRoot = DEFAULT_CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT,
} = {}) {
    const normalizedCustomaryAgentiveStem = String(customaryAgentiveStem || "").trim();
    const matrixSpec = resolveCustomaryAgentiveCompoundEmbedMatrixSpec(matrixRoot);
    const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
    if (!normalizedCustomaryAgentiveStem || !normalizedMatrixRoot) {
        return "";
    }
    const transitiveMarker = matrixSpec.matrixValency === "transitive" ? "-" : "";
    return `${transitiveMarker}(${normalizedCustomaryAgentiveStem}/${normalizedMatrixRoot})`;
}

function formatPreteritAgentiveNominalCompoundOrdinaryNncInput({
    compoundStem = "",
    nounClass = "",
} = {}) {
    return formatPatientivoNominalCompoundOrdinaryNncInput({
        compoundStem,
        nounClass,
    });
}

function formatCustomaryAgentiveNominalCompoundOrdinaryNncInput({
    compoundStem = "",
    nounClass = "",
} = {}) {
    return formatPatientivoNominalCompoundOrdinaryNncInput({
        compoundStem,
        nounClass,
    });
}

function buildPreteritAgentiveOwnerhoodVerbInput({
    preteritAgentiveStem = "",
    matrixRoot = DEFAULT_PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_ROOT,
} = {}) {
    const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
    const matrixSpec = resolvePreteritAgentiveOwnerhoodMatrixSpec(matrixRoot);
    const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
    if (!normalizedPreteritAgentiveStem || !normalizedMatrixRoot) {
        return "";
    }
    return `(${normalizedPreteritAgentiveStem})-(${normalizedMatrixRoot})`;
}

function buildPreteritAgentiveComplementVerbInput({
    preteritAgentiveStem = "",
    matrixRoot = DEFAULT_PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_ROOT,
} = {}) {
    const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
    const matrixSpec = resolvePreteritAgentiveComplementMatrixSpec(matrixRoot);
    const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
    if (!normalizedPreteritAgentiveStem || !normalizedMatrixRoot) {
        return "";
    }
    return `-(${normalizedPreteritAgentiveStem}/${normalizedMatrixRoot})`;
}

function buildPreteritAgentiveAdverbialVerbInput({
    preteritAgentiveStem = "",
    matrixRoot = DEFAULT_PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_ROOT,
} = {}) {
    const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
    const matrixSpec = resolvePreteritAgentiveAdverbialMatrixSpec(matrixRoot);
    const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
    if (!normalizedPreteritAgentiveStem || !normalizedMatrixRoot) {
        return "";
    }
    return matrixSpec.matrixValency === "transitive"
        ? `-(${normalizedPreteritAgentiveStem}/${normalizedMatrixRoot})`
        : `(${normalizedPreteritAgentiveStem}/${normalizedMatrixRoot})`;
}

function buildOrdinaryNounOwnerhoodVerbInput({
    nounStem = "",
    nounClass = "",
    matrixRoot = "",
    ownerhoodKind = "ownerhood",
} = {}) {
    const normalizedNounStem = String(nounStem || "").trim();
    const normalizedClass = normalizeOrdinaryNounOwnerhoodNounClass(nounClass);
    const resolvedMatrixRoot = String(matrixRoot || "").trim()
        || resolveOrdinaryNounOwnerhoodDefaultMatrixRoot({
            nounClass: normalizedClass,
            ownerhoodKind,
        });
    const matrixSpec = resolveOrdinaryNounOwnerhoodMatrixSpec(resolvedMatrixRoot);
    const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
    if (
        !normalizedNounStem
        || !normalizedMatrixRoot
        || !isOrdinaryNounOwnerhoodMatrixCompatibleWithNounClass(matrixSpec, normalizedClass)
    ) {
        return "";
    }
    return `(${normalizedNounStem})-(${normalizedMatrixRoot})`;
}

function formatActiveActionNominalCompoundOrdinaryNncInput({
    compoundStem = "",
    nounClass = "",
} = {}) {
    return formatPatientivoNominalCompoundOrdinaryNncInput({
        compoundStem,
        nounClass,
    });
}

function resolvePatientivoNominalCompoundFormationFrame({
    matrixSpec = null,
    incorporatedRoot = "",
    patientivoSurface = "",
    sourceSurface = "",
    compoundStem = "",
    ordinaryNncInput = "",
} = {}) {
    return {
        kind: "patientivo-nominal-compound-formation-frame",
        version: 1,
        grammarSource: "Andrews 39.6",
        compoundStemType: "nominal",
        sourceSurface: String(sourceSurface || "").trim(),
        patientivoSurface: String(patientivoSurface || "").trim(),
        embed: {
            role: "compound-embed",
            root: String(incorporatedRoot || "").trim(),
            source: "generated-patientive-nounstem",
            insideStem: true,
        },
        matrix: {
            role: "compound-matrix",
            type: "nominal",
            id: String(matrixSpec?.id || "").trim(),
            root: matrixSpec?.supported ? matrixSpec.nawatRoot : "",
            classicalMatrix: String(matrixSpec?.classicalMatrix || ""),
            nounClass: String(matrixSpec?.nounClass || ""),
            animacy: String(matrixSpec?.animacy || ""),
        },
        output: {
            kind: "ordinary-nnc-compound-input",
            compoundStem: String(compoundStem || "").trim(),
            ordinaryNncInput: String(ordinaryNncInput || "").trim(),
            sourceKind: "open-stem",
            fixtureBacked: false,
        },
        evidencePolicy: {
            matrixRequiresNawatData: true,
            matrixDataBacked: Boolean(matrixSpec?.supported),
            patientiveSurfaceComesFromSalida: true,
            createsOrdinaryNncFixture: false,
            copiesClassicalSurface: false,
        },
    };
}

function stripPatientivoPrelocativeConnector(surface = "", {
    patientivoNominalSuffix = "",
} = {}) {
    const normalized = String(surface || "").trim();
    if (!normalized) {
        return "";
    }
    const suffix = resolvePatientivoPrelocativeConnectorSuffix(patientivoNominalSuffix);
    if (suffix && normalized.endsWith(suffix)) {
        return normalized.slice(0, -suffix.length);
    }
    return normalized.endsWith("t") ? normalized.slice(0, -1) : normalized;
}

function buildPatientivoPrelocativeVerbInput({
    incorporatedRoot = "",
    matrixRoot = DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT,
} = {}) {
    const normalizedIncorporatedRoot = String(incorporatedRoot || "").trim();
    const matrixSpec = resolvePatientivoPrelocativeMatrixSpec(matrixRoot);
    const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
    if (!normalizedIncorporatedRoot || !normalizedMatrixRoot) {
        return "";
    }
    return `-(${normalizedIncorporatedRoot}/${normalizedMatrixRoot})`;
}

function isPatientivoPrelocativeMatrixCompatibleWithSourceState(matrixSpec = null, sourceState = "") {
    if (!matrixSpec || matrixSpec.supported === false) {
        return false;
    }
    const allowedStates = Array.isArray(matrixSpec.sourceStates)
        ? matrixSpec.sourceStates
        : [];
    return !allowedStates.length || allowedStates.includes(String(sourceState || "").trim());
}

function resolvePatientivoPrelocativeFormationFrame({
    matrixSpec = null,
    objectTransfer = null,
    incorporatedRoot = "",
    patientivoSurface = "",
    sourceSurface = "",
    prelocativeVerbInput = "",
} = {}) {
    const sourceState = String(objectTransfer?.sourceState || "").trim();
    const matrixId = String(matrixSpec?.id || "").trim();
    const isPossessive = sourceState === "possessive";
    const isStrictIncorporatedObjectMatrix = (
        matrixId === "tla-ih-tlani"
        || matrixId === "tla-tem-o-a"
    );
    const isRareTlaniIncorporatedObjectMatrix = matrixId === "tla-tlani" && isPossessive;
    const lessonRef = isPossessive && (isStrictIncorporatedObjectMatrix || isRareTlaniIncorporatedObjectMatrix)
        ? "Andrews 39.8"
        : "Andrews 39.7";
    const incorporatedRole = isPossessive && (isStrictIncorporatedObjectMatrix || isRareTlaniIncorporatedObjectMatrix)
        ? "incorporated-object"
        : "object-complement";
    const outsideObjectOriginRole = isPossessive ? "possessor" : "subject";
    return {
        kind: "patientivo-prelocative-formation-frame",
        version: 1,
        grammarSource: lessonRef,
        sourceState,
        sourceSurface: String(sourceSurface || "").trim(),
        patientivoSurface: String(patientivoSurface || "").trim(),
        incorporated: {
            role: incorporatedRole,
            root: String(incorporatedRoot || "").trim(),
            source: "generated-patientive-nounstem",
            insideVerbStem: true,
        },
        outsideObject: {
            role: "matrix-object",
            originRole: outsideObjectOriginRole,
            originPrefix: String(objectTransfer?.sourcePrefix || "").trim(),
            originSuffix: String(objectTransfer?.sourceSuffix || "").trim(),
            prefix: String(objectTransfer?.objectPrefix || "").trim(),
            line: String(objectTransfer?.objectLine || "mainline").trim(),
            case: String(objectTransfer?.objectCase || "objective").trim(),
        },
        valencePolicy: {
            preservesSourceValence: isPossessive,
            possessorBecomesObjectWithoutApplicativeSuffix: isPossessive,
            absolutiveSubjectBecomesObject: sourceState === "absolutive",
            hasObjectInsideVerbStem: Boolean(incorporatedRoot),
            hasObjectOutsideVerbStem: Boolean(objectTransfer?.objectPrefix),
        },
        matrix: {
            id: matrixId,
            root: matrixSpec?.supported ? matrixSpec.nawatRoot : "",
            classicalMatrix: String(matrixSpec?.classicalMatrix || ""),
            sourceCompatible: isPatientivoPrelocativeMatrixCompatibleWithSourceState(matrixSpec, sourceState),
        },
        verbInput: String(prelocativeVerbInput || "").trim(),
    };
}

function getPatientivoPrelocativePossessiveObjectMap(explicitMap = null) {
    if (explicitMap && typeof explicitMap === "object") {
        return explicitMap;
    }
    return typeof POSSESSIVE_TO_OBJECT_PREFIX !== "undefined"
        ? POSSESSIVE_TO_OBJECT_PREFIX
        : {};
}

function getPatientivoPrelocativeSubjectObjectMap(explicitMap = null) {
    if (explicitMap && typeof explicitMap === "object") {
        return explicitMap;
    }
    const subjectObjectMap = {};
    const objectSubjectMap = typeof PASSIVE_IMPERSONAL_SUBJECT_MAP !== "undefined"
        ? PASSIVE_IMPERSONAL_SUBJECT_MAP
        : {};
    Object.entries(objectSubjectMap || {}).forEach(([objectPrefix, subject]) => {
        const key = `${subject?.pers1 || ""}|${subject?.pers2 || ""}`;
        if (objectPrefix && key && !subjectObjectMap[key]) {
            subjectObjectMap[key] = objectPrefix;
        }
    });
    if (Object.keys(subjectObjectMap).length) {
        return subjectObjectMap;
    }
    const possessiveMap = getPatientivoPrelocativePossessiveObjectMap();
    if (typeof getPoseedorPrefixForPers1Pers2 !== "function") {
        return subjectObjectMap;
    }
    [
        { subjectPrefix: "ni", subjectSuffix: "" },
        { subjectPrefix: "ti", subjectSuffix: "" },
        { subjectPrefix: "", subjectSuffix: "" },
        { subjectPrefix: "ti", subjectSuffix: "t" },
        { subjectPrefix: "an", subjectSuffix: "t" },
        { subjectPrefix: "", subjectSuffix: "t" },
    ].forEach((subject) => {
        const possessivePrefix = getPoseedorPrefixForPers1Pers2(subject.subjectPrefix, subject.subjectSuffix);
        const objectPrefix = possessivePrefix ? String(possessiveMap[possessivePrefix] || "").trim() : "";
        const key = `${subject.subjectPrefix}|${subject.subjectSuffix}`;
        if (objectPrefix && !subjectObjectMap[key]) {
            subjectObjectMap[key] = objectPrefix;
        }
    });
    return subjectObjectMap;
}

function resolvePatientivoPrelocativeSubjectObjectTransfer({
    selection = {},
    subjectToObjectPrefix = null,
} = {}) {
    const subjectPrefix = String(selection?.subjectPrefix || "").trim();
    const subjectSuffix = String(selection?.subjectSuffix || "").trim();
    const key = `${subjectPrefix}|${subjectSuffix}`;
    const map = getPatientivoPrelocativeSubjectObjectMap(subjectToObjectPrefix);
    const objectPrefix = String(map[key] || "").trim();
    return {
        available: Boolean(objectPrefix),
        sourceState: "absolutive",
        sourceRole: "subject",
        sourcePrefix: subjectPrefix,
        sourceSuffix: subjectSuffix,
        sourceSubject: { subjectPrefix, subjectSuffix },
        objectPrefix,
        objectCase: "objective",
        objectLine: "mainline",
        label: objectPrefix
            ? `sujeto NNC > objeto ${objectPrefix}`
            : "sujeto NNC sin objeto configurado",
        diagnostics: objectPrefix ? [] : ["patientivo-prelocative-unmapped-subject"],
    };
}

function resolvePatientivoPrelocativeObjectTransfer({
    selection = {},
    possessorPrefix = "",
    possessiveToObjectPrefix = null,
    subjectToObjectPrefix = null,
} = {}) {
    const map = getPatientivoPrelocativePossessiveObjectMap(possessiveToObjectPrefix);
    const normalizedPossessor = String(possessorPrefix || "").trim();
    if (normalizedPossessor) {
        const objectPrefix = String(map[normalizedPossessor] || "").trim();
        return {
            available: Boolean(objectPrefix),
            sourceState: "possessive",
            sourceRole: "possessor",
            sourcePrefix: normalizedPossessor,
            objectPrefix,
            objectCase: "objective",
            objectLine: "mainline",
            label: objectPrefix
                ? `poseedor ${normalizedPossessor} > objeto ${objectPrefix}`
                : `poseedor ${normalizedPossessor} sin objeto configurado`,
            diagnostics: objectPrefix ? [] : ["patientivo-prelocative-unmapped-possessor"],
        };
    }
    return resolvePatientivoPrelocativeSubjectObjectTransfer({
        selection,
        subjectToObjectPrefix,
    });
}

function buildPatientivoCharacteristicPropertyEmbedContinuationContract({
    characteristicSurface = "",
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    possessorPrefix = "",
    matrixRoot = DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT,
} = {}) {
    const diagnostics = [];
    const normalizedCharacteristicSurface = String(characteristicSurface || "").trim();
    const embedSource = resolvePatientivoCharacteristicPropertyEmbedSource({
        characteristicSurface: normalizedCharacteristicSurface,
        possessorPrefix,
    });
    const incorporatedRoot = embedSource.incorporatedRoot;
    if (!normalizedCharacteristicSurface) {
        diagnostics.push("patientivo-characteristic-property-missing-surface");
    }
    if (normalizedCharacteristicSurface && !incorporatedRoot) {
        diagnostics.push(...embedSource.diagnostics);
    }
    const matrixSpec = resolvePatientivoCharacteristicPropertyMatrixSpec(matrixRoot);
    if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
    }
    const compoundVerbInput = matrixSpec.supported && incorporatedRoot
        ? buildPatientivoCharacteristicPropertyEmbedVerbInput({
            incorporatedRoot,
            matrixRoot: matrixSpec.nawatRoot,
        })
        : "";
    if (!compoundVerbInput && !matrixSpec.supported) {
        diagnostics.push("patientivo-characteristic-property-missing-verb-input");
    }
    const uniqueDiagnostics = diagnostics.filter((item, index, list) => (
        item && list.indexOf(item) === index
    ));
    const formationFrame = resolvePatientivoCharacteristicPropertyFormationFrame({
        embedSource,
        matrixSpec,
        characteristicSurface: normalizedCharacteristicSurface,
        sourceSurface,
        compoundVerbInput,
    });
    return attachDerivationContinuationGrammarContract({
        outputKind: "patientivo-characteristic-property-embed-continuation-contract",
        grammarSource: "Andrews 39.9",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object"
            ? sourceFormulaSlots
            : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        characteristicSurface: normalizedCharacteristicSurface,
        sourceState: embedSource.sourceState,
        sourceRole: embedSource.sourceRole,
        possessorPrefix: embedSource.possessorPrefix,
        omittedSuffix: embedSource.omittedSuffix || PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX,
        incorporatedRoot,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundVerbInput,
        objectPrefix: embedSource.objectPrefix || "ki",
        objectTransfer: embedSource.objectTransfer,
        formationFrame,
        diagnostics: uniqueDiagnostics,
    });
}

function buildPatientivoPrelocativeContinuationContract({
    patientivoSurface = "",
    sourceSurface = "",
    selection = {},
    possessorPrefix = "",
    patientivoSource = "",
    sourceTenseValue = "",
    sourceCombinedMode = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    patientivoNominalSuffix = "",
    matrixRoot = DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT,
    possessiveToObjectPrefix = null,
    subjectToObjectPrefix = null,
} = {}) {
    const diagnostics = [];
    const normalizedPatientivoSource = String(patientivoSource || "").trim();
    const normalizedSourceCombinedMode = String(sourceCombinedMode || "").trim();
    const normalizedSourceTenseValue = String(sourceTenseValue || "").trim();
    const incorporatedRoot = stripPatientivoPrelocativeConnector(patientivoSurface, {
        patientivoNominalSuffix,
    });
    if (!String(patientivoSurface || "").trim()) {
        diagnostics.push("patientivo-prelocative-missing-patientivo-surface");
    }
    if (!incorporatedRoot) {
        diagnostics.push("patientivo-prelocative-missing-incorporated-root");
    }
    const objectTransfer = resolvePatientivoPrelocativeObjectTransfer({
        selection,
        possessorPrefix,
        possessiveToObjectPrefix,
        subjectToObjectPrefix,
    });
    if (!objectTransfer.available) {
        diagnostics.push(...objectTransfer.diagnostics);
    }
    const matrixSpec = resolvePatientivoPrelocativeMatrixSpec(matrixRoot);
    if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
    }
    const matrixSourceCompatible = isPatientivoPrelocativeMatrixCompatibleWithSourceState(matrixSpec, objectTransfer.sourceState);
    if (matrixSpec.supported && !matrixSourceCompatible) {
        diagnostics.push("patientivo-prelocative-matrix-source-state-unsupported");
    }
    const prelocativeVerbInput = matrixSpec.supported && matrixSourceCompatible
        ? buildPatientivoPrelocativeVerbInput({
            incorporatedRoot,
            matrixRoot: matrixSpec.nawatRoot,
        })
        : "";
    if (!prelocativeVerbInput) {
        if (!matrixSpec.supported) {
            diagnostics.push("patientivo-prelocative-missing-verb-input");
        }
    }
    const uniqueDiagnostics = diagnostics.filter((item, index, list) => (
        item && list.indexOf(item) === index
    ));
    const formationFrame = resolvePatientivoPrelocativeFormationFrame({
        matrixSpec,
        objectTransfer,
        incorporatedRoot,
        patientivoSurface,
        sourceSurface,
        prelocativeVerbInput,
    });
    return attachDerivationContinuationGrammarContract({
        outputKind: "patientivo-prelocative-continuation-contract",
        grammarSource: "Andrews 39.7-39.8",
        supported: uniqueDiagnostics.length === 0,
        patientivoSource: normalizedPatientivoSource,
        sourceTenseValue: normalizedSourceTenseValue,
        sourceCombinedMode: normalizedSourceCombinedMode,
        sourceState: objectTransfer.sourceState,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object"
            ? sourceFormulaSlots
            : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        patientivoSurface: String(patientivoSurface || "").trim(),
        incorporatedRoot,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        matrixSourceCompatible,
        prelocativeVerbInput,
        objectTransfer,
        formationFrame,
        diagnostics: uniqueDiagnostics,
    });
}

function buildPatientivoCompoundEmbedContinuationContract({
    patientivoSurface = "",
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    patientivoNominalSuffix = "",
    matrixRoot = DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT,
} = {}) {
    const diagnostics = [];
    const incorporatedRoot = stripPatientivoPrelocativeConnector(patientivoSurface, {
        patientivoNominalSuffix,
    });
    if (!String(patientivoSurface || "").trim()) {
        diagnostics.push("patientivo-compound-embed-missing-patientivo-surface");
    }
    if (!incorporatedRoot) {
        diagnostics.push("patientivo-compound-embed-missing-incorporated-root");
    }
    const matrixSpec = resolvePatientivoCompoundEmbedMatrixSpec(matrixRoot);
    if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
    }
    const compoundVerbInput = matrixSpec.supported
        ? buildPatientivoCompoundEmbedVerbInput({
            incorporatedRoot,
            matrixRoot: matrixSpec.nawatRoot,
        })
        : "";
    if (!compoundVerbInput && !matrixSpec.supported) {
        diagnostics.push("patientivo-compound-embed-missing-verb-input");
    }
    const uniqueDiagnostics = diagnostics.filter((item, index, list) => (
        item && list.indexOf(item) === index
    ));
    const formationFrame = resolvePatientivoCompoundEmbedFormationFrame({
        matrixSpec,
        incorporatedRoot,
        patientivoSurface,
        sourceSurface,
        compoundVerbInput,
    });
    return attachDerivationContinuationGrammarContract({
        outputKind: "patientivo-compound-embed-continuation-contract",
        grammarSource: "Andrews 39.6",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object"
            ? sourceFormulaSlots
            : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        patientivoSurface: String(patientivoSurface || "").trim(),
        incorporatedRoot,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundVerbInput,
        formationFrame,
        diagnostics: uniqueDiagnostics,
    });
}

function buildPatientivoNominalCompoundContinuationContract({
    patientivoSurface = "",
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    patientivoNominalSuffix = "",
    matrixRoot = DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT,
} = {}) {
    const diagnostics = [];
    const incorporatedRoot = stripPatientivoPrelocativeConnector(patientivoSurface, {
        patientivoNominalSuffix,
    });
    if (!String(patientivoSurface || "").trim()) {
        diagnostics.push("patientivo-nominal-compound-missing-patientivo-surface");
    }
    if (!incorporatedRoot) {
        diagnostics.push("patientivo-nominal-compound-missing-incorporated-root");
    }
    const matrixSpec = resolvePatientivoNominalCompoundMatrixSpec(matrixRoot);
    if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
    }
    const compoundStem = matrixSpec.supported
        ? buildPatientivoNominalCompoundStem({
            incorporatedRoot,
            matrixRoot: matrixSpec.nawatRoot,
        })
        : "";
    if (!compoundStem && !matrixSpec.supported) {
        diagnostics.push("patientivo-nominal-compound-missing-nnc-input");
    }
    const ordinaryNncInput = compoundStem
        ? formatPatientivoNominalCompoundOrdinaryNncInput({
            compoundStem,
            nounClass: matrixSpec.nounClass || "zero",
        })
        : "";
    const uniqueDiagnostics = diagnostics.filter((item, index, list) => (
        item && list.indexOf(item) === index
    ));
    const formationFrame = resolvePatientivoNominalCompoundFormationFrame({
        matrixSpec,
        incorporatedRoot,
        patientivoSurface,
        sourceSurface,
        compoundStem,
        ordinaryNncInput,
    });
    return attachDerivationContinuationGrammarContract({
        outputKind: "patientivo-nominal-compound-continuation-contract",
        grammarSource: "Andrews 39.6",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object"
            ? sourceFormulaSlots
            : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        patientivoSurface: String(patientivoSurface || "").trim(),
        incorporatedRoot,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundStem,
        ordinaryNncInput,
        ordinaryNncRequest: compoundStem ? {
            stem: ordinaryNncInput || compoundStem,
            state: "absolutive",
            number: "singular",
            pluralType: "auto",
            nounClass: matrixSpec.nounClass || "zero",
            animacy: matrixSpec.animacy || "inanimate",
        } : null,
        formationFrame,
        diagnostics: uniqueDiagnostics,
    });
}

function buildActiveActionCompoundEmbedContinuationContract({
    actionNominalSurface = "",
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    matrixRoot = DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT,
} = {}) {
    const diagnostics = [];
    const normalizedActionNominalSurface = String(actionNominalSurface || "").trim();
    if (!normalizedActionNominalSurface) {
        diagnostics.push("active-action-compound-embed-missing-action-nominal-surface");
    }
    const matrixSpec = resolveActiveActionCompoundEmbedMatrixSpec(matrixRoot);
    if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
    }
    const compoundVerbInput = matrixSpec.supported && normalizedActionNominalSurface
        ? buildActiveActionCompoundEmbedVerbInput({
            actionNominalSurface: normalizedActionNominalSurface,
            matrixRoot: matrixSpec.nawatRoot,
        })
        : "";
    if (!compoundVerbInput && !matrixSpec.supported) {
        diagnostics.push("active-action-compound-embed-missing-verb-input");
    }
    const uniqueDiagnostics = diagnostics.filter((item, index, list) => (
        item && list.indexOf(item) === index
    ));
    return attachDerivationContinuationGrammarContract({
        outputKind: "active-action-compound-embed-continuation-contract",
        grammarSource: "Andrews 37.5.4",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object"
            ? sourceFormulaSlots
            : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        actionNominalSurface: normalizedActionNominalSurface,
        incorporatedRoot: normalizedActionNominalSurface,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundVerbInput,
        diagnostics: uniqueDiagnostics,
    });
}

function buildActiveActionNominalCompoundContinuationContract({
    actionNominalSurface = "",
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    matrixRoot = DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT,
} = {}) {
    const diagnostics = [];
    const normalizedActionNominalSurface = String(actionNominalSurface || "").trim();
    if (!normalizedActionNominalSurface) {
        diagnostics.push("active-action-nominal-compound-missing-action-nominal-surface");
    }
    const matrixSpec = resolveActiveActionNominalCompoundMatrixSpec(matrixRoot);
    if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
    }
    const compoundStem = matrixSpec.supported && normalizedActionNominalSurface
        ? buildActiveActionNominalCompoundStem({
            actionNominalSurface: normalizedActionNominalSurface,
            matrixRoot: matrixSpec.nawatRoot,
        })
        : "";
    if (!compoundStem && !matrixSpec.supported) {
        diagnostics.push("active-action-nominal-compound-missing-nnc-input");
    }
    const ordinaryNncInput = compoundStem
        ? formatActiveActionNominalCompoundOrdinaryNncInput({
            compoundStem,
            nounClass: matrixSpec.nounClass || "zero",
        })
        : "";
    const uniqueDiagnostics = diagnostics.filter((item, index, list) => (
        item && list.indexOf(item) === index
    ));
    return attachDerivationContinuationGrammarContract({
        outputKind: "active-action-nominal-compound-continuation-contract",
        grammarSource: "Andrews 37.5.4",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object"
            ? sourceFormulaSlots
            : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        actionNominalSurface: normalizedActionNominalSurface,
        incorporatedRoot: normalizedActionNominalSurface,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundStem,
        ordinaryNncInput,
        ordinaryNncRequest: compoundStem ? {
            stem: ordinaryNncInput || compoundStem,
            state: "absolutive",
            number: "singular",
            pluralType: "auto",
            nounClass: matrixSpec.nounClass || "zero",
            animacy: matrixSpec.animacy || "inanimate",
        } : null,
        diagnostics: uniqueDiagnostics,
    });
}

function buildPreteritAgentiveCompoundEmbedContinuationContract({
    preteritAgentiveStem = "",
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    matrixRoot = DEFAULT_PRETERIT_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT,
} = {}) {
    const diagnostics = [];
    const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
    if (!normalizedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-compound-embed-missing-general-use-stem");
    }
    const matrixSpec = resolvePreteritAgentiveCompoundEmbedMatrixSpec(matrixRoot);
    if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
    }
    const compoundVerbInput = matrixSpec.supported && normalizedPreteritAgentiveStem
        ? buildPreteritAgentiveCompoundEmbedVerbInput({
            preteritAgentiveStem: normalizedPreteritAgentiveStem,
            matrixRoot: matrixSpec.nawatRoot,
        })
        : "";
    if (!compoundVerbInput && !matrixSpec.supported) {
        diagnostics.push("preterit-agentive-compound-embed-missing-verb-input");
    }
    const uniqueDiagnostics = diagnostics.filter((item, index, list) => (
        item && list.indexOf(item) === index
    ));
    return attachDerivationContinuationGrammarContract({
        outputKind: "preterit-agentive-compound-embed-continuation-contract",
        grammarSource: "Andrews 35.7",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object"
            ? sourceFormulaSlots
            : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        incorporatedRoot: normalizedPreteritAgentiveStem,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundVerbInput,
        diagnostics: uniqueDiagnostics,
    });
}

function buildPreteritAgentiveNominalCompoundContinuationContract({
    preteritAgentiveStem = "",
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    matrixRoot = DEFAULT_PRETERIT_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT,
} = {}) {
    const diagnostics = [];
    const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
    if (!normalizedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-nominal-compound-missing-general-use-stem");
    }
    const matrixSpec = resolvePreteritAgentiveNominalCompoundMatrixSpec(matrixRoot);
    if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
    }
    const compoundStem = matrixSpec.supported && normalizedPreteritAgentiveStem
        ? buildPreteritAgentiveNominalCompoundStem({
            preteritAgentiveStem: normalizedPreteritAgentiveStem,
            matrixRoot: matrixSpec.nawatRoot,
        })
        : "";
    if (!compoundStem && !matrixSpec.supported) {
        diagnostics.push("preterit-agentive-nominal-compound-missing-nnc-input");
    }
    const ordinaryNncInput = compoundStem
        ? formatPreteritAgentiveNominalCompoundOrdinaryNncInput({
            compoundStem,
            nounClass: matrixSpec.nounClass || "zero",
        })
        : "";
    const uniqueDiagnostics = diagnostics.filter((item, index, list) => (
        item && list.indexOf(item) === index
    ));
    return attachDerivationContinuationGrammarContract({
        outputKind: "preterit-agentive-nominal-compound-continuation-contract",
        grammarSource: "Andrews 35.7",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object"
            ? sourceFormulaSlots
            : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        incorporatedRoot: normalizedPreteritAgentiveStem,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundStem,
        ordinaryNncInput,
        ordinaryNncRequest: compoundStem ? {
            stem: ordinaryNncInput || compoundStem,
            state: "absolutive",
            number: "singular",
            pluralType: "auto",
            nounClass: matrixSpec.nounClass || "zero",
            animacy: matrixSpec.animacy || "inanimate",
        } : null,
        diagnostics: uniqueDiagnostics,
    });
}

function buildCustomaryAgentiveNominalCompoundContinuationContract({
    customaryAgentiveStem = "",
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    matrixRoot = DEFAULT_CUSTOMARY_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT,
} = {}) {
    const diagnostics = [];
    const normalizedCustomaryAgentiveStem = String(customaryAgentiveStem || "").trim();
    if (!normalizedCustomaryAgentiveStem) {
        diagnostics.push("customary-agentive-nominal-compound-missing-fully-nominalized-stem");
    }
    const matrixSpec = resolveCustomaryAgentiveNominalCompoundMatrixSpec(matrixRoot);
    if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
    }
    const compoundStem = matrixSpec.supported && normalizedCustomaryAgentiveStem
        ? buildCustomaryAgentiveNominalCompoundStem({
            customaryAgentiveStem: normalizedCustomaryAgentiveStem,
            matrixRoot: matrixSpec.nawatRoot,
        })
        : "";
    if (!compoundStem && !matrixSpec.supported) {
        diagnostics.push("customary-agentive-nominal-compound-missing-nnc-input");
    }
    const ordinaryNncInput = compoundStem
        ? formatCustomaryAgentiveNominalCompoundOrdinaryNncInput({
            compoundStem,
            nounClass: matrixSpec.nounClass || "zero",
        })
        : "";
    const uniqueDiagnostics = diagnostics.filter((item, index, list) => (
        item && list.indexOf(item) === index
    ));
    return attachDerivationContinuationGrammarContract({
        outputKind: "customary-agentive-nominal-compound-continuation-contract",
        grammarSource: "Andrews 36.3",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object"
            ? sourceFormulaSlots
            : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        customaryAgentiveStem: normalizedCustomaryAgentiveStem,
        incorporatedRoot: normalizedCustomaryAgentiveStem,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundStem,
        ordinaryNncInput,
        ordinaryNncRequest: compoundStem ? {
            stem: ordinaryNncInput || compoundStem,
            state: "absolutive",
            number: "singular",
            pluralType: "auto",
            nounClass: matrixSpec.nounClass || "zero",
            animacy: matrixSpec.animacy || "inanimate",
        } : null,
        diagnostics: uniqueDiagnostics,
    });
}

function buildCustomaryAgentiveCompoundEmbedContinuationContract({
    customaryAgentiveStem = "",
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    matrixRoot = DEFAULT_CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT,
    objectPrefix = "",
} = {}) {
    const diagnostics = [];
    const normalizedCustomaryAgentiveStem = String(customaryAgentiveStem || "").trim();
    if (!normalizedCustomaryAgentiveStem) {
        diagnostics.push("customary-agentive-compound-embed-missing-fully-nominalized-stem");
    }
    const matrixSpec = resolveCustomaryAgentiveCompoundEmbedMatrixSpec(matrixRoot);
    if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
    }
    const compoundVerbInput = matrixSpec.supported && normalizedCustomaryAgentiveStem
        ? buildCustomaryAgentiveCompoundEmbedVerbInput({
            customaryAgentiveStem: normalizedCustomaryAgentiveStem,
            matrixRoot: matrixSpec.nawatRoot,
        })
        : "";
    if (!compoundVerbInput && !matrixSpec.supported) {
        diagnostics.push("customary-agentive-compound-embed-missing-verb-input");
    }
    const resolvedObjectPrefix = matrixSpec.matrixValency === "transitive"
        ? (String(objectPrefix || matrixSpec.objectPrefix || "ki").trim() || "ki")
        : "";
    const uniqueDiagnostics = diagnostics.filter((item, index, list) => (
        item && list.indexOf(item) === index
    ));
    return attachDerivationContinuationGrammarContract({
        outputKind: "customary-agentive-compound-embed-continuation-contract",
        grammarSource: matrixSpec.grammarSource || "Andrews 36.3",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object"
            ? sourceFormulaSlots
            : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        customaryAgentiveStem: normalizedCustomaryAgentiveStem,
        incorporatedRoot: normalizedCustomaryAgentiveStem,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        objectPrefix: resolvedObjectPrefix,
        compoundVerbInput,
        compoundRequest: compoundVerbInput ? {
            verb: compoundVerbInput,
            tense: "presente",
            tenseMode: "verbo",
            derivationMode: "active",
            voiceMode: "active",
            objectPrefix: resolvedObjectPrefix,
        } : null,
        diagnostics: uniqueDiagnostics,
    });
}

function buildPreteritAgentiveOwnerhoodContinuationContract({
    preteritAgentiveStem = "",
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    matrixRoot = DEFAULT_PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_ROOT,
} = {}) {
    const diagnostics = [];
    const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
    if (!normalizedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-ownerhood-missing-general-use-stem");
    }
    const matrixSpec = resolvePreteritAgentiveOwnerhoodMatrixSpec(matrixRoot);
    if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
    }
    const ownerhoodVerbInput = matrixSpec.supported && normalizedPreteritAgentiveStem
        ? buildPreteritAgentiveOwnerhoodVerbInput({
            preteritAgentiveStem: normalizedPreteritAgentiveStem,
            matrixRoot: matrixSpec.nawatRoot,
        })
        : "";
    if (!ownerhoodVerbInput && !matrixSpec.supported) {
        diagnostics.push("preterit-agentive-ownerhood-missing-verb-input");
    }
    const uniqueDiagnostics = diagnostics.filter((item, index, list) => (
        item && list.indexOf(item) === index
    ));
    return attachDerivationContinuationGrammarContract({
        outputKind: "preterit-agentive-ownerhood-continuation-contract",
        grammarSource: matrixSpec.grammarSource || "Andrews 35.9-35.10",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object"
            ? sourceFormulaSlots
            : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        incorporatedRoot: normalizedPreteritAgentiveStem,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        surfaceMatrix: matrixSpec.surfaceMatrix || "",
        ownerhoodKind: matrixSpec.ownerhoodKind || "",
        matrix: matrixSpec,
        ownerhoodVerbInput,
        ownerhoodRequest: ownerhoodVerbInput ? {
            verb: ownerhoodVerbInput,
            tense: "pasado-remoto",
            tenseMode: "verbo",
            derivationMode: "active",
            voiceMode: "active",
        } : null,
        diagnostics: uniqueDiagnostics,
    });
}

function buildPreteritAgentiveComplementContinuationContract({
    preteritAgentiveStem = "",
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    matrixRoot = DEFAULT_PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_ROOT,
    objectPrefix = "",
} = {}) {
    const diagnostics = [];
    const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
    if (!normalizedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-complement-missing-general-use-stem");
    }
    const matrixSpec = resolvePreteritAgentiveComplementMatrixSpec(matrixRoot);
    if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
    }
    const complementVerbInput = matrixSpec.supported && normalizedPreteritAgentiveStem
        ? buildPreteritAgentiveComplementVerbInput({
            preteritAgentiveStem: normalizedPreteritAgentiveStem,
            matrixRoot: matrixSpec.nawatRoot,
        })
        : "";
    if (!complementVerbInput && !matrixSpec.supported) {
        diagnostics.push("preterit-agentive-complement-missing-verb-input");
    }
    const resolvedObjectPrefix = String(objectPrefix || matrixSpec.objectPrefix || "ki").trim() || "ki";
    const uniqueDiagnostics = diagnostics.filter((item, index, list) => (
        item && list.indexOf(item) === index
    ));
    return attachDerivationContinuationGrammarContract({
        outputKind: "preterit-agentive-complement-continuation-contract",
        grammarSource: matrixSpec.grammarSource || "Andrews 35.12",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object"
            ? sourceFormulaSlots
            : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        incorporatedRoot: normalizedPreteritAgentiveStem,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        objectPrefix: resolvedObjectPrefix,
        complementVerbInput,
        complementRequest: complementVerbInput ? {
            verb: complementVerbInput,
            tense: "presente",
            tenseMode: "verbo",
            derivationMode: "active",
            voiceMode: "active",
            objectPrefix: resolvedObjectPrefix,
        } : null,
        diagnostics: uniqueDiagnostics,
    });
}

function buildPreteritAgentiveAdverbialContinuationContract({
    preteritAgentiveStem = "",
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    matrixRoot = DEFAULT_PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_ROOT,
    objectPrefix = "",
} = {}) {
    const diagnostics = [];
    const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
    if (!normalizedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-adverbial-missing-general-use-stem");
    }
    const matrixSpec = resolvePreteritAgentiveAdverbialMatrixSpec(matrixRoot);
    if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
    }
    const adverbialVerbInput = matrixSpec.supported && normalizedPreteritAgentiveStem
        ? buildPreteritAgentiveAdverbialVerbInput({
            preteritAgentiveStem: normalizedPreteritAgentiveStem,
            matrixRoot: matrixSpec.nawatRoot,
        })
        : "";
    if (!adverbialVerbInput && !matrixSpec.supported) {
        diagnostics.push("preterit-agentive-adverbial-missing-verb-input");
    }
    const resolvedObjectPrefix = matrixSpec.matrixValency === "transitive"
        ? (String(objectPrefix || "ki").trim() || "ki")
        : "";
    const uniqueDiagnostics = diagnostics.filter((item, index, list) => (
        item && list.indexOf(item) === index
    ));
    return attachDerivationContinuationGrammarContract({
        outputKind: "preterit-agentive-adverbial-continuation-contract",
        grammarSource: matrixSpec.grammarSource || "Andrews 35.12",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object"
            ? sourceFormulaSlots
            : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        incorporatedRoot: normalizedPreteritAgentiveStem,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        adverbialFocus: matrixSpec.adverbialFocus || "",
        objectPrefix: resolvedObjectPrefix,
        adverbialVerbInput,
        adverbialRequest: adverbialVerbInput ? {
            verb: adverbialVerbInput,
            tense: "presente",
            tenseMode: "verbo",
            derivationMode: "active",
            voiceMode: "active",
            objectPrefix: resolvedObjectPrefix,
        } : null,
        diagnostics: uniqueDiagnostics,
    });
}

function buildOrdinaryNounOwnerhoodContinuationContract({
    nounStem = "",
    nounClass = "",
    sourceSurface = "",
    sourceKind = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    matrixRoot = "",
    ownerhoodKind = "ownerhood",
} = {}) {
    const diagnostics = [];
    const normalizedNounStem = String(nounStem || "").trim();
    const normalizedClass = normalizeOrdinaryNounOwnerhoodNounClass(nounClass);
    const normalizedKind = String(ownerhoodKind || "ownerhood").trim();
    if (!normalizedNounStem) {
        diagnostics.push("ordinary-noun-ownerhood-missing-noun-stem");
    }
    if (!normalizedClass) {
        diagnostics.push("ordinary-noun-ownerhood-unsupported-noun-class");
    }
    const resolvedMatrixRoot = String(matrixRoot || "").trim()
        || resolveOrdinaryNounOwnerhoodDefaultMatrixRoot({
            nounClass: normalizedClass,
            ownerhoodKind: normalizedKind,
        });
    if (!resolvedMatrixRoot && normalizedClass === "ti" && normalizedKind !== "abundant-ownerhood") {
        diagnostics.push("ordinary-noun-ownerhood-ambiguous-ti-class");
    }
    const matrixSpec = resolveOrdinaryNounOwnerhoodMatrixSpec(resolvedMatrixRoot);
    if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
    }
    const classIsAllowed = isOrdinaryNounOwnerhoodMatrixCompatibleWithNounClass(matrixSpec, normalizedClass);
    if (matrixSpec.supported && !classIsAllowed) {
        diagnostics.push("ordinary-noun-ownerhood-class-matrix-mismatch");
    }
    const ownerhoodVerbInput = matrixSpec.supported && classIsAllowed && normalizedNounStem
        ? buildOrdinaryNounOwnerhoodVerbInput({
            nounStem: normalizedNounStem,
            nounClass: normalizedClass,
            matrixRoot: matrixSpec.nawatRoot,
            ownerhoodKind: normalizedKind,
        })
        : "";
    if (!ownerhoodVerbInput && (!matrixSpec.supported || !classIsAllowed)) {
        diagnostics.push("ordinary-noun-ownerhood-missing-verb-input");
    }
    const uniqueDiagnostics = diagnostics.filter((item, index, list) => (
        item && list.indexOf(item) === index
    ));
    return attachDerivationContinuationGrammarContract({
        outputKind: "ordinary-noun-ownerhood-continuation-contract",
        grammarSource: matrixSpec.grammarSource || "Andrews 35.9-35.10",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceKind: String(sourceKind || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object"
            ? sourceFormulaSlots
            : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        evidenceStatus: String(sourceKind || "").trim() === "fixture"
            ? "source-fixture-backed"
            : "structural-open-stem",
        nounStem: normalizedNounStem,
        incorporatedRoot: normalizedNounStem,
        nounClass: normalizedClass,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : resolvedMatrixRoot,
        surfaceMatrix: matrixSpec.surfaceMatrix || "",
        ownerhoodKind: matrixSpec.ownerhoodKind || normalizedKind,
        matrix: matrixSpec,
        ownerhoodVerbInput,
        ownerhoodRequest: ownerhoodVerbInput ? {
            verb: ownerhoodVerbInput,
            tense: "pasado-remoto",
            tenseMode: "verbo",
            derivationMode: "active",
            voiceMode: "active",
        } : null,
        diagnostics: uniqueDiagnostics,
    });
}
