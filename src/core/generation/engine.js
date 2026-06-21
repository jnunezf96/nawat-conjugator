// core/generation/engine.js
// Core execution path for nuclear-clause surface generation; generateWord() remains a compatibility alias.

"use strict";

const NUCLEAR_CLAUSE_SURFACE_NOOP = () => {};

const NUCLEAR_CLAUSE_SURFACE_ENGINE = Object.freeze({
    canonicalGenerateFunction: "generateNuclearClauseSurface",
    canonicalExecuteFunction: "executeNuclearClauseSurfaceRequest",
    compatibilityGenerateFunction: "generateWord",
    compatibilityExecuteFunction: "executeGenerateWordRequest",
    generatedUnit: "nuclear-clause-surface",
});

const FUNCTION_USE_VALENCE_OBJECT_GATE_DIAGNOSTIC_ID = "function-use-valence-object-frame-unfixed";
const FUNCTION_USE_VALENCE_OBJECT_GATE_ROUTE_STAGE = "function-use-valence-object-gate";
const FUNCTION_USE_VALENCE_OBJECT_SLOTS = Object.freeze(["obj1", "obj2", "obj3", "reflexivo"]);

function normalizeNuclearClauseSurfaceTenseValue(tenseValue = "") {
    return String(tenseValue || "").trim();
}

function resolveNuclearClauseSurfaceUiHook(uiHooks = null, key = "") {
    const hook = uiHooks && typeof uiHooks === "object"
        ? uiHooks[key]
        : null;
    return typeof hook === "function" ? hook : NUCLEAR_CLAUSE_SURFACE_NOOP;
}

function isOrdinaryNncGenerationOptIn(override = null) {
    const ordinaryNnc = override?.ordinaryNnc;
    return ordinaryNnc === true
        || (ordinaryNnc && typeof ordinaryNnc === "object" && ordinaryNnc.enabled === true);
}

function isAdjectivalNncGenerationOptIn(override = null) {
    const adjectivalNnc = override?.adjectivalNnc;
    return adjectivalNnc === true
        || (adjectivalNnc && typeof adjectivalNnc === "object" && adjectivalNnc.enabled === true);
}

function isRelationalNncGenerationOptIn(override = null) {
    const relationalNnc = override?.relationalNnc;
    return relationalNnc === true
        || (relationalNnc && typeof relationalNnc === "object" && relationalNnc.enabled === true);
}

function getOrdinaryNncGenerationOptions(override = null) {
    return override?.ordinaryNnc && typeof override.ordinaryNnc === "object"
        ? override.ordinaryNnc
        : {};
}

function getAdjectivalNncGenerationOptions(override = null) {
    return override?.adjectivalNnc && typeof override.adjectivalNnc === "object"
        ? override.adjectivalNnc
        : {};
}

function getRelationalNncGenerationOptions(override = null) {
    return override?.relationalNnc && typeof override.relationalNnc === "object"
        ? override.relationalNnc
        : {};
}

function normalizeFunctionUseValenceObjectSlot(value = "") {
    const normalized = normalizeNuclearClauseSurfaceContractSurface(value);
    return normalized === "Ø" ? "" : normalized;
}

function getFunctionUseValenceObjectSlotValue(slot = null) {
    if (!slot) {
        return "";
    }
    if (typeof slot !== "object") {
        return normalizeFunctionUseValenceObjectSlot(slot);
    }
    const fields = [
        "prefix",
        "basePrefix",
        "formulaPrefix",
        "displayPrefix",
        "surface",
        "displaySurface",
        "value",
        "token",
        "marker",
        "morpheme",
        "objectPrefix",
        "obj1",
    ];
    for (const field of fields) {
        const value = normalizeFunctionUseValenceObjectSlot(slot[field]);
        if (value) {
            return value;
        }
    }
    return "";
}

function normalizeFunctionUseValenceObjectVector(vector = null) {
    const source = vector && typeof vector === "object" ? vector : {};
    const normalized = {
        obj1: normalizeFunctionUseValenceObjectSlot(source.obj1),
        obj2: normalizeFunctionUseValenceObjectSlot(source.obj2),
        obj3: normalizeFunctionUseValenceObjectSlot(source.obj3),
        reflexivo: normalizeFunctionUseValenceObjectSlot(source.reflexivo),
    };
    if (normalized.obj1 === "mu" && !normalized.reflexivo) {
        normalized.reflexivo = "mu";
    }
    if (normalized.obj1 === "mu" && normalized.reflexivo === "mu") {
        normalized.obj1 = "";
    }
    return normalized;
}

function mergeFunctionUseValenceObjectVector(target = null, source = null) {
    const next = target && typeof target === "object"
        ? { ...target }
        : { obj1: "", obj2: "", obj3: "", reflexivo: "" };
    FUNCTION_USE_VALENCE_OBJECT_SLOTS.forEach((slot) => {
        const value = normalizeFunctionUseValenceObjectSlot(source?.[slot]);
        if (value && !next[slot]) {
            next[slot] = value;
        }
    });
    return normalizeFunctionUseValenceObjectVector(next);
}

function getFunctionUseValenceObjectFormulaSlotId(key = "", slot = null) {
    const label = [
        key,
        slot && typeof slot === "object" ? slot.slot : "",
        slot && typeof slot === "object" ? slot.slotId : "",
        slot && typeof slot === "object" ? slot.role : "",
    ].map((value) => String(value || "").trim().toLowerCase()).join(" ");
    const compactLabel = label.replace(/[^a-z0-9]/g, "");
    if (
        /(obj1|objectprefix|directobject)/.test(compactLabel)
        || /(^|\b)(obj|object)(\b|$)/.test(label)
    ) {
        return "obj1";
    }
    if (/(obj2|secondaryobject)/.test(compactLabel)) {
        return "obj2";
    }
    if (/(obj3|tertiaryobject)/.test(compactLabel)) {
        return "obj3";
    }
    if (/reflex|reflexivo/.test(compactLabel)) {
        return "reflexivo";
    }
    return "";
}

function collectFunctionUseValenceObjectVectorFromFormulaSlots(formulaSlots = null) {
    const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : null;
    if (!slots) {
        return null;
    }
    let vector = normalizeFunctionUseValenceObjectVector({
        obj1: getFunctionUseValenceObjectSlotValue(slots.obj1 || slots.objectPrefix),
        obj2: getFunctionUseValenceObjectSlotValue(slots.obj2),
        obj3: getFunctionUseValenceObjectSlotValue(slots.obj3),
        reflexivo: getFunctionUseValenceObjectSlotValue(slots.reflexivo || slots.reflexive),
    });
    Object.entries(slots).forEach(([key, slot]) => {
        const slotId = getFunctionUseValenceObjectFormulaSlotId(key, slot);
        const value = getFunctionUseValenceObjectSlotValue(slot);
        if (slotId && value) {
            vector = mergeFunctionUseValenceObjectVector(vector, { [slotId]: value });
        }
    });
    return vector;
}

function functionUseFormulaSlotsCoverValenceObjectFrame(formulaSlots = null) {
    const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : null;
    if (!slots) {
        return false;
    }
    return Object.entries(slots).some(([key, slot]) => (
        Boolean(getFunctionUseValenceObjectFormulaSlotId(key, slot))
    ));
}

function collectFunctionUseValenceObjectVectorFromEntradaGrammarObject(entradaGrammarObject = null) {
    if (
        !entradaGrammarObject
        || typeof entradaGrammarObject !== "object"
        || String(entradaGrammarObject.kind || "") !== "andrews-entrada-grammar-object"
    ) {
        return null;
    }
    const objectVector = entradaGrammarObject.objectFrame?.vector
        && typeof entradaGrammarObject.objectFrame.vector === "object"
        ? entradaGrammarObject.objectFrame.vector
        : null;
    const fromVector = normalizeFunctionUseValenceObjectVector(objectVector);
    const hasVectorValue = hasFunctionUseValenceObjectValues(fromVector);
    if (hasVectorValue) {
        return fromVector;
    }
    const slots = Array.isArray(entradaGrammarObject.objectFrame?.slots)
        ? entradaGrammarObject.objectFrame.slots
        : [];
    return normalizeFunctionUseValenceObjectVector({
        obj1: getFunctionUseValenceObjectSlotValue(slots.find((entry) => entry?.slotId === "obj1")),
        obj2: getFunctionUseValenceObjectSlotValue(slots.find((entry) => entry?.slotId === "obj2")),
        obj3: getFunctionUseValenceObjectSlotValue(slots.find((entry) => entry?.slotId === "obj3")),
        reflexivo: getFunctionUseValenceObjectSlotValue(slots.find((entry) => entry?.slotId === "reflexivo")),
    });
}

function entradaGrammarObjectHasFunctionUseFixedValenceEvidence(entradaGrammarObject = null) {
    return Boolean(
        entradaGrammarObject
        && typeof entradaGrammarObject === "object"
        && String(entradaGrammarObject.kind || "") === "andrews-entrada-grammar-object"
        && (
            entradaGrammarObject.valenceFrame?.frameFixed === true
            || entradaGrammarObject.objectFrame?.frameFixed === true
            || entradaGrammarObject.formulaBoundaryFrame?.valenceFrameFixed === true
            || (
                entradaGrammarObject.formulaBoundaryFrame?.frameFixed === true
                && entradaGrammarObject.formulaBoundaryFrame?.objectSlotsCovered === true
            )
        )
    );
}

function collectFunctionUseValenceObjectVectorFromFrame(frame = null) {
    const grammarFrame = frame && typeof frame === "object" ? frame : null;
    if (!grammarFrame) {
        return null;
    }
    let vector = null;
    [
        grammarFrame.formulaSlots,
        grammarFrame.slots,
        grammarFrame.morphBoundaryFrame?.formulaSlots,
        grammarFrame.nuclearClauseFrame?.formulaSlots,
        grammarFrame.participantFrame?.valenceFrame?.nuclearClauseFormulaSlots,
    ].forEach((formulaSlots) => {
        const next = collectFunctionUseValenceObjectVectorFromFormulaSlots(formulaSlots);
        if (next) {
            vector = mergeFunctionUseValenceObjectVector(vector, next);
        }
    });
    const participant = grammarFrame.participantFrame || null;
    if (participant) {
        vector = mergeFunctionUseValenceObjectVector(vector, {
            obj1: getFunctionUseValenceObjectSlotValue(participant.obj1),
            obj2: getFunctionUseValenceObjectSlotValue(participant.obj2),
            obj3: getFunctionUseValenceObjectSlotValue(participant.obj3),
            reflexivo: getFunctionUseValenceObjectSlotValue(participant.reflexivo),
        });
        const valenceFrame = participant.valenceFrame || null;
        if (valenceFrame) {
            vector = mergeFunctionUseValenceObjectVector(vector, {
                obj1: getFunctionUseValenceObjectSlotValue(valenceFrame.obj1),
                obj2: getFunctionUseValenceObjectSlotValue(valenceFrame.obj2),
                obj3: getFunctionUseValenceObjectSlotValue(valenceFrame.obj3),
                reflexivo: getFunctionUseValenceObjectSlotValue(valenceFrame.reflexivo),
            });
        }
    }
    [
        grammarFrame.remainingExternalObjectSlots,
        grammarFrame.sourceExternalObjectSlots,
        grammarFrame.objectSlotOwnership?.remainingExternalObjectSlots,
        grammarFrame.objectSlotOwnership?.sourceExternalObjectSlots,
        grammarFrame.incorporationRouteFrame?.remainingExternalObjectSlots,
        grammarFrame.routeFrame?.remainingExternalObjectSlots,
        grammarFrame.sourceRouteFrame?.remainingExternalObjectSlots,
        grammarFrame.participantFrame?.objectSlotOwnership?.remainingExternalObjectSlots,
        grammarFrame.participantFrame?.objectSlotOwnership?.sourceExternalObjectSlots,
        grammarFrame.participantFrame?.routeFrame?.remainingExternalObjectSlots,
        grammarFrame.participantFrame?.sourceRouteFrame?.remainingExternalObjectSlots,
        grammarFrame.routeContract?.sourceContract?.objectSlotOwnership?.remainingExternalObjectSlots,
        grammarFrame.routeContract?.sourceContract?.objectSlotOwnership?.sourceExternalObjectSlots,
        grammarFrame.routeContract?.targetContract?.objectSlotOwnership?.remainingExternalObjectSlots,
        grammarFrame.routeContract?.targetContract?.objectSlotOwnership?.sourceExternalObjectSlots,
        grammarFrame.routeContract?.sourceContract?.routeFrame?.remainingExternalObjectSlots,
        grammarFrame.routeContract?.targetContract?.routeFrame?.remainingExternalObjectSlots,
        grammarFrame.routeContract?.sourceContract?.sourceRouteFrame?.remainingExternalObjectSlots,
        grammarFrame.routeContract?.targetContract?.sourceRouteFrame?.remainingExternalObjectSlots,
        grammarFrame.sourceContract?.objectSlotOwnership?.remainingExternalObjectSlots,
        grammarFrame.sourceContract?.objectSlotOwnership?.sourceExternalObjectSlots,
        grammarFrame.targetContract?.objectSlotOwnership?.remainingExternalObjectSlots,
        grammarFrame.targetContract?.objectSlotOwnership?.sourceExternalObjectSlots,
        grammarFrame.sourceContract?.routeFrame?.remainingExternalObjectSlots,
        grammarFrame.targetContract?.routeFrame?.remainingExternalObjectSlots,
        grammarFrame.sourceContract?.sourceRouteFrame?.remainingExternalObjectSlots,
        grammarFrame.targetContract?.sourceRouteFrame?.remainingExternalObjectSlots,
    ].forEach((slots) => {
        (Array.isArray(slots) ? slots : []).forEach((slot) => {
            if (!slot || typeof slot !== "object") {
                return;
            }
            const slotId = getFunctionUseValenceObjectFormulaSlotId(slot.slotId || slot.slot || "", slot);
            const value = getFunctionUseValenceObjectSlotValue(slot);
            if (slotId && value) {
                vector = mergeFunctionUseValenceObjectVector(vector, { [slotId]: value });
            }
        });
    });
    return vector ? normalizeFunctionUseValenceObjectVector(vector) : null;
}

function frameHasFunctionUseFixedValenceEvidence(frame = null) {
    const source = frame && typeof frame === "object" ? frame : null;
    if (!source) {
        return false;
    }
    return Boolean(
        isFunctionUseFixedValenceFrame(source.participantFrame?.valenceFrame)
        || source.participantFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || source.objectSlotOwnership?.matrixValenceFrameFixed === true
        || source.incorporationRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || source.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || source.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || (
            String(source.kind || "") === "andrews-incorporation-route-frame"
            && Boolean(String(source.matrixValence || "").trim())
            && source.routeFrameLicensesObjectSlotOwnership === true
        )
        || isFunctionUseFixedValenceFrame(source.routeContract?.sourceContract?.valenceFrame)
        || isFunctionUseFixedValenceFrame(source.routeContract?.targetContract?.valenceFrame)
        || source.routeContract?.sourceContract?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || source.routeContract?.targetContract?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || source.routeContract?.sourceContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || source.routeContract?.targetContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || source.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || source.routeContract?.targetContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || isFunctionUseFixedValenceFrame(source.sourceContract?.valenceFrame)
        || isFunctionUseFixedValenceFrame(source.targetContract?.valenceFrame)
        || source.sourceContract?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || source.targetContract?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || source.sourceContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || source.targetContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || source.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true
        || source.targetContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true
    );
}

function hasFunctionUseValenceObjectValues(vector = null) {
    const normalized = normalizeFunctionUseValenceObjectVector(vector);
    return FUNCTION_USE_VALENCE_OBJECT_SLOTS.some((slot) => Boolean(normalized[slot]));
}

function getFunctionUseValenceObjectSignature(vector = null) {
    const normalized = normalizeFunctionUseValenceObjectVector(vector);
    return FUNCTION_USE_VALENCE_OBJECT_SLOTS
        .map((slot) => `${slot}:${normalized[slot] || "Ø"}`)
        .join("|");
}

function getFunctionUseValenceObjectDifferences(sourceVector = null, currentVector = null) {
    const source = normalizeFunctionUseValenceObjectVector(sourceVector);
    const current = normalizeFunctionUseValenceObjectVector(currentVector);
    return FUNCTION_USE_VALENCE_OBJECT_SLOTS
        .filter((slot) => source[slot] !== current[slot])
        .map((slot) => ({
            slot,
            source: source[slot] || "",
            current: current[slot] || "",
        }));
}

function functionUseValenceObjectVectorCovers(requiredVector = null, evidenceVector = null) {
    const required = normalizeFunctionUseValenceObjectVector(requiredVector);
    const evidence = normalizeFunctionUseValenceObjectVector(evidenceVector);
    return FUNCTION_USE_VALENCE_OBJECT_SLOTS.every((slot) => (
        !required[slot] || required[slot] === evidence[slot]
    ));
}

function isFunctionUseFixedValenceFrame(frame = null) {
    if (!frame || typeof frame !== "object") {
        return false;
    }
    if (
        frame.frameFixed === false
        || frame.valenceFrameFixed === false
        || frame.sourceValenceFrameFixed === false
    ) {
        return false;
    }
    return Boolean(
        frame.frameFixed === true
        || frame.valenceFrameFixed === true
        || frame.sourceValenceFrameFixed === true
        || frame.objectFrameFixed === true
        || frame.matrixValenceFrameFixed === true
        || frame.valencyFrameFixed === true
    );
}

function getFunctionUseValenceSourceKind({
    adjectivalNnc = null,
    entryRouteContract = null,
    grammarFrame = null,
} = {}) {
    return String(
        adjectivalNnc?.sourceClauseKind
        || adjectivalNnc?.sourceCategory
        || entryRouteContract?.sourceClauseKind
        || entryRouteContract?.sourceCategory
        || grammarFrame?.routeContract?.sourceContract?.sourceClauseKind
        || grammarFrame?.routeContract?.sourceContract?.sourceCategory
        || grammarFrame?.unitFrame?.unitKind
        || ""
    ).trim();
}

function isFunctionUseValenceSourceVerbal(sourceKind = "") {
    return /verbal|vnc|cnv|verb/i.test(String(sourceKind || ""));
}

function buildFunctionUseValenceObjectHardGate({
    override = null,
    posicionesFormula = null,
    sourceFrame = null,
    sourceFormulaSlots = null,
    entradaGrammarObject = null,
    sourceKind = "",
    currentVector = null,
    currentVectorOwnsValenceObjectSlots = true,
    forceBlockedReason = "",
    gateContext = "function-use",
    licensedCurrentValues = null,
} = {}) {
    const adjectivalNnc = getAdjectivalNncGenerationOptions(override);
    const entryRouteContract = adjectivalNnc.entryRouteContract && typeof adjectivalNnc.entryRouteContract === "object"
        ? adjectivalNnc.entryRouteContract
        : null;
    const explicitSourceFrame = sourceFrame && typeof sourceFrame === "object" ? sourceFrame : null;
    const explicitSourceFormulaSlots = sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null;
    const grammarFrame = (
        explicitSourceFrame
        || (adjectivalNnc.grammarFrame && typeof adjectivalNnc.grammarFrame === "object" ? adjectivalNnc.grammarFrame : null)
        || (adjectivalNnc.frames && typeof adjectivalNnc.frames === "object" ? adjectivalNnc.frames : null)
        || (entryRouteContract?.grammarFrame && typeof entryRouteContract.grammarFrame === "object" ? entryRouteContract.grammarFrame : null)
        || (entryRouteContract?.frames && typeof entryRouteContract.frames === "object" ? entryRouteContract.frames : null)
        || entryRouteContract
    );
    const entradaGrammarObjects = [
        entradaGrammarObject,
        adjectivalNnc.entradaGrammarObject,
        adjectivalNnc.sourceEntradaGrammarObject,
        entryRouteContract?.entradaGrammarObject,
        entryRouteContract?.sourceEntradaGrammarObject,
        grammarFrame?.routeContract?.sourceContract?.entradaGrammarObject,
    ].filter((candidate) => (
        candidate
        && typeof candidate === "object"
        && String(candidate.kind || "") === "andrews-entrada-grammar-object"
    ));
    let sourceVector = null;
    let formulaObjectVector = null;
    let hasFormulaEvidence = false;
    let hasFormulaObjectSlotCoverage = false;
    const registerFormulaEvidence = (formulaSlots = null) => {
        if (!formulaSlots || typeof formulaSlots !== "object") {
            return;
        }
        hasFormulaEvidence = true;
        if (functionUseFormulaSlotsCoverValenceObjectFrame(formulaSlots)) {
            hasFormulaObjectSlotCoverage = true;
        }
        const next = collectFunctionUseValenceObjectVectorFromFormulaSlots(formulaSlots);
        if (next && hasFunctionUseValenceObjectValues(next)) {
            formulaObjectVector = mergeFunctionUseValenceObjectVector(formulaObjectVector, next);
        }
        if (next) {
            sourceVector = mergeFunctionUseValenceObjectVector(sourceVector, next);
        }
    };
    [
        explicitSourceFormulaSlots,
        explicitSourceFrame?.formulaSlots,
        explicitSourceFrame?.slots,
        explicitSourceFrame?.nuclearClauseFrame?.formulaSlots,
        adjectivalNnc.sourceFormulaSlots,
        adjectivalNnc.formulaSlots,
        entryRouteContract?.sourceFormulaSlots,
        grammarFrame?.morphBoundaryFrame?.formulaSlots,
        grammarFrame?.nuclearClauseFrame?.formulaSlots,
    ].forEach(registerFormulaEvidence);
    entradaGrammarObjects.forEach((grammarObject) => {
        const next = collectFunctionUseValenceObjectVectorFromEntradaGrammarObject(grammarObject);
        if (next) {
            sourceVector = mergeFunctionUseValenceObjectVector(sourceVector, next);
        }
    });
    const frameVector = collectFunctionUseValenceObjectVectorFromFrame(grammarFrame);
    if (frameVector) {
        sourceVector = mergeFunctionUseValenceObjectVector(sourceVector, frameVector);
    }
    const resolvedSourceKind = String(sourceKind || getFunctionUseValenceSourceKind({
        adjectivalNnc,
        entryRouteContract,
        grammarFrame,
    }) || "").trim();
    const explicitCurrentVector = currentVector && typeof currentVector === "object" ? currentVector : null;
    const normalizedCurrentVector = normalizeFunctionUseValenceObjectVector(explicitCurrentVector || {
        obj1: posicionesFormula?.obj1
            || override?.posicionesFormula?.obj1
            || override?.obj1
            || override?.objectPrefix
            || adjectivalNnc.obj1
            || adjectivalNnc.objectPrefix
            || "",
        obj2: posicionesFormula?.obj2
            || override?.posicionesFormula?.obj2
            || override?.obj2
            || adjectivalNnc.obj2
            || "",
        obj3: posicionesFormula?.obj3
            || override?.posicionesFormula?.obj3
            || override?.obj3
            || adjectivalNnc.obj3
            || "",
        reflexivo: posicionesFormula?.reflexivo
            || override?.posicionesFormula?.reflexivo
            || override?.reflexivo
            || adjectivalNnc.reflexivo
            || "",
    });
    const normalizedSourceVector = normalizeFunctionUseValenceObjectVector(sourceVector);
    const hasSourceObjects = hasFunctionUseValenceObjectValues(normalizedSourceVector);
    const hasCurrentObjects = hasFunctionUseValenceObjectValues(normalizedCurrentVector);
    const currentOwnsValenceObjectSlots = currentVectorOwnsValenceObjectSlots === true;
    const hasFrameValence = frameHasFunctionUseFixedValenceEvidence(grammarFrame);
    const hasEntradaFixedValence = entradaGrammarObjects.some((grammarObject) => (
        entradaGrammarObjectHasFunctionUseFixedValenceEvidence(grammarObject)
    ));
    const formulaObjectCoverage = !hasSourceObjects
        || functionUseValenceObjectVectorCovers(normalizedSourceVector, formulaObjectVector);
    const formulaCoversValenceFrame = formulaObjectCoverage
        && (
            !isFunctionUseValenceSourceVerbal(resolvedSourceKind)
            || hasSourceObjects
            || hasFormulaObjectSlotCoverage
        );
    const hasFormulaValence = hasEntradaFixedValence || (hasFormulaEvidence && formulaCoversValenceFrame);
    const valenceFrameFixed = hasFrameValence || hasFormulaValence || !hasSourceObjects;
    const differences = getFunctionUseValenceObjectDifferences(normalizedSourceVector, normalizedCurrentVector);
    let status = "pass";
    let reason = "function-use-does-not-claim-object-valence";
    if (
        !hasSourceObjects
        && !hasCurrentObjects
        && isFunctionUseValenceSourceVerbal(resolvedSourceKind)
        && !hasFrameValence
        && !hasFormulaValence
    ) {
        status = "blocked";
        reason = "function-use-source-valence-frame-unfixed";
    } else if (hasSourceObjects && !hasFrameValence && !hasFormulaValence) {
        status = "blocked";
        reason = "function-use-source-valence-frame-unfixed";
    } else if (hasSourceObjects && hasCurrentObjects && differences.length) {
        status = "blocked";
        reason = "function-use-would-relocate-or-reclassify-valence-object";
    } else if (hasSourceObjects && !hasCurrentObjects && currentOwnsValenceObjectSlots) {
        status = "blocked";
        reason = "function-use-would-delete-valence-object";
    } else if (!hasSourceObjects && hasCurrentObjects) {
        status = "blocked";
        reason = isFunctionUseValenceSourceVerbal(resolvedSourceKind) || hasFrameValence || hasFormulaValence
            ? "function-use-would-invent-valence-object"
            : "function-use-has-current-object-without-source-valence-frame";
    } else if (hasSourceObjects && !valenceFrameFixed) {
        status = "blocked";
        reason = "function-use-source-valence-frame-unfixed";
    } else if (hasSourceObjects) {
        reason = "function-use-preserves-fixed-source-valence-object";
    }
    if (forceBlockedReason) {
        status = "blocked";
        reason = String(forceBlockedReason || "").trim();
    }
    return {
        kind: "function-use-valence-object-hard-gate",
        version: 1,
        gateContext: String(gateContext || "function-use"),
        status,
        generationAllowed: status !== "blocked",
        routeRankingAllowed: status !== "blocked",
        diagnosticId: FUNCTION_USE_VALENCE_OBJECT_GATE_DIAGNOSTIC_ID,
        routeStage: FUNCTION_USE_VALENCE_OBJECT_GATE_ROUTE_STAGE,
        reason,
        sourceKind: resolvedSourceKind,
        licensedCurrentValues: licensedCurrentValues && typeof licensedCurrentValues === "object"
            ? { ...licensedCurrentValues }
            : null,
        sourceVector: normalizedSourceVector,
        currentVector: normalizedCurrentVector,
        sourceSignature: getFunctionUseValenceObjectSignature(normalizedSourceVector),
        currentSignature: getFunctionUseValenceObjectSignature(normalizedCurrentVector),
        differences,
        hasSourceObjects,
        hasCurrentObjects,
        hasFrameValence,
        hasEntradaFixedValence,
        hasFormulaEvidence,
        formulaObjectCoverage,
        formulaObjectSlotCoverage: hasFormulaObjectSlotCoverage,
        formulaCoversValenceFrame,
        hasFormulaValence,
        valenceFrameFixed,
        currentVectorOwnsValenceObjectSlots: currentOwnsValenceObjectSlots,
        slotOwnership: currentOwnsValenceObjectSlots
            ? "current-vector-owns-valence-object-slots"
            : "function-use-target-does-not-own-valence-object-slots",
        sourceObjectPreservedAsMetadata: hasSourceObjects
            && !hasCurrentObjects
            && !currentOwnsValenceObjectSlots
            && status !== "blocked",
        boundaries: {
            functionUseCannotConsumeValenceObject: true,
            functionUseCannotDeleteValenceObject: true,
            functionUseCannotInventValenceObject: true,
            functionUseCannotRelocateValenceObject: true,
            functionUseCannotReclassifyValenceObject: true,
            functionUseMayAnnotateLicensedReadingsOnly: true,
            unresolvedValenceFrameIsHardGate: true,
        },
    };
}

function resolveAdjectivalNncGenerationSurface(adjectivalNnc = null, fields = [], fallback = "") {
    const source = adjectivalNnc && typeof adjectivalNnc === "object" ? adjectivalNnc : {};
    const framedSurface = resolveNuclearClauseSurfaceContractSurface(source);
    if (framedSurface) {
        return framedSurface;
    }
    if (getNuclearClauseSurfaceResultFramePayload(source)) {
        return "";
    }
    const fieldNames = Array.isArray(fields) ? fields : [fields];
    for (const fieldName of fieldNames) {
        const value = normalizeNuclearClauseSurfaceContractSurface(source[fieldName]);
        if (value) {
            return value;
        }
    }
    return normalizeNuclearClauseSurfaceContractSurface(fallback);
}

const NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE = "La generacion no produjo una forma.";
const GENERATE_WORD_NO_OUTPUT_MESSAGE = NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE;
const NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY = "nuclear-clause-surface";
const NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID = "nuclear-clause-surface-route-blocked";
const LESSON6_DIRECT_NAWAT_OBJECT_DYAD_BY_PREFIX = Object.freeze({
    nech: "n-ech",
    tech: "t-ech",
    metz: "m-etz",
    metzin: "m-etz-in",
    ki: "ki-0",
    k: "k-0",
    kin: "k-in",
    kinh: "k-inh",
});
const LESSON6_MONADIC_DIRECT_NAWAT_OBJECTS = Object.freeze({
    ne: Object.freeze({
        trajectory: "reflexive-reciprocative",
        specificity: "specific",
        prominence: "shuntline",
    }),
    te: Object.freeze({
        trajectory: "projective",
        specificity: "nonspecific",
        prominence: "mainline",
        humanness: "human",
    }),
    ta: Object.freeze({
        trajectory: "projective",
        specificity: "nonspecific",
        prominence: "mainline",
        humanness: "nonhuman",
    }),
});

const NUCLEAR_CLAUSE_SURFACE_ENGINE_INVARIANTS = Object.freeze([
    Object.freeze({
        id: "surface-output-not-grammar-source",
        lhs: "surface output",
        relation: "not-equal",
        rhs: "grammar source",
    }),
    Object.freeze({
        id: "formula-slot-not-literal-spelling",
        lhs: "formula slot",
        relation: "not-equal",
        rhs: "literal spelling",
    }),
    Object.freeze({
        id: "stem-not-whole-output",
        lhs: "stem",
        relation: "not-equal",
        rhs: "whole output",
    }),
    Object.freeze({
        id: "affix-not-stem",
        lhs: "affix",
        relation: "not-equal",
        rhs: "stem",
    }),
    Object.freeze({
        id: "derivation-inside-stem",
        lhs: "derivation",
        relation: "inside",
        rhs: "stem",
    }),
    Object.freeze({
        id: "inflection-outside-stem",
        lhs: "inflection",
        relation: "outside",
        rhs: "stem",
    }),
    Object.freeze({
        id: "vnc-nnc-not-word",
        lhs: "VNC/NNC",
        relation: "not-equal",
        rhs: "word",
    }),
]);

function getLesson6DirectNawatReflexiveDyadForStem(stem = "") {
    const normalizedStem = String(stem || "")
        .trim()
        .replace(/^[^a-zA-Z]+/, "")
        .replace(/[^a-zA-Z]+$/, "");
    if (!normalizedStem) {
        return "m-u";
    }
    if (typeof applyObj1Allomorphy === "function") {
        const allomorphy = applyObj1Allomorphy({
            verb: normalizedStem,
            analysisVerb: normalizedStem,
            obj1: "mu",
        });
        return allomorphy?.morphologyObj1 === "m" ? "m-0" : "m-u";
    }
    const shouldReduceMu = (
        (typeof startsWithICVCVPattern === "function" && startsWithICVCVPattern(normalizedStem))
        || (typeof startsWithAlPrefix === "function" && startsWithAlPrefix(normalizedStem))
        || (typeof startsWithACVlPattern === "function" && startsWithACVlPattern(normalizedStem))
    ) && !(
        typeof startsWithAny === "function"
        && typeof NONSPECIFIC_I_DROP_VERBS !== "undefined"
        && startsWithAny(normalizedStem, NONSPECIFIC_I_DROP_VERBS)
    );
    return shouldReduceMu ? "m-0" : "m-u";
}

function splitLesson6DirectNawatDyad(value = "") {
    const directValue = String(value || "").trim();
    if (!directValue || !directValue.includes("-")) {
        return {
            va: directValue,
            va1: "",
            va2: "",
            functionalVa1: "",
            functionalVa2: "",
        };
    }
    if (directValue === "n-ech" || directValue === "t-ech" || directValue === "m-etz") {
        const [person, objective] = directValue.split("-");
        return {
            va: "",
            va1: person || "",
            va2: objective || "",
            functionalVa1: `${person || ""}-0`,
            functionalVa2: objective || "",
            val1Features: {
                person: person || "",
                number: "0",
            },
            val2Features: {
                objective: objective || "",
            },
            linearPieces: [person || "", objective || ""],
        };
    }
    if (directValue === "m-etz-in") {
        return {
            va: "",
            va1: "m",
            va2: "etz-in",
            functionalVa1: "m-in",
            functionalVa2: "etz",
            val1Features: {
                person: "m",
                number: "in",
            },
            val2Features: {
                objective: "etz",
            },
            linearPieces: ["m", "etz", "in"],
        };
    }
    if (directValue === "k-0" || directValue === "ki-0") {
        const [personCase, number] = directValue.split("-");
        return {
            va: "",
            va1: personCase || "",
            va2: number || "",
            functionalVa1: `${personCase || ""}-0`,
            functionalVa2: number || "0",
            val1Features: {
                person: personCase || "",
                objective: "0",
            },
            val2Features: {
                number: number || "0",
            },
            linearPieces: [personCase || "", number || "0"],
        };
    }
    if (directValue === "k-in" || directValue === "k-inh") {
        const surfaceVa2 = directValue === "k-inh" ? "inh" : "";
        return {
            va: "",
            va1: "k",
            va2: "in",
            functionalVa1: "k-0",
            functionalVa2: "in",
            surfaceVa2,
            surfaceLinearMorph: surfaceVa2 ? "k-inh" : "",
            val1Features: {
                person: "k",
                objective: "0",
            },
            val2Features: {
                number: "in",
            },
            linearPieces: ["k", surfaceVa2 || "in"],
        };
    }
    if (directValue === "m-u" || directValue === "m-0") {
        const va2 = directValue === "m-0" ? "0" : "u";
        return {
            va: "",
            va1: "m",
            va2,
            functionalVa1: "m",
            functionalVa2: va2,
        };
    }
    const parts = directValue.split("-");
    const va1 = parts[0] || "";
    const va2 = parts.slice(1).join("-") || "";
    return {
        va: "",
        va1,
        va2,
        functionalVa1: va1,
        functionalVa2: va2,
    };
}

function getLesson6DirectNawatObjectDyadFrame(obj1 = "", {
    stem = "",
    pers1 = "",
    subjectPrefix = "",
} = {}) {
    const normalized = String(obj1 || "").trim();
    if (!normalized) {
        return null;
    }
    const normalizedSubjectPrefix = String(subjectPrefix || pers1 || "").trim();
    const surfaceScopedPrefix = (
        normalized === "ki"
        && (
            normalizedSubjectPrefix === "ni"
            || normalizedSubjectPrefix === "ti"
            || String(stem || "").startsWith("i")
        )
    )
        ? "k"
        : normalized;
    const directDyad = surfaceScopedPrefix === "mu"
        ? getLesson6DirectNawatReflexiveDyadForStem(stem)
        : (
            surfaceScopedPrefix.includes("-")
                ? surfaceScopedPrefix
                : LESSON6_DIRECT_NAWAT_OBJECT_DYAD_BY_PREFIX[surfaceScopedPrefix]
        );
    if (directDyad) {
        const subslots = splitLesson6DirectNawatDyad(directDyad);
        const governingFrame = typeof buildLesson6NawatValenceGoverningFrame === "function"
            ? buildLesson6NawatValenceGoverningFrame(surfaceScopedPrefix, {
                stem,
                visibleFormulaPrefix: directDyad,
            })
            : null;
        return {
            sourcePrefix: normalized,
            surfaceScopedPrefix,
            visibleFormulaPrefix: directDyad,
            formulaPosition: "va1-va2",
            governingFrame,
            governingPath: governingFrame?.governingPath || "",
            governingSlotId: governingFrame?.valencePosition || "va1-va2",
            sourceSections: governingFrame?.sourceSections || [],
            predicatePositionStatus: "dyadic",
            trajectory: surfaceScopedPrefix === "mu" || directDyad === "m-u" || directDyad === "m-0"
                ? "reflexive-reciprocative"
                : "projective",
            specificity: "specific",
            prominence: "mainline",
            va1: subslots.va1,
            va2: subslots.va2,
            functionalVa1: subslots.functionalVa1 || subslots.va1,
            functionalVa2: subslots.functionalVa2 || subslots.va2,
            surfaceVa1: subslots.surfaceVa1 || "",
            surfaceVa2: subslots.surfaceVa2 || "",
            surfaceLinearMorph: subslots.surfaceLinearMorph || "",
            val1Features: subslots.val1Features || null,
            val2Features: subslots.val2Features || null,
            linearPieces: subslots.linearPieces || null,
            directNawatGeneration: true,
        };
    }
    const monadicFrame = LESSON6_MONADIC_DIRECT_NAWAT_OBJECTS[normalized];
    if (monadicFrame) {
        const governingFrame = typeof buildLesson6NawatValenceGoverningFrame === "function"
            ? buildLesson6NawatValenceGoverningFrame(normalized, {
                stem,
                visibleFormulaPrefix: normalized,
            })
            : null;
        return {
            sourcePrefix: normalized,
            visibleFormulaPrefix: normalized,
            formulaPosition: "va",
            governingFrame,
            governingPath: governingFrame?.governingPath || "",
            governingSlotId: governingFrame?.valencePosition || "va",
            sourceSections: governingFrame?.sourceSections || [],
            predicatePositionStatus: "monadic",
            va: normalized,
            ...monadicFrame,
            directNawatGeneration: true,
        };
    }
    return null;
}

function getLesson6DirectNawatFormulaObjectPrefix(obj1 = "", options = {}) {
    return getLesson6DirectNawatObjectDyadFrame(obj1, options)?.visibleFormulaPrefix || String(obj1 || "");
}

function getGeneratedWalDirectionalFormulaObjectPrefix(formulaObject = "", baseObjectPrefix = "", {
    subjectPrefix = "",
    shouldUseAl = false,
} = {}) {
    const object = String(formulaObject || "");
    const baseObject = String(baseObjectPrefix || "");
    if (!shouldUseAl) {
        return object;
    }
    const subject = String(subjectPrefix || "");
    const dropsKBeforeAl = subject === "ni" || subject === "n" || subject === "ti" || subject === "t";
    if (!dropsKBeforeAl) {
        if (object === "ki-0" && (baseObject === "ki" || baseObject === "k")) {
            return "k-0";
        }
        return object;
    }
    if (object === "k-in" || object === "k-inh" || baseObject === "kin") {
        return "0-inh";
    }
    if (object === "ki-0" || object === "k-0" || baseObject === "ki" || baseObject === "k") {
        return "0-0";
    }
    return object;
}

function buildGeneratedWalDirectionalFormulaFrame({
    directionalChainMeta = null,
    subjectPrefix = "",
    baseObjectPrefix = "",
    formulaObjectPrefix = "",
    formulaReflexivePrefix = "",
} = {}) {
    const meta = directionalChainMeta && typeof directionalChainMeta === "object"
        ? directionalChainMeta
        : null;
    if (!meta || meta.directionalInputPrefix !== "wal") {
        return null;
    }
    const plan = meta.directionalPlan && typeof meta.directionalPlan === "object"
        ? meta.directionalPlan
        : buildWalDirectionalPlan({
            directionalOutputPrefix: meta.directionalOutputPrefix || "wal",
            pers1Base: meta.baseSubjectPrefix || subjectPrefix,
            obj1Base: meta.baseObjectPrefix || baseObjectPrefix,
            obj2: meta.indirectObjectMarker || "",
            obj3: meta.thirdObjectMarker || "",
            directionalRuleMode: meta.directionalRuleMode || "",
            hasSubjectValent: meta.hasSubjectValent !== false,
            isTaFusion: meta.isTaFusion === true,
            isIntransitiveVerb: meta.isIntransitiveVerb === true,
        });
    const prefix = plan.shouldUseAl === true ? "al" : "wal";
    const effectiveBaseObject = String(meta.baseObjectPrefix || baseObjectPrefix || "");
    const effectiveFormulaObject = getGeneratedWalDirectionalFormulaObjectPrefix(
        formulaObjectPrefix,
        effectiveBaseObject,
        {
            subjectPrefix: meta.baseSubjectPrefix || subjectPrefix,
            shouldUseAl: plan.shouldUseAl === true,
        }
    );
    const hasObject = Boolean(effectiveFormulaObject || formulaReflexivePrefix);
    const position = plan.shouldUseAl === true
        && (effectiveBaseObject === "ki" || effectiveBaseObject === "k" || effectiveBaseObject === "kin")
        && !(String(meta.baseSubjectPrefix || subjectPrefix || ""))
        ? "after-object"
        : "before-object";
    return {
        prefix,
        position,
        formulaObj1: effectiveFormulaObject,
        formulaReflexive: formulaReflexivePrefix,
        formulaPers1: plan.shouldUseAl === true && subjectPrefix === "ni"
            ? "n"
            : (plan.shouldUseAl === true && subjectPrefix === "ti" ? "t" : subjectPrefix),
        shouldUseAl: plan.shouldUseAl === true,
        hasObject,
        plan,
    };
}

function buildGeneratedDirectionalFormulaFrame({
    directionalChainMeta = null,
    subjectPrefix = "",
    baseObjectPrefix = "",
    formulaObjectPrefix = "",
    formulaReflexivePrefix = "",
} = {}) {
    const walFrame = buildGeneratedWalDirectionalFormulaFrame({
        directionalChainMeta,
        subjectPrefix,
        baseObjectPrefix,
        formulaObjectPrefix,
        formulaReflexivePrefix,
    });
    if (walFrame) {
        return walFrame;
    }
    const meta = directionalChainMeta && typeof directionalChainMeta === "object"
        ? directionalChainMeta
        : null;
    const prefix = String(meta?.directionalInputPrefix || meta?.directionalOutputPrefix || "");
    if (!prefix) {
        return null;
    }
    const hasObject = Boolean(formulaObjectPrefix || formulaReflexivePrefix);
    const formulaPers1 = /^[aeiu]/.test(prefix) && subjectPrefix === "ni"
        ? "n"
        : (/^[aeiu]/.test(prefix) && subjectPrefix === "ti" ? "t" : subjectPrefix);
    return {
        prefix,
        position: "before-object",
        formulaObj1: formulaObjectPrefix,
        formulaReflexive: formulaReflexivePrefix,
        formulaPers1,
        shouldUseAl: false,
        hasObject,
        plan: meta.directionalPlan || null,
    };
}

function stripGeneratedDirectionalPrefixFromFormulaStem(stem = "", directionalChainMeta = null) {
    const value = String(stem || "");
    const meta = directionalChainMeta && typeof directionalChainMeta === "object"
        ? directionalChainMeta
        : null;
    const prefix = String(meta?.directionalInputPrefix || "");
    if (!value || !prefix || !value.startsWith(prefix)) {
        return value;
    }
    return value.slice(prefix.length);
}

function getNuclearClauseSurfaceEngineInvariants() {
    return NUCLEAR_CLAUSE_SURFACE_ENGINE_INVARIANTS.map((entry) => ({ ...entry }));
}

function buildNuclearClauseSurfaceEngineContract({
    routeFamily = "",
    routeStage = "",
    compatibilityFunction = NUCLEAR_CLAUSE_SURFACE_ENGINE.compatibilityExecuteFunction,
} = {}) {
    return {
        ...NUCLEAR_CLAUSE_SURFACE_ENGINE,
        routeFamily: String(routeFamily || ""),
        routeStage: String(routeStage || ""),
        compatibilityFunction: String(compatibilityFunction || ""),
        invariants: getNuclearClauseSurfaceEngineInvariants(),
        surfaceOutputIsGrammarSource: false,
        formulaSlotIsLiteralSpelling: false,
        stemIsWholeOutput: false,
        affixIsStem: false,
        derivationScope: "inside-stem",
        inflectionScope: "outside-stem",
        nuclearClauseIsWord: false,
    };
}

function normalizeNuclearClauseSurfaceContractSurface(value = "") {
    if (typeof normalizeGrammarSurfaceValue === "function") {
        return normalizeGrammarSurfaceValue(value);
    }
    const surface = String(value || "").trim();
    return surface === "—" ? "" : surface;
}

function splitNuclearClauseSurfaceContractText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeNuclearClauseSurfaceContractSurface(entry))
        .filter(Boolean);
}

function getNuclearClauseSurfaceResultFrame(result = null) {
    return (
        (result?.grammarFrame && typeof result.grammarFrame === "object" ? result.grammarFrame : null)
        || (result?.frames && typeof result.frames === "object" ? result.frames : null)
    );
}

function getNuclearClauseSurfaceResultFramePayload(result = null) {
    const grammarFrame = getNuclearClauseSurfaceResultFrame(result);
    return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
}

function resolveNuclearClauseSurfaceContractSurface(result = null) {
    const frameResult = getNuclearClauseSurfaceResultFramePayload(result);
    const hasResultFrame = Boolean(frameResult);
    const surfaceForms = normalizeGrammarFrameSurfaceForms(result);
    return normalizeNuclearClauseSurfaceContractSurface(
        surfaceForms[0]
        || frameResult?.surface
        || (!hasResultFrame ? (result?.surface || result?.result) : "")
        || ""
    );
}

function resolveNuclearClauseSurfaceResultFrameSurface(result = null) {
    const frameResult = getNuclearClauseSurfaceResultFramePayload(result);
    if (!frameResult) {
        return "";
    }
    const frameForms = [];
    if (Array.isArray(frameResult.surfaceForms)) {
        frameForms.push(...frameResult.surfaceForms);
    }
    if (frameResult.surface) {
        frameForms.push(frameResult.surface);
    }
    return frameForms
        .flatMap((entry) => splitNuclearClauseSurfaceContractText(entry))
        .find(Boolean)
        || "";
}

function resolveNuclearClauseSurfaceNominalConnectorSurface(connector = null, fallbackSurface = "") {
    const framedSurface = resolveNuclearClauseSurfaceResultFrameSurface(connector);
    if (framedSurface) {
        return framedSurface;
    }
    if (getNuclearClauseSurfaceResultFramePayload(connector)) {
        return "";
    }
    return normalizeNuclearClauseSurfaceContractSurface(
        connector?.surface
        || fallbackSurface
        || ""
    );
}

function resolveNuclearClauseSurfaceNominalConnectorDisplaySurface(connector = null, fallbackSurface = "") {
    const framedSurface = resolveNuclearClauseSurfaceResultFrameSurface(connector);
    if (framedSurface) {
        return framedSurface;
    }
    if (getNuclearClauseSurfaceResultFramePayload(connector)) {
        return "";
    }
    return normalizeNuclearClauseSurfaceContractSurface(
        connector?.displaySurface
        || connector?.displayConnector
        || connector?.surface
        || fallbackSurface
        || ""
    );
}

function resolveNuclearClauseSurfaceFrameSourceInput({
    result = null,
    renderVerb = "",
    verb = "",
} = {}) {
    const explicitRenderInput = normalizeNuclearClauseSurfaceContractSurface(renderVerb);
    if (explicitRenderInput) {
        return explicitRenderInput;
    }
    const framedSurface = resolveNuclearClauseSurfaceContractSurface(result);
    if (framedSurface) {
        return framedSurface;
    }
    if (getNuclearClauseSurfaceResultFramePayload(result)) {
        return "";
    }
    return normalizeNuclearClauseSurfaceContractSurface(result?.stem)
        || normalizeNuclearClauseSurfaceContractSurface(verb);
}

function getNuclearClauseSurfaceSoundSpellingFrameKey(frame = null) {
    if (!frame || typeof frame !== "object") {
        return "";
    }
    return [
        frame.ruleId || "",
        frame.grammarSlot || "",
        frame.syllablePosition || "",
        frame.sourceSurface || "",
        frame.target || "",
        Array.isArray(frame.targetCandidates) ? frame.targetCandidates.join("/") : "",
        frame.segmentRole || "",
        frame.sourceSegmentValue || "",
        frame.targetSegmentValue || "",
    ].join(":");
}

function collectNuclearClauseSurfaceSoundSpellingFrames(...sources) {
    const frames = [];
    const pushFrame = (frame = null) => {
        if (!frame || typeof frame !== "object" || !frame.ruleId) {
            return;
        }
        const key = getNuclearClauseSurfaceSoundSpellingFrameKey(frame);
        if (!key || frames.some((entry) => getNuclearClauseSurfaceSoundSpellingFrameKey(entry) === key)) {
            return;
        }
        frames.push({ ...frame });
    };
    sources.forEach((source) => {
        if (!source) {
            return;
        }
        if (Array.isArray(source)) {
            source.forEach(pushFrame);
            return;
        }
        if (typeof source === "object") {
            if (Array.isArray(source.soundSpellingFrames)) {
                source.soundSpellingFrames.forEach(pushFrame);
            }
            if (source.soundSpellingFrame && typeof source.soundSpellingFrame === "object") {
                pushFrame(source.soundSpellingFrame);
            }
            const grammarFrame = (
                (source.grammarFrame && typeof source.grammarFrame === "object" ? source.grammarFrame : null)
                || (source.frames && typeof source.frames === "object" ? source.frames : null)
            );
            if (Array.isArray(grammarFrame?.orthographyFrame?.soundSpellingFrames)) {
                grammarFrame.orthographyFrame.soundSpellingFrames.forEach(pushFrame);
            }
        }
    });
    return frames;
}

const CNV_FORMULA_SURFACE_SLOT_ROLES = Object.freeze({
    pers1: Object.freeze(["pers1"]),
    pers2: Object.freeze(["pers2"]),
    directional: Object.freeze(["obj1"]),
    va: Object.freeze(["obj1"]),
    va1: Object.freeze(["obj1"]),
    va2: Object.freeze(["obj1"]),
    base: Object.freeze(["tronco"]),
    tns: Object.freeze(["tronco", "pers2"]),
    num1: Object.freeze(["pers2"]),
    num2: Object.freeze(["pers2"]),
});

function normalizeCnvSurfacePathSegments(segments = []) {
    if (typeof normalizeOutputSurfaceSegments === "function") {
        return normalizeOutputSurfaceSegments(segments);
    }
    return (Array.isArray(segments) ? segments : [])
        .map((segment) => ({
            role: String(segment?.role || ""),
            slot: String(segment?.slot || ""),
            value: String(segment?.value || ""),
            soundSpellingFrames: Array.isArray(segment?.soundSpellingFrames)
                ? segment.soundSpellingFrames.map((frame) => ({ ...frame }))
                : [],
        }))
        .filter((segment) => segment.role || segment.slot || segment.value);
}

function getCnvSurfacePathSegmentValue(segments = [], role = "") {
    const normalizedRole = String(role || "");
    const match = normalizeCnvSurfacePathSegments(segments)
        .find((segment) => segment.role === normalizedRole || segment.slot === normalizedRole);
    return String(match?.value || "");
}

function splitGeneratedPreteritCnvFoldedConnector(value = "", sourceSubjectSuffix = "") {
    const text = String(value || "");
    if (!text) {
        return null;
    }
    const candidates = String(sourceSubjectSuffix || "") === "t"
        ? [
            { suffix: "ket", connector: "k-et", num1: "k", num2: "et" },
            { suffix: "et", connector: "0-et", num1: "0", num2: "et" },
        ]
        : [
            { suffix: "ki", connector: "ki-0", num1: "ki", num2: "" },
            { suffix: "k", connector: "k-0", num1: "k", num2: "" },
        ];
    const match = candidates.find((candidate) => (
        text.length > candidate.suffix.length
        && text.endsWith(candidate.suffix)
    ));
    if (!match) {
        return null;
    }
    return {
        base: text.slice(0, -match.suffix.length),
        connector: match.connector,
        num1: match.num1,
        num2: match.num2,
        suffix: match.suffix,
    };
}

function buildGeneratedPreteritCnvConnectorProfile({
    tense = "",
    primaryVerb = "",
    alternateForms = [],
    sourceSubjectSuffix = "",
} = {}) {
    if (String(tense || "") !== "preterito") {
        return null;
    }
    const entries = [];
    const addEntry = (verb = "") => {
        const split = splitGeneratedPreteritCnvFoldedConnector(verb, sourceSubjectSuffix);
        if (!split || !split.base) {
            return;
        }
        if (!entries.some((entry) => entry.base === split.base && entry.connector === split.connector)) {
            entries.push(split);
        }
    };
    addEntry(primaryVerb);
    (Array.isArray(alternateForms) ? alternateForms : []).forEach((form) => {
        addEntry(form?.verb || "");
    });
    if (!entries.length) {
        return null;
    }
    return {
        entries,
        primaryConnector: entries[0]?.connector || "",
        baseRealizations: entries
            .map((entry) => entry.base)
            .filter((entry, index, list) => entry && list.indexOf(entry) === index),
        connectorRealizations: entries
            .map((entry) => entry.connector)
            .filter((entry, index, list) => entry && list.indexOf(entry) === index),
    };
}

function getGeneratedPreteritFoldedObjectPrefix(obj1 = "", subjectPrefix = "") {
    const normalizedObj1 = String(obj1 || "").trim();
    if (normalizedObj1 === "ki" && (subjectPrefix === "ni" || subjectPrefix === "ti")) {
        return "k";
    }
    return normalizedObj1;
}

function isGeneratedClassPerfectiveFormulaTense(tense = "") {
    const normalizedTense = String(tense || "");
    if (
        typeof PRETERITO_CLASS_TENSES !== "undefined"
        && PRETERITO_CLASS_TENSES
        && typeof PRETERITO_CLASS_TENSES.has === "function"
    ) {
        return PRETERITO_CLASS_TENSES.has(normalizedTense);
    }
    return ["preterito", "perfecto", "pasado-remoto"].includes(normalizedTense);
}

function getGeneratedClassPerfectiveFormulaBaseCandidates(stem = "") {
    const normalizedStem = String(stem || "")
        .trim()
        .replace(/^\((.*)\)$/, "$1");
    const candidates = [];
    const addCandidate = (candidate = "") => {
        const value = String(candidate || "").trim();
        if (value && !candidates.includes(value)) {
            candidates.push(value);
        }
    };
    getCnvFormulaSourceStemVariants(stem)
        .filter((variant) => variant.relation !== "source-final-vowel-removed")
        .forEach((variant) => addCandidate(variant.value));
    if (!candidates.length) {
        addCandidate(normalizedStem);
    }
    return candidates;
}

function getGeneratedClassPerfectiveSurfaceCore(surface = "", tense = "", sourceSubjectSuffix = "") {
    const strippedTense = typeof stripGeneratedVncFormulaTenseSuffix === "function"
        ? stripGeneratedVncFormulaTenseSuffix(surface, tense, sourceSubjectSuffix)
        : String(surface || "");
    if (String(tense || "") !== "preterito") {
        return strippedTense;
    }
    const split = splitGeneratedPreteritCnvFoldedConnector(strippedTense, sourceSubjectSuffix)
        || splitGeneratedPreteritCnvFoldedConnector(strippedTense, "");
    return split?.base || strippedTense;
}

function getGeneratedClassPerfectiveFormulaObjectCandidates(obj1 = "", base = "", subjectPrefix = "") {
    const normalizedObj1 = String(obj1 || "").trim();
    const candidates = [];
    const addCandidate = (candidate = "") => {
        const value = String(candidate || "").trim();
        if (value && !candidates.includes(value)) {
            candidates.push(value);
        }
    };
    if (normalizedObj1 === "ki" && String(base || "").startsWith("i")) {
        addCandidate("k");
    }
    addCandidate(getGeneratedPreteritFoldedObjectPrefix(normalizedObj1, subjectPrefix));
    addCandidate(normalizedObj1);
    return candidates;
}

function buildGeneratedClassPerfectiveFormulaProfile({
    tense = "",
    surfaceForms = [],
    subjectPrefix = "",
    objectPrefix = "",
    sourceSubjectSuffix = "",
    sourceStem = "",
} = {}) {
    if (!isGeneratedClassPerfectiveFormulaTense(tense) || !objectPrefix || !sourceStem) {
        return null;
    }
    const forms = (Array.isArray(surfaceForms) ? surfaceForms : [])
        .map((form) => String(form || "").trim())
        .filter(Boolean);
    if (!forms.length) {
        return null;
    }
    const baseCandidates = getGeneratedClassPerfectiveFormulaBaseCandidates(sourceStem);
    const matches = [];
    forms.forEach((form) => {
        const core = getGeneratedClassPerfectiveSurfaceCore(form, tense, sourceSubjectSuffix);
        baseCandidates.forEach((base) => {
            getGeneratedClassPerfectiveFormulaObjectCandidates(objectPrefix, base, subjectPrefix)
                .forEach((objectCandidate) => {
                    const formulaObject = getLesson6DirectNawatFormulaObjectPrefix(objectCandidate, {
                        stem: base,
                        pers1: subjectPrefix,
                    });
                    const objectSurface = normalizeCnvFormulaMorphForSurface(formulaObject || objectCandidate);
                    const expectedCore = `${subjectPrefix || ""}${objectSurface || ""}${base}`;
                    if (core !== expectedCore) {
                        return;
                    }
                    matches.push({
                        surface: form,
                        core,
                        subjectPrefix,
                        objectPrefix: objectCandidate,
                        formulaObject,
                        objectSurface,
                        base,
                    });
                });
        });
    });
    if (!matches.length) {
        return null;
    }
    const uniqueBases = matches
        .map((match) => match.base)
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
    const uniqueObjects = matches
        .map((match) => match.formulaObject)
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
    if (uniqueBases.length !== 1 || uniqueObjects.length !== 1) {
        return null;
    }
    return {
        base: uniqueBases[0],
        objectPrefix: matches.find((match) => match.formulaObject === uniqueObjects[0])?.objectPrefix || "",
        formulaObject: uniqueObjects[0],
        objectSurface: matches.find((match) => match.formulaObject === uniqueObjects[0])?.objectSurface || "",
        matches,
    };
}

function stripCnvFormulaSurfacePrefix(base = "", prefix = "") {
    const normalizedBase = String(base || "");
    const prefixParts = String(prefix || "").split("-")
        .map((part) => String(part || "").trim())
        .filter((part) => part && part !== "Ø" && part !== "0" && part !== "∅");
    const normalizedPrefix = prefixParts.join("");
    if (!normalizedBase || !normalizedPrefix) {
        return normalizedBase;
    }
    return normalizedBase.startsWith(normalizedPrefix)
        ? normalizedBase.slice(normalizedPrefix.length)
        : normalizedBase;
}

function stripCnvFormulaSurfacePrefixWithTrace(base = "", prefix = "") {
    const normalizedBase = String(base || "");
    const prefixParts = String(prefix || "").split("-")
        .map((part) => String(part || "").trim())
        .filter((part) => part && part !== "Ø" && part !== "0" && part !== "∅");
    const candidates = [
        prefixParts.join(""),
        prefixParts[0] || "",
    ].filter((candidate, index, list) => candidate && list.indexOf(candidate) === index);
    const matched = candidates.find((candidate) => normalizedBase.startsWith(candidate)) || "";
    if (!normalizedBase || !matched) {
        return {
            base: normalizedBase,
            strippedPrefix: "",
            formulaPrefix: String(prefix || ""),
        };
    }
    return {
        base: normalizedBase.slice(matched.length),
        strippedPrefix: matched,
        formulaPrefix: String(prefix || ""),
    };
}

function getCnvFormulaFoldableBasePrefixes(formulaSlots = null) {
    return getCnvFormulaFoldableBasePrefixEntries(formulaSlots)
        .map((entry) => entry.prefix);
}

function getCnvFormulaFoldableBasePrefixEntries(formulaSlots = null) {
    const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
    const subjectPrefix = slots.pers1Pers2?.displayPrefix || slots.pers1Pers2?.prefix || "";
    const predicateStem = String(slots.predicateStem?.displayStem || slots.predicateStem?.stem || "");
    const hasValencePrefix = [
        slots.obj1?.displayPrefix || slots.obj1?.prefix || "",
        slots.obj2?.displayPrefix || slots.obj2?.prefix || "",
        slots.obj3?.displayPrefix || slots.obj3?.prefix || "",
        slots.reflexivo?.displayPrefix || slots.reflexivo?.prefix || "",
    ].some((prefix) => {
        const normalized = String(prefix || "").trim();
        return normalized && normalized !== "Ø" && normalized !== "0";
    });
    const subjectEntries = [];
    if (!hasValencePrefix && predicateStem.startsWith("i") && subjectPrefix === "ni") {
        subjectEntries.push({ sourceSlot: "pers1", prefix: "n", formulaPrefix: "ni" });
    } else if (!hasValencePrefix && predicateStem.startsWith("i") && subjectPrefix === "ti") {
        subjectEntries.push({ sourceSlot: "pers1", prefix: "t", formulaPrefix: "ti" });
    } else {
        subjectEntries.push({ sourceSlot: "pers1", prefix: subjectPrefix });
    }
    return [
        ...subjectEntries,
        { sourceSlot: "val1-val2", prefix: slots.obj1?.displayPrefix || slots.obj1?.prefix || "" },
        { sourceSlot: "val1-val2", prefix: slots.obj2?.displayPrefix || slots.obj2?.prefix || "" },
        { sourceSlot: "val1-val2", prefix: slots.obj3?.displayPrefix || slots.obj3?.prefix || "" },
        { sourceSlot: "val1-val2", prefix: slots.reflexivo?.displayPrefix || slots.reflexivo?.prefix || "" },
    ];
}

function stripCnvFormulaPreteritFoldedBasePrefixesWithTrace(base = "", formulaSlots = null) {
    return getCnvFormulaFoldableBasePrefixEntries(formulaSlots).reduce(
        (state, entry) => {
            const stripped = stripCnvFormulaSurfacePrefixWithTrace(state.base, entry.prefix);
            if (stripped.strippedPrefix) {
                state.strippedPrefixes.push({
                    sourceSlot: entry.sourceSlot || "val1-val2",
                    targetSlot: "base",
                    relation: "copied-into-base",
                    formulaPrefix: entry.formulaPrefix || stripped.formulaPrefix,
                    surfacePrefix: stripped.strippedPrefix,
                });
            }
            state.base = stripped.base;
            return state;
        },
        { base: String(base || ""), strippedPrefixes: [] }
    );
}

function stripCnvFormulaPreteritFoldedBasePrefixes(base = "", formulaSlots = null) {
    return stripCnvFormulaPreteritFoldedBasePrefixesWithTrace(base, formulaSlots).base;
}

function buildCnvFormulaLesson7AspectSurfaceSlots({
    formulaSlots = null,
    base = undefined,
    tns = undefined,
    num1 = undefined,
    num2 = undefined,
    baseCopyRelations = [],
} = {}) {
    const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
    const surfaceSlots = {};
    const pers1 = String(slots.pers1Pers2?.displayPrefix || slots.pers1Pers2?.prefix || "");
    if (pers1 && pers1 !== "Ø") {
        surfaceSlots.pers1 = pers1;
    }
    const directional = String(slots.directional?.displayPrefix || slots.directional?.prefix || "");
    if (directional && directional !== "Ø") {
        surfaceSlots.directional = directional;
    }
    if (base !== undefined) {
        surfaceSlots.base = String(base || "Ø");
    }
    if (tns !== undefined) {
        surfaceSlots.tns = String(tns || "");
    }
    if (num1 !== undefined) {
        surfaceSlots.num1 = String(num1 || "0");
    }
    if (num2 !== undefined) {
        surfaceSlots.num2 = String(num2 || "0");
    }
    if (Array.isArray(baseCopyRelations) && baseCopyRelations.length) {
        surfaceSlots.baseCopyRelations = baseCopyRelations.map((relation) => ({ ...relation }));
    }
    const objectMorph = getCnvFormulaObjectMorph(slots);
    if (!objectMorph || objectMorph === "Ø") {
        return surfaceSlots;
    }
    const objectFunctionalSubslots = getCnvFormulaObjectFunctionalSubslots(slots);
    if (!objectMorph.includes("-")) {
        surfaceSlots.va = objectMorph;
        return surfaceSlots;
    }
    const [linearVa1, linearVa2] = splitCnvFormulaSubslots(objectMorph);
    const va1 = objectFunctionalSubslots?.va1 || linearVa1;
    const va2 = objectFunctionalSubslots?.va2 || linearVa2;
    const surfaceVa1 = objectFunctionalSubslots?.surfaceVa1 || va1;
    const surfaceVa2 = objectFunctionalSubslots?.surfaceVa2 || va2;
    surfaceSlots.va = "";
    surfaceSlots.va1 = surfaceVa1 === "Ø" || surfaceVa1 === "0" ? "" : surfaceVa1;
    surfaceSlots.va2 = surfaceVa2 === "Ø" || surfaceVa2 === "0" ? "" : surfaceVa2;
    return surfaceSlots;
}

function stripCnvFormulaSurfaceSuffixWithTrace(surface = "", suffix = "") {
    const normalizedSurface = String(surface || "");
    const normalizedSuffix = normalizeCnvFormulaMorphForSurface(suffix);
    if (!normalizedSurface || !normalizedSuffix || !normalizedSurface.endsWith(normalizedSuffix)) {
        return {
            surface: normalizedSurface,
            strippedSuffix: "",
        };
    }
    return {
        surface: normalizedSurface.slice(0, -normalizedSuffix.length),
        strippedSuffix: normalizedSuffix,
    };
}

function splitCnvFormulaPreteritConnectorSuffix(value = "", sourceSubjectSuffix = "") {
    const text = String(value || "");
    if (!text) {
        return null;
    }
    const candidates = String(sourceSubjectSuffix || "") === "t"
        ? [
            { suffix: "ket", connector: "k-et", num1: "k", num2: "et" },
            { suffix: "et", connector: "0-et", num1: "0", num2: "et" },
        ]
        : [
            { suffix: "ki", connector: "ki-0", num1: "ki", num2: "0" },
            { suffix: "k", connector: "k-0", num1: "k", num2: "0" },
        ];
    const match = candidates.find((candidate) => text === candidate.suffix || (
        text.length > candidate.suffix.length
        && text.endsWith(candidate.suffix)
    ));
    if (!match) {
        return null;
    }
    return {
        base: text === match.suffix ? "" : text.slice(0, -match.suffix.length),
        connector: match.connector,
        num1: match.num1,
        num2: match.num2,
        suffix: match.suffix,
    };
}

function getCnvFormulaSourceStemVariants(sourceStem = "") {
    const normalizedStem = String(sourceStem || "")
        .trim()
        .replace(/^\((.*)\)$/, "$1");
    const variants = [];
    const addVariant = (variant = "", relation = "") => {
        const value = String(variant || "").trim();
        if (!value || variants.some((entry) => entry.value === value)) {
            return;
        }
        variants.push({ value, relation });
    };
    addVariant(normalizedStem, "source-stem");
    if (/[aeiou]$/i.test(normalizedStem)) {
        const finalVowelRemoved = normalizedStem.slice(0, -1);
        addVariant(finalVowelRemoved, "source-final-vowel-removed");
        if (/m$/i.test(finalVowelRemoved)) {
            addVariant(`${finalVowelRemoved.slice(0, -1)}n`, "source-final-vowel-removed-m-coda-n");
        }
    }
    if (/ya$/i.test(normalizedStem)) {
        addVariant(`${normalizedStem.slice(0, -2)}sh`, "source-final-y-coda-sh");
    }
    if (/a$/i.test(normalizedStem)) {
        addVariant(`${normalizedStem.slice(0, -1)}j`, "source-final-a-perfective-j");
    }
    return variants;
}

function scoreCnvFormulaSourceStemVariant(base = "", sourceStem = "") {
    const normalizedBase = String(base || "");
    if (!normalizedBase) {
        return 0;
    }
    const variants = getCnvFormulaSourceStemVariants(sourceStem);
    const exactIndex = variants.findIndex((variant) => variant.value === normalizedBase);
    if (exactIndex >= 0) {
        return 100 - exactIndex;
    }
    const source = String(sourceStem || "");
    if (source && source.startsWith(normalizedBase)) {
        return Math.max(1, 60 - (source.length - normalizedBase.length));
    }
    if (source && normalizedBase.startsWith(source)) {
        return Math.max(1, 40 - (normalizedBase.length - source.length));
    }
    return 0;
}

function getCnvFormulaSourceStemVariantRelation(base = "", sourceStem = "") {
    const normalizedBase = String(base || "");
    if (!normalizedBase) {
        return "";
    }
    const variant = getCnvFormulaSourceStemVariants(sourceStem)
        .find((entry) => entry.value === normalizedBase);
    return variant?.relation || "";
}

function hasCnvFormulaValencePrefix(slots = null) {
    const source = slots && typeof slots === "object" ? slots : {};
    return [
        source.obj1?.displayPrefix || source.obj1?.prefix || "",
        source.obj2?.displayPrefix || source.obj2?.prefix || "",
        source.obj3?.displayPrefix || source.obj3?.prefix || "",
        source.reflexivo?.displayPrefix || source.reflexivo?.prefix || "",
    ].some((prefix) => {
        const value = String(prefix || "").trim();
        return value && value !== "Ø" && value !== "0";
    });
}

function resolveCnvFormulaPreteritPredicateCore({
    core = "",
    slots = null,
    sourceConnector = "",
    sourceSubjectSuffix = "",
} = {}) {
    const sourceStem = String(slots?.predicateStem?.displayStem || slots?.predicateStem?.stem || "");
    const candidates = [];
    const addCandidate = ({
        base = "",
        num1 = "",
        num2 = "",
        relation = "",
        connectorMatchesSource = false,
    } = {}) => {
        const normalizedBase = String(base || "");
        const key = `${normalizedBase}|${num1 || "0"}|${num2 || "0"}`;
        if (!normalizedBase || candidates.some((candidate) => candidate.key === key)) {
            return;
        }
        const strippedBase = stripCnvFormulaPreteritFoldedBasePrefixesWithTrace(normalizedBase, slots).base;
        const sourceScore = scoreCnvFormulaSourceStemVariant(strippedBase, sourceStem);
        const sourceStemRelation = getCnvFormulaSourceStemVariantRelation(strippedBase, sourceStem);
        const finalVowelRemovedStemOwnsFinalConsonant = (
            relation === "source-connector-with-stem-variant"
            && sourceStemRelation === "source-final-vowel-removed"
        );
        const connectorScore = finalVowelRemovedStemOwnsFinalConsonant ? -10 : (connectorMatchesSource ? 20 : 0);
        candidates.push({
            key,
            base: normalizedBase,
            num1: num1 || "0",
            num2: num2 || "0",
            relation,
            score: sourceScore
                + connectorScore
                + (relation === "surface-connector-suffix" ? 5 : 0),
        });
    };
    const split = splitCnvFormulaPreteritConnectorSuffix(core, sourceSubjectSuffix)
        || splitCnvFormulaPreteritConnectorSuffix(core, "");
    if (split) {
        addCandidate({
            base: split.base,
            num1: split.num1,
            num2: split.num2,
            relation: "surface-connector-suffix",
            connectorMatchesSource: !sourceConnector || sourceConnector === split.connector,
        });
    }
    if (
        hasCnvFormulaValencePrefix(slots)
        && (sourceConnector === "k-0" || sourceConnector === "ki-0")
    ) {
        const [sourceNum1, sourceNum2] = splitCnvFormulaSubslots(sourceConnector);
        addCandidate({
            base: core,
            num1: sourceNum1 || "0",
            num2: sourceNum2 || "0",
            relation: "source-connector-with-stem-variant",
            connectorMatchesSource: true,
        });
    }
    const useFormulaZeroFallback = !sourceConnector || sourceConnector === "Ø-Ø";
    const strippedFallbackBase = stripCnvFormulaPreteritFoldedBasePrefixesWithTrace(core, slots).base;
    const fallbackUsesSurfaceZero = useFormulaZeroFallback
        && sourceStem
        && strippedFallbackBase
        && strippedFallbackBase !== sourceStem
        && scoreCnvFormulaSourceStemVariant(strippedFallbackBase, sourceStem) > 0;
    addCandidate({
        base: core,
        num1: useFormulaZeroFallback && !fallbackUsesSurfaceZero ? "Ø" : "0",
        num2: useFormulaZeroFallback && !fallbackUsesSurfaceZero ? "Ø" : "0",
        relation: "zero-connector-fallback",
        connectorMatchesSource: !sourceConnector || sourceConnector === "Ø-Ø",
    });
    return candidates
        .sort((left, right) => right.score - left.score)[0] || { base: core };
}

function getCnvFormulaLesson7SurfaceSlots(formulaSlots = null, surface = "", segments = []) {
    const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
    const normalizedSegments = normalizeCnvSurfacePathSegments(segments);
    const tenseValue = String(slots.tensePosition?.tenseValue || slots.tensePosition?.compatibilityLabel || "");
    const tenseMorph = String(slots.tensePosition?.displayMorph || slots.tensePosition?.morph || "");
    const tenseSurface = normalizeCnvFormulaMorphForSurface(tenseMorph);
    const connectorMorph = getCnvFormulaSlotDisplayMorph("num1Num2", slots.num1Num2 || {});
    const [num1, num2] = splitCnvFormulaSubslots(connectorMorph);
    const num1Surface = normalizeCnvFormulaMorphForSurface(num1 || "");
    const num2Surface = normalizeCnvFormulaMorphForSurface(num2 || "");
    const sourceConnector = String(slots.num1Num2?.displayConnector || slots.num1Num2?.connector || "");
    const sourceSubjectSuffix = sourceConnector === "k-et" || sourceConnector === "0-et" ? "t" : "";
    const particlePrefix = getCnvSurfacePathSegmentValue(normalizedSegments, "particulaPrepuesta");
    const tronco = getCnvSurfacePathSegmentValue(normalizedSegments, "tronco");
    const surfacePers2 = getCnvSurfacePathSegmentValue(normalizedSegments, "pers2");
    const objectMorph = getCnvFormulaObjectMorph(slots);
    const directionalMorph = String(slots.directional?.displayPrefix || slots.directional?.prefix || "");
    const directionalSurface = normalizeCnvFormulaMorphForSurface(directionalMorph);
    const objectSegment = getCnvSurfacePathSegmentValue(normalizedSegments, "obj1");
    const hasKInhObjectSurface = objectMorph === "k-in" && (
        normalizeCnvFormulaMorphForSurface(objectSegment) === "kinh"
        || String(surface || "").includes("kinh")
    );
    const reflexiveMorph = String(slots.reflexivo?.displayPrefix || slots.reflexivo?.prefix || "");
    const objectSlotKey = reflexiveMorph && reflexiveMorph !== "Ø" ? "reflexivo" : "obj1";
    const getKInhObjectFormulaSlotOverride = () => {
        if (!hasKInhObjectSurface) {
            return {};
        }
        const sourceSlot = slots[objectSlotKey] || {};
        return {
            [objectSlotKey]: {
                ...sourceSlot,
                lesson6DirectNawatDyad: {
                    ...(sourceSlot.lesson6DirectNawatDyad || {}),
                    surfaceVa2: "inh",
                    surfaceLinearMorph: "k-inh",
                },
            },
        };
    };
    const readExternalSuffix = (suffix = "") => {
        const value = String(suffix || "");
        if (!value) {
            return null;
        }
        if (tenseValue === "preterito") {
            const split = splitCnvFormulaPreteritConnectorSuffix(value, sourceSubjectSuffix)
                || splitCnvFormulaPreteritConnectorSuffix(value, "");
            if (split && !split.base) {
                return { num1: split.num1, num2: split.num2 };
            }
        }
        const expectedSuffix = `${tenseSurface}${num1Surface}${num2Surface}`;
        if (!expectedSuffix || !value.endsWith(expectedSuffix)) {
            return null;
        }
        return {
            ...(tenseSurface ? { tns: tenseSurface } : {}),
            ...(num1Surface ? { num1: num1Surface } : {}),
            ...(num2Surface ? { num2: num2Surface } : {}),
        };
    };
    const readPredicateCore = (coreSurface = "") => {
        let core = String(coreSurface || "");
        const suffixSlots = readExternalSuffix(surfacePers2);
        if (tenseValue === "preterito" && !suffixSlots) {
            return resolveCnvFormulaPreteritPredicateCore({
                core,
                slots,
                sourceConnector,
                sourceSubjectSuffix,
            });
        }
        const num2Strip = !suffixSlots?.num2
            ? stripCnvFormulaSurfaceSuffixWithTrace(core, num2 || "")
            : { surface: core, strippedSuffix: "" };
        core = num2Strip.surface;
        const num1Strip = !suffixSlots?.num1
            ? stripCnvFormulaSurfaceSuffixWithTrace(core, num1 || "")
            : { surface: core, strippedSuffix: "" };
        core = num1Strip.surface;
        let strippedTense = "";
        if (!suffixSlots?.tns && tenseSurface && core.endsWith(tenseSurface)) {
            core = core.slice(0, -tenseSurface.length);
            strippedTense = tenseSurface;
        } else if (!suffixSlots?.tns && tenseSurface === "ka" && core.endsWith("a")) {
            core = core.slice(0, -1);
            strippedTense = "a";
        }
        return {
            base: core,
            ...(suffixSlots || {}),
            ...(strippedTense ? { tns: strippedTense } : {}),
            ...(num1Strip.strippedSuffix ? { num1: num1Strip.strippedSuffix } : {}),
            ...(num2Strip.strippedSuffix ? { num2: num2Strip.strippedSuffix } : {}),
        };
    };
    const buildFromCore = (coreSurface = "", formulaSlotOverrides = {}) => {
        let coreForPredicate = String(coreSurface || "");
        if (directionalSurface && coreForPredicate.startsWith(directionalSurface)) {
            coreForPredicate = coreForPredicate.slice(directionalSurface.length);
        }
        const predicate = readPredicateCore(coreForPredicate);
        const shouldStripFoldedBasePrefixes = tenseValue && tenseValue !== "presente";
        const strippedBase = shouldStripFoldedBasePrefixes
            ? stripCnvFormulaPreteritFoldedBasePrefixesWithTrace(predicate.base, slots)
            : {
                base: predicate.base,
                strippedPrefixes: [],
            };
        const copiedSubjectPrefix = strippedBase.strippedPrefixes
            .find((relation) => relation.sourceSlot === "pers1")?.surfacePrefix || "";
        return buildCnvFormulaLesson7AspectSurfaceSlots({
            formulaSlots: {
                ...slots,
                ...formulaSlotOverrides,
                pers1Pers2: {
                    ...(slots.pers1Pers2 || {}),
                    ...(formulaSlotOverrides.pers1Pers2 || {}),
                    ...(copiedSubjectPrefix ? { displayPrefix: copiedSubjectPrefix } : {}),
                },
            },
            base: strippedBase.base || "Ø",
            baseCopyRelations: strippedBase.strippedPrefixes,
            ...(predicate.tns !== undefined ? { tns: predicate.tns } : {}),
            ...(predicate.num1 !== undefined ? { num1: predicate.num1 } : {}),
            ...(predicate.num2 !== undefined ? { num2: predicate.num2 } : {}),
        });
    };
    if (tronco) {
        if (hasKInhObjectSurface) {
            return buildFromCore(tronco.startsWith("h") ? tronco.slice(1) : tronco, getKInhObjectFormulaSlotOverride());
        }
        return buildFromCore(tronco);
    }
    let text = String(surface || "");
    if (particlePrefix && text.startsWith(particlePrefix)) {
        text = text.slice(particlePrefix.length);
    }
    text = text.trimStart();
    if (!text) {
        return null;
    }
    const pers1Morph = String(slots.pers1Pers2?.displayPrefix || slots.pers1Pers2?.prefix || "");
    const pers1Surface = normalizeCnvFormulaMorphForSurface(pers1Morph);
    let core = text;
    const formulaSlotOverrides = {};
    if (pers1Surface && core.startsWith(pers1Surface)) {
        formulaSlotOverrides.pers1Pers2 = {
            ...(slots.pers1Pers2 || {}),
            displayPrefix: pers1Surface,
        };
        core = core.slice(pers1Surface.length);
    } else if (pers1Morph && pers1Morph !== "Ø") {
        formulaSlotOverrides.pers1Pers2 = {
            ...(slots.pers1Pers2 || {}),
            displayPrefix: "",
        };
    }
    if (objectMorph && objectMorph !== "Ø") {
        const objectSurface = normalizeCnvFormulaMorphForSurface(objectMorph);
        if (hasKInhObjectSurface && core.startsWith("kinh")) {
            Object.assign(formulaSlotOverrides, getKInhObjectFormulaSlotOverride());
            core = core.slice("kinh".length);
        } else if (objectSurface && core.startsWith(objectSurface)) {
            core = core.slice(objectSurface.length);
        }
    }
    return buildFromCore(core, formulaSlotOverrides);
}

function normalizeCnvFormulaMorphForSurface(value = "") {
    return String(value || "")
        .split("-")
        .map((part) => String(part || "").trim())
        .filter((part) => part && part !== "Ø" && part !== "0" && part !== "∅")
        .join("");
}

function getCnvFormulaSlotDisplayMorph(slotKey = "", slot = null) {
    const node = slot && typeof slot === "object" ? slot : {};
    switch (slotKey) {
        case "pers1Pers2":
            return `${String(node.displayPrefix || node.prefix || "Ø") || "Ø"}-${String(node.displayCase || node.case || node.pers2 || "Ø") || "Ø"}`;
        case "predicateStem":
            return String(node.displayStem || node.stem || "∅") || "∅";
        case "tensePosition":
            return String(node.displayMorph || node.morph || node.tenseMorph || "Ø") || "Ø";
        case "num1Num2":
            return String(node.displayConnector || node.connector || node.surface || "Ø-Ø") || "Ø-Ø";
        default:
            return String(node.displayPrefix || node.prefix || "Ø") || "Ø";
    }
}

function splitCnvFormulaSubslots(value = "") {
    const normalized = String(value || "").trim();
    if (!normalized) {
        return ["", ""];
    }
    if (!normalized.includes("-")) {
        return ["", normalized];
    }
    const parts = normalized.split("-");
    return [parts[0] || "", parts.slice(1).join("-") || ""];
}

function getCnvFormulaObjectMorph(formulaSlots = null) {
    const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
    const reflexive = slots.reflexivo || {};
    const object = slots.obj1 || {};
    const reflexiveDisplay = String(reflexive.displayPrefix || reflexive.prefix || "");
    if (reflexiveDisplay && reflexiveDisplay !== "Ø") {
        return reflexiveDisplay;
    }
    return String(object.displayPrefix || object.prefix || "");
}

function getCnvFormulaObjectFunctionalSubslots(formulaSlots = null) {
    const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
    const reflexive = slots.reflexivo || {};
    const object = slots.obj1 || {};
    const source = (
        reflexive.lesson6DirectNawatDyad
        && String(reflexive.displayPrefix || reflexive.prefix || "") !== "Ø"
    )
        ? reflexive.lesson6DirectNawatDyad
        : object.lesson6DirectNawatDyad;
    if (!source || typeof source !== "object" || source.formulaPosition !== "va1-va2") {
        return null;
    }
    const va1 = String(source.functionalVa1 || source.va1 || "");
    const va2 = String(source.functionalVa2 || source.va2 || "");
    if (!va1 && !va2) {
        return null;
    }
    return {
        va1,
        va2,
        val1Features: source.val1Features || null,
        val2Features: source.val2Features || null,
        visibleFormulaPrefix: String(source.visibleFormulaPrefix || ""),
        surfaceVa1: String(source.surfaceVa1 || ""),
        surfaceVa2: String(source.surfaceVa2 || ""),
        surfaceLinearMorph: String(source.surfaceLinearMorph || ""),
        linearPieces: Array.isArray(source.linearPieces) ? source.linearPieces.slice() : [],
    };
}

function buildCnvFormulaAndrewsPathSlots(formulaSlots = null) {
    const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
    const subject = slots.pers1Pers2 || {};
    const directional = slots.directional || {};
    const predicate = slots.predicateStem || {};
    const tense = slots.tensePosition || {};
    const connector = slots.num1Num2 || {};
    const objectMorph = getCnvFormulaObjectMorph(slots);
    const objectFunctionalSubslots = getCnvFormulaObjectFunctionalSubslots(slots);
    const connectorMorph = getCnvFormulaSlotDisplayMorph("num1Num2", connector);
    const [num1, num2] = splitCnvFormulaSubslots(connectorMorph);
    const connectorOptions = Array.isArray(connector.connectorOptions) ? connector.connectorOptions.slice() : [];
    const num1Options = Array.isArray(connector.num1Options) ? connector.num1Options.slice() : [];
    const num2Options = Array.isArray(connector.num2Options) ? connector.num2Options.slice() : [];
    const pathSlots = [
        {
            formulaSlotKey: "pers1",
            formulaSlot: "pers1",
            formulaRole: "subject",
            formulaMorph: String(subject.displayPrefix || subject.prefix || "Ø") || "Ø",
        },
        {
            formulaSlotKey: "pers2",
            formulaSlot: "pers2",
            formulaRole: "subject",
            formulaMorph: String(subject.displayCase || subject.case || subject.pers2 || "Ø") || "Ø",
        },
    ];
    const directionalMorph = String(directional.displayPrefix || directional.prefix || "");
    if (directionalMorph && directionalMorph !== "Ø") {
        pathSlots.push({
            formulaSlotKey: "directional",
            formulaSlot: "directional",
            formulaRole: "directional-prefix",
            formulaMorph: directionalMorph,
        });
    }
    if (objectMorph && objectMorph !== "Ø") {
        if (objectMorph.includes("-")) {
            const [va1, va2] = splitCnvFormulaSubslots(objectMorph);
            pathSlots.push(
                {
                    formulaSlotKey: "va1",
                    formulaSlot: "va1",
                    formulaRole: "valence",
                    formulaMorph: objectFunctionalSubslots?.va1 || va1 || "Ø",
                    surfaceValueOverride: objectFunctionalSubslots?.va1 || "",
                    formulaFeatures: objectFunctionalSubslots?.val1Features || null,
                    visibleLinearMorph: objectFunctionalSubslots?.visibleFormulaPrefix || objectMorph,
                    linearPieces: objectFunctionalSubslots?.linearPieces || [],
                },
                {
                    formulaSlotKey: "va2",
                    formulaSlot: "va2",
                    formulaRole: "valence",
                    formulaMorph: objectFunctionalSubslots?.va2 || va2 || "Ø",
                    surfaceValueOverride: objectFunctionalSubslots?.va2 === "0" ? "" : (objectFunctionalSubslots?.va2 || ""),
                    formulaFeatures: objectFunctionalSubslots?.val2Features || null,
                    visibleLinearMorph: objectFunctionalSubslots?.visibleFormulaPrefix || objectMorph,
                    linearPieces: objectFunctionalSubslots?.linearPieces || [],
                }
            );
        } else {
            pathSlots.push({
                formulaSlotKey: "va",
                formulaSlot: "va",
                formulaRole: "valence",
                formulaMorph: objectMorph,
            });
        }
    }
    pathSlots.push(
        {
            formulaSlotKey: "base",
            formulaSlot: "base",
            formulaRole: "predicate",
            formulaMorph: getCnvFormulaSlotDisplayMorph("predicateStem", predicate),
        },
        {
            formulaSlotKey: "tns",
            formulaSlot: "tns",
            formulaRole: "tense-mood",
            formulaMorph: getCnvFormulaSlotDisplayMorph("tensePosition", tense),
        },
        {
            formulaSlotKey: "num1",
            formulaSlot: "num1",
            formulaRole: "subject-number",
            formulaMorph: num1 || "Ø",
            formulaOptions: num1Options,
            formulaDyadOptions: connectorOptions,
        },
        {
            formulaSlotKey: "num2",
            formulaSlot: "num2",
            formulaRole: "subject-number",
            formulaMorph: num2 || "Ø",
            formulaOptions: num2Options,
            formulaDyadOptions: connectorOptions,
        }
    );
    return pathSlots;
}

function getCnvFormulaSurfacePathFrames(soundSpellingFrames = [], roles = []) {
    const roleSet = new Set((Array.isArray(roles) ? roles : []).map((role) => String(role || "")));
    return (Array.isArray(soundSpellingFrames) ? soundSpellingFrames : [])
        .filter((frame) => {
            const segmentRole = String(frame?.segmentRole || frame?.grammarSlot || "");
            return roleSet.has(segmentRole);
        })
        .map((frame) => ({ ...frame }));
}

function getCnvFormulaSurfacePathRecordKey(record = null) {
    const surface = String(record?.surface || "");
    const segments = normalizeCnvSurfacePathSegments(record?.segments || []);
    return `${surface}|${segments.map((segment) => `${segment.role || segment.slot}:${segment.value}`).join("|")}`;
}

function buildCnvFormulaSurfacePathRecord({
    nuclearClauseShell = null,
    surfaceRecord = null,
    soundSpellingFrames = [],
    surfaceRealizationsBySlot = {},
} = {}) {
    const formulaSlots = nuclearClauseShell?.formulaSlots && typeof nuclearClauseShell.formulaSlots === "object"
        ? nuclearClauseShell.formulaSlots
        : null;
    if (!formulaSlots) {
        return null;
    }
    const segments = normalizeCnvSurfacePathSegments(surfaceRecord?.segments || []);
    const surface = String(surfaceRecord?.surface || "");
    const surfaceFormulaSlots = getCnvFormulaLesson7SurfaceSlots(formulaSlots, surface, segments);
    const paths = buildCnvFormulaAndrewsPathSlots(formulaSlots).map((pathSlot) => {
        const slotKey = pathSlot.formulaSlotKey;
        const formulaMorph = pathSlot.formulaMorph;
        const surfaceRoles = CNV_FORMULA_SURFACE_SLOT_ROLES[slotKey] || [];
        const expectedSurfaceMorph = normalizeCnvFormulaMorphForSurface(formulaMorph);
        const activeSurfaceRoles = expectedSurfaceMorph ? surfaceRoles : [];
        const surfaceValuesByRole = activeSurfaceRoles.reduce((acc, role) => {
            acc[role] = getCnvSurfacePathSegmentValue(segments, role);
            return acc;
        }, {});
        const foldedSurfaceValue = surfaceFormulaSlots
            && Object.prototype.hasOwnProperty.call(surfaceFormulaSlots, slotKey)
            ? surfaceFormulaSlots[slotKey]
            : null;
        const hasSurfaceFormulaValue = surfaceFormulaSlots
            && Object.prototype.hasOwnProperty.call(surfaceFormulaSlots, slotKey);
        const surfaceValue = foldedSurfaceValue !== null
            ? String(foldedSurfaceValue || "")
            : (pathSlot.surfaceValueOverride !== undefined && pathSlot.surfaceValueOverride !== null
                ? String(pathSlot.surfaceValueOverride || "")
                : activeSurfaceRoles
            .map((role) => surfaceValuesByRole[role] || "")
            .join(""));
        const status = (() => {
            if (!expectedSurfaceMorph && !surfaceValue) {
                return "matched-zero";
            }
            if (!expectedSurfaceMorph) {
                return "surface-carried-by-other-slot";
            }
            const normalizedSurfaceValue = normalizeCnvFormulaMorphForSurface(surfaceValue);
            if (
                surfaceValue === expectedSurfaceMorph
                || surfaceValue.includes(expectedSurfaceMorph)
                || normalizedSurfaceValue === expectedSurfaceMorph
                || normalizedSurfaceValue.includes(expectedSurfaceMorph)
            ) {
                return "matched";
            }
            if (expectedSurfaceMorph && !surfaceValue) {
                return hasSurfaceFormulaValue ? "surface-rule-required" : "formula-only";
            }
            return "surface-rule-required";
        })();
        return {
            formulaSlotKey: slotKey,
            formulaSlot: String(pathSlot.formulaSlot || slotKey),
            formulaRole: String(pathSlot.formulaRole || ""),
            formulaMorph,
            formulaFeatures: pathSlot.formulaFeatures || null,
            formulaOptions: Array.isArray(pathSlot.formulaOptions) ? pathSlot.formulaOptions.slice() : [],
            formulaDyadOptions: Array.isArray(pathSlot.formulaDyadOptions) ? pathSlot.formulaDyadOptions.slice() : [],
            visibleLinearMorph: String(pathSlot.visibleLinearMorph || ""),
            linearPieces: Array.isArray(pathSlot.linearPieces) ? pathSlot.linearPieces.slice() : [],
            expectedSurfaceMorph,
            surfaceRoles: activeSurfaceRoles,
            surfaceValuesByRole,
            surfaceValue,
            status,
            surfaceRealizations: Array.isArray(surfaceRealizationsBySlot[slotKey])
                ? surfaceRealizationsBySlot[slotKey].slice()
                : [],
            surfaceCopyRelations: slotKey === "base" && Array.isArray(surfaceFormulaSlots?.baseCopyRelations)
                ? surfaceFormulaSlots.baseCopyRelations.map((relation) => ({ ...relation }))
                : [],
            soundSpellingFrames: getCnvFormulaSurfacePathFrames(soundSpellingFrames, surfaceRoles),
        };
    });
    return {
        surface,
        segments,
        paths,
        allSlotsConnected: paths.every((path) => path.status !== "formula-only"),
    };
}

function buildGeneratedCnvFormulaSurfacePath({
    nuclearClauseShell = null,
    surfaceRecord = null,
    surfaceRecords = [],
    soundSpellingFrames = [],
} = {}) {
    const formulaSlots = nuclearClauseShell?.formulaSlots && typeof nuclearClauseShell.formulaSlots === "object"
        ? nuclearClauseShell.formulaSlots
        : null;
    if (!formulaSlots) {
        return null;
    }
    const orderedRecords = [];
    [surfaceRecord, ...(Array.isArray(surfaceRecords) ? surfaceRecords : [])].forEach((record) => {
        if (!record || typeof record !== "object") {
            return;
        }
        const key = getCnvFormulaSurfacePathRecordKey(record);
        if (!key || orderedRecords.some((entry) => getCnvFormulaSurfacePathRecordKey(entry) === key)) {
            return;
        }
        orderedRecords.push(record);
    });
    const pathRecordsWithoutAlternatives = orderedRecords
        .map((record) => buildCnvFormulaSurfacePathRecord({
            nuclearClauseShell,
            surfaceRecord: record,
            soundSpellingFrames,
            surfaceRealizationsBySlot: {},
        }))
        .filter(Boolean);
    const surfaceRealizationsBySlot = pathRecordsWithoutAlternatives.reduce((acc, record) => {
        (record.paths || []).forEach((path) => {
            const slotKey = String(path.formulaSlotKey || "");
            const value = String(path.surfaceValue || "");
            if (!slotKey || !value) {
                return;
            }
            if (!acc[slotKey]) {
                acc[slotKey] = [];
            }
            if (!acc[slotKey].includes(value)) {
                acc[slotKey].push(value);
            }
        });
        return acc;
    }, {});
    const pathRecords = orderedRecords
        .map((record) => buildCnvFormulaSurfacePathRecord({
            nuclearClauseShell,
            surfaceRecord: record,
            soundSpellingFrames,
            surfaceRealizationsBySlot,
        }))
        .filter(Boolean);
    const primaryPath = pathRecords[0] || buildCnvFormulaSurfacePathRecord({
        nuclearClauseShell,
        surfaceRecord,
        soundSpellingFrames,
        surfaceRealizationsBySlot,
    });
    if (!primaryPath) {
        return null;
    }
    const surfaceNumberConnectorRealizations = pathRecords
        .map((record) => {
            const bySlot = Object.fromEntries(
                (Array.isArray(record.paths) ? record.paths : [])
                    .map((entry) => [entry.formulaSlotKey, entry])
            );
            const num1 = String(bySlot.num1?.surfaceValue || "");
            const num2 = String(bySlot.num2?.surfaceValue || "");
            if (!num1 && !num2) {
                return "";
            }
            return `${num1 || "0"}-${num2 || "0"}`;
        })
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
    return {
        unit: "CNV",
        formulaEcho: String(nuclearClauseShell?.formulaEcho || ""),
        ...primaryPath,
        surfaceStemRealizations: Array.isArray(surfaceRealizationsBySlot.base)
            ? surfaceRealizationsBySlot.base.slice()
            : [],
        surfaceNumberConnectorRealizations,
        pathsBySurface: pathRecords,
    };
}

function alignNuclearClauseSurfaceSlotNameBridgeToCnvFormulaSurfacePath(slotNameBridge = null, cnvFormulaSurfacePath = null) {
    if (!slotNameBridge || typeof slotNameBridge !== "object" || !cnvFormulaSurfacePath) {
        return slotNameBridge;
    }
    const primaryPaths = Array.isArray(cnvFormulaSurfacePath.paths)
        ? cnvFormulaSurfacePath.paths
        : [];
    if (!primaryPaths.length) {
        return slotNameBridge;
    }
    const buildSlotsForPathRecord = (paths = []) => {
        const bySlot = Object.fromEntries((Array.isArray(paths) ? paths : [])
            .map((path) => [String(path?.formulaSlotKey || ""), path]));
        return (Array.isArray(slotNameBridge.slots) ? slotNameBridge.slots : []).map((slot) => ({
            ...slot,
            value: resolveValueFromPathMap(bySlot, slot.surfaceSlot, slot.value),
            formulaSurfacePathStatus: bySlot[String(slot.surfaceSlot || "")]?.status || "",
        }));
    };
    const resolveValueFromPathMap = (bySlot = {}, surfaceSlot = "", fallbackValue = "") => {
        const path = bySlot[surfaceSlot];
        if (!path) {
            return fallbackValue;
        }
        if (surfaceSlot === "base") {
            return String(path.surfaceValue || path.formulaMorph || fallbackValue || "");
        }
        if (surfaceSlot === "tns") {
            return String(path.formulaMorph || path.surfaceValue || fallbackValue || "Ø");
        }
        if (surfaceSlot === "num1" || surfaceSlot === "num2") {
            return String(path.surfaceValue || path.formulaMorph || fallbackValue || "Ø");
        }
        if (surfaceSlot === "va2" && !path.surfaceValue && String(path.formulaMorph || "") === "0") {
            return "0";
        }
        return String(path.surfaceValue || path.formulaMorph || fallbackValue || "");
    };
    const primarySlots = buildSlotsForPathRecord(primaryPaths);
    return {
        ...slotNameBridge,
        slots: primarySlots,
        pathsBySurface: (Array.isArray(cnvFormulaSurfacePath.pathsBySurface)
            ? cnvFormulaSurfacePath.pathsBySurface
            : [])
            .map((record) => ({
                surface: String(record?.surface || ""),
                slots: buildSlotsForPathRecord(record?.paths || []),
            })),
    };
}

function buildNuclearClauseSurfaceDiagnosticEntry({
    id = NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID,
    message = GENERATE_WORD_NO_OUTPUT_MESSAGE,
    severity = "error",
    failedLayer = "route",
    contractLayer = "routeContract",
    routeFamily = NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
    routeStage = "",
} = {}) {
    const normalizedId = String(id || NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID).trim();
    return {
        id: normalizedId,
        code: normalizedId.toUpperCase().replace(/-/g, "_"),
        severity: String(severity || "error"),
        message: String(message || GENERATE_WORD_NO_OUTPUT_MESSAGE).trim(),
        failedLayer: String(failedLayer || "route").trim(),
        contractLayer: String(contractLayer || "routeContract").trim(),
        routeFamily: String(routeFamily || NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY).trim(),
        routeStage: String(routeStage || "").trim(),
    };
}

function getNuclearClauseSurfaceFailedLayerContract(routeStage = "") {
    const stage = String(routeStage || "").trim();
    if (/morphology|stem/i.test(stage)) {
        return { failedLayer: "stem", contractLayer: "stemFrame" };
    }
    if (/orthography|spelling/i.test(stage)) {
        return { failedLayer: "orthography", contractLayer: "orthographyFrame" };
    }
    if (/agreement|participant|subject|object|possess/i.test(stage)) {
        return { failedLayer: "agreement", contractLayer: "participantFrame" };
    }
    if (/output|result|surface|no-output/i.test(stage)) {
        return { failedLayer: "output", contractLayer: "resultFrame" };
    }
    return { failedLayer: "route", contractLayer: "routeContract" };
}

function normalizeNuclearClauseSurfaceDiagnosticEntries(diagnostics = [], fallbackDiagnostic = null) {
    const entries = Array.isArray(diagnostics) ? diagnostics : [];
    const normalized = entries
        .map((entry) => {
            if (typeof normalizeGrammarDiagnosticContractEntry === "function") {
                return normalizeGrammarDiagnosticContractEntry(entry);
            }
            if (typeof entry === "string") {
                const id = entry.trim();
                return id ? { id, severity: "diagnostic", message: "" } : null;
            }
            return entry && typeof entry === "object" ? entry : null;
        })
        .filter(Boolean);
    if (!normalized.length && fallbackDiagnostic) {
        normalized.push(fallbackDiagnostic);
    }
    return normalized.filter((entry, index, list) => {
        const key = `${entry.id || entry.code || ""}|${entry.severity || ""}|${entry.message || ""}`;
        return list.findIndex((candidate) => (
            `${candidate.id || candidate.code || ""}|${candidate.severity || ""}|${candidate.message || ""}` === key
        )) === index;
    });
}

function resolveNuclearClauseSurfaceUnitKind(resolvedTenseMode = "", tense = "") {
    if (resolvedTenseMode === TENSE_MODE.sustantivo) {
        return "nominal-nuclear-clause";
    }
    if (resolvedTenseMode === TENSE_MODE.adverbio) {
        return "verbal-nuclear-clause";
    }
    if (resolvedTenseMode === TENSE_MODE.adjetivo) {
        const profile = typeof getNawatRouteProfile === "function"
            ? getNawatRouteProfile(tense)
            : null;
        const profileMode = profile?.targetMode || profile?.nawatMode || "";
        if (profileMode === TENSE_MODE.verbo || profileMode === "verbo") {
            return "verbal-nuclear-clause";
        }
        const generatedRouteProfile = typeof resolveGeneratedDenominalRouteProfileSpec === "function"
            ? resolveGeneratedDenominalRouteProfileSpec(tense)
            : null;
        if (generatedRouteProfile) {
            return "verbal-nuclear-clause";
        }
        return "nominal-nuclear-clause";
    }
    return "verbal-nuclear-clause";
}

function normalizeGrammarFrameSurfaceForms(result = null) {
    const frameResult = getNuclearClauseSurfaceResultFramePayload(result);
    const hasResultFrame = Boolean(frameResult);
    const surfaceForms = [];
    if (Array.isArray(frameResult?.surfaceForms)) {
        surfaceForms.push(...frameResult.surfaceForms);
    }
    if (frameResult?.surface) {
        surfaceForms.push(frameResult.surface);
    }
    if (hasResultFrame) {
        return surfaceForms
            .flatMap((entry) => splitNuclearClauseSurfaceContractText(entry))
            .filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    if (!hasResultFrame && Array.isArray(result?.surfaceForms)) {
        surfaceForms.push(...result.surfaceForms);
    }
    if (!hasResultFrame && result?.surface) {
        surfaceForms.push(result.surface);
    }
    if (!hasResultFrame && result?.result) {
        surfaceForms.push(result.result);
    }
    return surfaceForms
        .flatMap((entry) => splitNuclearClauseSurfaceContractText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function collectGrammarFrameRefsFromObject(source = null, refs = []) {
    if (!source || typeof source !== "object") {
        return refs;
    }
    [
        source.lessonRef,
        source.curriculumRef,
        source.range,
        source.andrewsRef,
        source.authorityRef,
    ].forEach((entry) => {
        const value = String(entry || "").trim();
        if (value) {
            refs.push(value);
        }
    });
    if (Array.isArray(source.lessonRefs)) {
        source.lessonRefs.forEach((entry) => {
            const value = String(entry || "").trim();
            if (value) {
                refs.push(value);
            }
        });
    }
    if (Array.isArray(source.authorityRefs)) {
        source.authorityRefs.forEach((entry) => {
            const value = String(entry || "").trim();
            if (value) {
                refs.push(value);
            }
        });
    }
    if (Array.isArray(source.andrewsRefs)) {
        source.andrewsRefs.forEach((entry) => {
            const value = String(entry || "").trim();
            if (value) {
                refs.push(value);
            }
        });
    }
    return refs;
}

function isNuclearClauseSurfaceGrammarFrameCandidate(value = null) {
    return Boolean(
        value
        && typeof value === "object"
        && (
            value.authorityFrame
            || value.routeContract
            || value.resultFrame
            || value.diagnosticFrame
        )
    );
}

function getNuclearClauseSurfaceOverrideSourceGrammarFrame(override = null) {
    const adjectivalNnc = getAdjectivalNncGenerationOptions(override);
    const entryRouteContract = adjectivalNnc.entryRouteContract && typeof adjectivalNnc.entryRouteContract === "object"
        ? adjectivalNnc.entryRouteContract
        : null;
    return [
        adjectivalNnc.grammarFrame,
        adjectivalNnc.frames,
        entryRouteContract?.grammarFrame,
        entryRouteContract?.frames,
        override?.grammarFrame,
        override?.frames,
    ].find((candidate) => isNuclearClauseSurfaceGrammarFrameCandidate(candidate)) || null;
}

function getNuclearClauseSurfaceSourceEvidenceBoundaries(value = null) {
    return value?.boundaries && typeof value.boundaries === "object"
        ? value.boundaries
        : {};
}

function mergeNuclearClauseSurfaceSourceEvidence(primary = null, fallback = null) {
    const primaryEvidence = primary && typeof primary === "object" ? primary : null;
    const fallbackEvidence = fallback && typeof fallback === "object" ? fallback : null;
    if (!primaryEvidence) {
        return fallbackEvidence;
    }
    if (!fallbackEvidence) {
        return primaryEvidence;
    }
    const merged = {
        ...fallbackEvidence,
        ...primaryEvidence,
        kind: String(
            primaryEvidence.kind
            || primaryEvidence.sourceKind
            || primaryEvidence.type
            || fallbackEvidence.kind
            || fallbackEvidence.sourceKind
            || fallbackEvidence.type
            || ""
        ).trim(),
        status: String(
            primaryEvidence.status
            || primaryEvidence.evidenceStatus
            || primaryEvidence.validationStatus
            || fallbackEvidence.status
            || fallbackEvidence.evidenceStatus
            || fallbackEvidence.validationStatus
            || ""
        ).trim(),
        targetAuthority: String(primaryEvidence.targetAuthority || fallbackEvidence.targetAuthority || "").trim(),
        evidenceSource: String(primaryEvidence.evidenceSource || fallbackEvidence.evidenceSource || "").trim(),
        boundaries: {
            ...getNuclearClauseSurfaceSourceEvidenceBoundaries(fallbackEvidence),
            ...getNuclearClauseSurfaceSourceEvidenceBoundaries(primaryEvidence),
        },
    };
    if (merged.status && !merged.evidenceStatus) {
        merged.evidenceStatus = merged.status;
    }
    return merged;
}

function buildNuclearClauseSurfaceOverrideSourceEvidence(override = null) {
    const adjectivalNnc = getAdjectivalNncGenerationOptions(override);
    if (!adjectivalNnc || !Object.keys(adjectivalNnc).length) {
        return null;
    }
    const entryRouteContract = adjectivalNnc.entryRouteContract && typeof adjectivalNnc.entryRouteContract === "object"
        ? adjectivalNnc.entryRouteContract
        : null;
    const sourceFrame = getNuclearClauseSurfaceOverrideSourceGrammarFrame(override);
    const authorityFrame = sourceFrame?.authorityFrame && typeof sourceFrame.authorityFrame === "object"
        ? sourceFrame.authorityFrame
        : {};
    const routeContract = sourceFrame?.routeContract && typeof sourceFrame.routeContract === "object"
        ? sourceFrame.routeContract
        : {};
    const sourceContract = routeContract.sourceContract && typeof routeContract.sourceContract === "object"
        ? routeContract.sourceContract
        : {};
    const targetContract = routeContract.targetContract && typeof routeContract.targetContract === "object"
        ? routeContract.targetContract
        : {};
    const resultFrame = sourceFrame?.resultFrame && typeof sourceFrame.resultFrame === "object"
        ? sourceFrame.resultFrame
        : null;
    const sourceSurface = normalizeNuclearClauseSurfaceContractSurface(
        (Array.isArray(resultFrame?.surfaceForms) ? resultFrame.surfaceForms[0] : "")
        || resultFrame?.surface
        || (!resultFrame ? (
            adjectivalNnc.surface
            || adjectivalNnc.patientivoSurface
            || adjectivalNnc.nominalizedSurface
            || adjectivalNnc.vncSurface
        ) : "")
        || ""
    );
    const hasEntryContract = Boolean(entryRouteContract);
    const hasSourceFrame = Boolean(sourceFrame);
    const sourceGenerated = resultFrame?.ok === true
        || routeContract.generationAllowed === true
        || entryRouteContract?.generationAllowed === true;
    if (!hasEntryContract && !hasSourceFrame && !adjectivalNnc.sourceEvidenceStatus && !adjectivalNnc.sourceRouteFamily) {
        return null;
    }
    const status = String(
        sourceGenerated
            ? "source-evidence-satisfied"
            : (
                adjectivalNnc.sourceEvidenceStatus
                || entryRouteContract?.evidenceStatus
                || authorityFrame.evidenceStatus
                || ""
            )
    ).trim();
    const sourceRouteFamily = String(
        adjectivalNnc.sourceRouteFamily
        || entryRouteContract?.routeFamily
        || routeContract.routeFamily
        || ""
    ).trim();
    const sourceRouteStage = String(
        adjectivalNnc.sourceRouteStage
        || entryRouteContract?.routeStage
        || routeContract.routeStage
        || ""
    ).trim();
    return {
        kind: String(adjectivalNnc.sourceEvidenceKind || "adjectival-nnc-function").trim(),
        status,
        evidenceStatus: status,
        targetAuthority: String(authorityFrame.grammarAuthority || "Andrews").trim(),
        evidenceSource: String(adjectivalNnc.sourceEvidenceSource || "linked-promoted grammar frame").trim(),
        sourceRouteFamily,
        sourceRouteStage,
        sourceOutputKind: String(resultFrame?.outputKind || targetContract.outputKind || "").trim(),
        sourceUnitKind: String(sourceFrame?.unitFrame?.unitKind || sourceContract.unitKind || "").trim(),
        sourceSurface,
        sourceCategory: String(sourceContract.sourceCategory || adjectivalNnc.sourceCategory || "").trim(),
        boundaries: {
            sourceEvidenceFromAndrewsContractRoute: Boolean(sourceRouteFamily),
            sourceEvidenceFromSelectedGeneratedStage: Boolean(sourceSurface && sourceGenerated),
            sourceEvidenceFromAdjectivalNncEntryContract: hasEntryContract,
            sourceEvidenceFromMirroredGrammarFrame: hasSourceFrame,
        },
    };
}

function collectGrammarFrameAndrewsRefs(result = null, override = null) {
    const refs = [];
    const adjectivalNnc = getAdjectivalNncGenerationOptions(override);
    const sourceFrame = getNuclearClauseSurfaceOverrideSourceGrammarFrame(override);
    const entryRouteContract = adjectivalNnc.entryRouteContract && typeof adjectivalNnc.entryRouteContract === "object"
        ? adjectivalNnc.entryRouteContract
        : null;
    [
        result,
        result?.grammarFrame?.authorityFrame,
        result?.frames?.authorityFrame,
        result?.adjectivalNncFunctionFrame,
        result?.rootPlusYaAdjectivalNncFrame,
        result?.denominalCompoundSourceFrame,
        result?.nominalizationProfile,
        result?.denominalFamilyProfile,
        result?.patientiveSourceStageFrame,
        result?.formationFrame,
        result?.adverbialNuclearFrame,
        result?.relationalNncBoundaryFrame,
        result?.placeGentilicNncBoundaryFrame,
        result?.adverbialAdjunctionBoundaryFrame,
        result?.sentenceLayer,
        adjectivalNnc,
        entryRouteContract,
        sourceFrame?.authorityFrame,
    ].forEach((entry) => {
        collectGrammarFrameRefsFromObject(entry, refs);
    });
    return refs.filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function resolveGrammarFrameSourceEvidence(result = null, override = null) {
    const outputSourceEvidence = result?.sourceEvidence
        || result?.denominalFamilyProfile?.sourceEvidence
        || result?.formationFrame?.sourceEvidence
        || result?.patientiveSourceStageFrame?.sourceEvidence
        || null;
    return mergeNuclearClauseSurfaceSourceEvidence(
        outputSourceEvidence,
        buildNuclearClauseSurfaceOverrideSourceEvidence(override)
    );
}

function resolveGrammarFrameAstFrame(result = null) {
    return result?.astFrame
        || result?.modificationAst
        || result?.adverbialAdjunctionAst
        || result?.complementClauseAst
        || result?.conjunctionClauseAst
        || result?.comparisonAst
        || result?.compoundFrame
        || null;
}

function cloneNuclearClauseSurfaceRouteFrame(frame = null) {
    if (!frame || typeof frame !== "object" || Array.isArray(frame)) {
        return null;
    }
    return { ...frame };
}

function resolveNuclearClauseSurfaceSourceRouteFrame(result = null) {
    const output = result && typeof result === "object" ? result : {};
    const inheritedGrammarFrame = output.grammarFrame && typeof output.grammarFrame === "object"
        ? output.grammarFrame
        : (output.frames && typeof output.frames === "object" ? output.frames : null);
    const candidates = [
        output.incorporationRouteFrame,
        output.compoundRouteFrame,
        output.routeFrame,
        output.compoundFrame?.incorporationRouteFrame,
        output.compoundFrame?.compoundRouteFrame,
        output.compoundFrame?.routeFrame,
        output.patientiveCompoundSourceFrame?.incorporationRouteFrame,
        output.patientiveCompoundSourceFrame?.compoundRouteFrame,
        output.patientiveCompoundSourceFrame?.routeFrame,
        output.patientiveCompoundSourceFrame?.sourceCompoundFrame?.incorporationRouteFrame,
        output.patientiveCompoundSourceFrame?.sourceCompoundFrame?.compoundRouteFrame,
        output.patientiveCompoundSourceFrame?.sourceCompoundFrame?.routeFrame,
        output.adjectivalCompoundSourceFrame?.incorporationRouteFrame,
        output.adjectivalCompoundSourceFrame?.compoundRouteFrame,
        output.adjectivalCompoundSourceFrame?.routeFrame,
        output.adjectivalCompoundSourceFrame?.sourceCompoundFrame?.incorporationRouteFrame,
        output.adjectivalCompoundSourceFrame?.sourceCompoundFrame?.compoundRouteFrame,
        output.adjectivalCompoundSourceFrame?.sourceCompoundFrame?.routeFrame,
        output.denominalCompoundSourceFrame?.incorporationRouteFrame,
        output.denominalCompoundSourceFrame?.compoundRouteFrame,
        output.denominalCompoundSourceFrame?.routeFrame,
        output.adjectivalNncFunctionFrame?.incorporationRouteFrame,
        output.adjectivalNncFunctionFrame?.compoundRouteFrame,
        output.adjectivalNncFunctionFrame?.routeFrame,
        output.adjectivalNncFunctionFrame?.sourceCompoundFrame?.incorporationRouteFrame,
        output.adjectivalNncFunctionFrame?.sourceCompoundFrame?.compoundRouteFrame,
        output.adjectivalNncFunctionFrame?.sourceCompoundFrame?.routeFrame,
        output.adjectivalNncFunctionFrame?.sourceDenominalCompoundFrame?.incorporationRouteFrame,
        output.adjectivalNncFunctionFrame?.sourceDenominalCompoundFrame?.compoundRouteFrame,
        output.adjectivalNncFunctionFrame?.sourceDenominalCompoundFrame?.routeFrame,
        output.adverbialNuclearFrame?.sourceRouteFrame,
        output.adverbialNuclearFrame?.routeFrame,
        inheritedGrammarFrame?.routeContract?.sourceContract?.sourceRouteFrame,
        inheritedGrammarFrame?.routeContract?.sourceContract?.routeFrame,
        inheritedGrammarFrame?.routeContract?.sourceContract?.incorporationRouteFrame,
        inheritedGrammarFrame?.routeContract?.targetContract?.sourceRouteFrame,
        inheritedGrammarFrame?.routeContract?.targetContract?.routeFrame,
        inheritedGrammarFrame?.routeContract?.targetContract?.incorporationRouteFrame,
        inheritedGrammarFrame?.participantFrame?.sourceRouteFrame,
        inheritedGrammarFrame?.participantFrame?.routeFrame,
        inheritedGrammarFrame?.participantFrame?.incorporationRouteFrame,
        inheritedGrammarFrame?.stemFrame?.sourceRouteFrame,
        inheritedGrammarFrame?.stemFrame?.routeFrame,
        inheritedGrammarFrame?.stemFrame?.incorporationRouteFrame,
        inheritedGrammarFrame?.morphBoundaryFrame?.sourceRouteFrame,
        inheritedGrammarFrame?.morphBoundaryFrame?.routeFrame,
        inheritedGrammarFrame?.morphBoundaryFrame?.incorporationRouteFrame,
    ];
    return cloneNuclearClauseSurfaceRouteFrame(
        candidates.find((candidate) => candidate && typeof candidate === "object") || null
    );
}

function buildNuclearClauseSurfaceGrammarFrame({
    result = null,
    override = null,
    resolvedTenseMode = "",
    tense = "",
    routeFamily = "",
    routeStage = "execute",
    unitKind = "",
    pers1 = "",
    pers2 = "",
    obj1 = "",
    poseedor = "",
    posicionesFormula = null,
    verb = "",
    renderVerb = "",
    entradaGrammarObject = null,
    nuclearClauseShell = null,
    cnvFormulaSurfacePath = null,
    vncValencyFrame = null,
    resolvedDerivationMode = "",
    resolvedDerivationType = "",
    resolvedVoiceMode = "",
} = {}) {
    if (typeof buildGrammarFrame !== "function") {
        return null;
    }
    const output = result && typeof result === "object" ? result : {};
    const surface = resolveNuclearClauseSurfaceContractSurface(output);
    const surfaceForms = normalizeGrammarFrameSurfaceForms(output);
    const diagnostics = Array.isArray(output.diagnostics) ? output.diagnostics : [];
    const ok = Boolean(surface) && output.error !== true && output.supported !== false;
    const evidenceStatus = ok
        ? "generated"
        : (diagnostics.length ? "blocked" : "pending");
    const activeRouteFamily = routeFamily
        || output.generationRoute
        || output.outputKind
        || "";
    const surfaceEngineContract = buildNuclearClauseSurfaceEngineContract({
        routeFamily: activeRouteFamily,
        routeStage,
    });
    const sourceEvidence = resolveGrammarFrameSourceEvidence(output, override);
    const activeNuclearShell = nuclearClauseShell || output.nuclearClauseShell || null;
    const activeCnvFormulaSurfacePath = cnvFormulaSurfacePath || output.cnvFormulaSurfacePath || null;
    const activeSlotNameBridge = output.slotNameBridge
        || (typeof buildNuclearClauseSurfaceSlotNameBridge === "function"
            ? buildNuclearClauseSurfaceSlotNameBridge(posicionesFormula)
            : null);
    const formulaSlots = activeNuclearShell?.formulaSlots || output.formulaSlots || null;
    const formulaEcho = activeNuclearShell?.formulaEcho || output.formulaEcho || "";
    const outputOrthographyFrame = output.orthographyFrame && typeof output.orthographyFrame === "object"
        ? output.orthographyFrame
        : null;
    const functionUseValenceGate = output.functionUseValenceGate && typeof output.functionUseValenceGate === "object"
        ? output.functionUseValenceGate
        : null;
    const soundSpellingFrames = collectNuclearClauseSurfaceSoundSpellingFrames(
        output.soundSpellingFrames,
        outputOrthographyFrame,
        output.targetContract
    );
    const adjectivalFunctionFrame = output.adjectivalNncFunctionFrame
        && typeof output.adjectivalNncFunctionFrame === "object"
        ? output.adjectivalNncFunctionFrame
        : {};
    const frameSourceInput = resolveNuclearClauseSurfaceFrameSourceInput({
        result: output,
        renderVerb,
        verb,
    });
    const activeEntradaGrammarObject = entradaGrammarObject && typeof entradaGrammarObject === "object"
        ? entradaGrammarObject
        : (output.entradaGrammarObject && typeof output.entradaGrammarObject === "object" ? output.entradaGrammarObject : null);
    const sourceRouteFrame = resolveNuclearClauseSurfaceSourceRouteFrame(output);
    const sourceRouteObjectSlotOwnership = sourceRouteFrame?.objectSlotOwnership
        && typeof sourceRouteFrame.objectSlotOwnership === "object"
        ? sourceRouteFrame.objectSlotOwnership
        : null;
    const andrewsRouteActionContract = typeof buildAndrewsCnvCnnBackAndForthRouteActionContract === "function"
        ? buildAndrewsCnvCnnBackAndForthRouteActionContract({
            ...output,
            routeFamily: activeRouteFamily,
            routeStage,
            grammarFrame: output.grammarFrame || null,
            entradaGrammarObject: activeEntradaGrammarObject,
        }, {
            generationAllowed: ok,
            diagnosticOnly: !ok,
        })
        : null;
    const activeCnvFormulaSurfacePathWithRoute = andrewsRouteActionContract
        ? {
            ...(activeCnvFormulaSurfacePath && typeof activeCnvFormulaSurfacePath === "object"
                ? activeCnvFormulaSurfacePath
                : { kind: "andrews-route-formula-surface-path", paths: [] }),
            andrewsRouteRecordId: andrewsRouteActionContract.routeRecordId,
            andrewsRouteObstacleGateIds: Array.from(andrewsRouteActionContract.obstacleGateIds || []),
            andrewsRouteActionContract,
        }
        : activeCnvFormulaSurfacePath;
    const routeContract = typeof buildGrammarRouteContractFrame === "function"
        ? buildGrammarRouteContractFrame({
            routeFamily: activeRouteFamily,
            routeStage,
            sourceContract: {
                andrewsRouteRecordId: andrewsRouteActionContract?.routeRecordId || "",
                andrewsRouteTransition: andrewsRouteActionContract?.transition || "",
                andrewsRouteSourceUnit: andrewsRouteActionContract?.sourceUnit || "",
                andrewsRouteObstacleGateIds: Array.from(andrewsRouteActionContract?.obstacleGateIds || []),
                andrewsRouteActionContract,
                unitKind,
                tenseMode: resolvedTenseMode,
                tense,
                sourceEvidence,
                sourceRouteFamily: sourceEvidence?.sourceRouteFamily || "",
                sourceRouteStage: sourceEvidence?.sourceRouteStage || "",
                sourceOutputKind: sourceEvidence?.sourceOutputKind || "",
                sourceSurface: sourceEvidence?.sourceSurface || "",
                sourceCategory: adjectivalFunctionFrame.sourceCategory || "",
                sourceClauseKind: adjectivalFunctionFrame.sourceClauseKind || output.clauseKind || "",
                sourceVerb: adjectivalFunctionFrame.sourceVerb || "",
                sourceTenseValue: adjectivalFunctionFrame.sourceTenseValue || "",
                sourceCombinedMode: adjectivalFunctionFrame.sourceCombinedMode || "",
                sourceVoiceMode: adjectivalFunctionFrame.sourceVoiceMode || "",
                functionUseValenceGate,
                entradaGrammarObject: activeEntradaGrammarObject,
                sourceRouteFrame,
                routeFrame: sourceRouteFrame,
            },
            targetContract: {
                andrewsRouteRecordId: andrewsRouteActionContract?.routeRecordId || "",
                andrewsRouteTransition: andrewsRouteActionContract?.transition || "",
                andrewsRouteTargetUnit: andrewsRouteActionContract?.targetUnit || "",
                outputKind: output.outputKind || "",
                generationRoute: output.generationRoute || activeRouteFamily,
                surfaceEngineContract,
                functionUseValenceGate,
                sourceRouteFrame,
                routeFrame: sourceRouteFrame,
            },
            generationAllowed: ok,
            blockingDiagnostics: ok ? [] : diagnostics,
        })
        : null;
    const resultFrame = typeof buildGrammarResultFrame === "function"
        ? {
            ...buildGrammarResultFrame({
            ok,
            surface,
            surfaceForms,
            outputKind: output.outputKind || "",
            generationRoute: output.generationRoute || activeRouteFamily,
            sourceInput: frameSourceInput,
            provenance: output.stemProvenance || output.provenance || null,
            continuation: output.continuation || null,
            }),
            surfaceOutputIsGrammarSource: false,
            nuclearClauseIsWord: false,
        }
        : null;
    const diagnosticFrame = typeof buildGrammarDiagnosticFrame === "function"
        ? buildGrammarDiagnosticFrame({
            status: ok ? "generated" : evidenceStatus,
            diagnostics,
            blockers: ok ? [] : diagnostics,
        })
        : null;
    const authorityFrame = typeof buildGrammarAuthorityFrame === "function"
        ? buildGrammarAuthorityFrame({
            sourceEvidence,
            evidenceStatus,
            andrewsRefs: collectGrammarFrameAndrewsRefs(output, override),
            supported: ok,
        })
        : null;
    return buildGrammarFrame({
        authorityFrame,
        unitFrame: {
            unitKind,
            tenseMode: resolvedTenseMode,
            outputKind: output.outputKind || "",
            generationRoute: output.generationRoute || activeRouteFamily,
        },
        orthographyFrame: {
            surface,
            surfaceForms,
            soundSpellingFrames,
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
        },
        morphBoundaryFrame: {
            formulaSlots,
            formulaEcho: String(formulaEcho || ""),
            cnvFormulaSurfacePath: activeCnvFormulaSurfacePathWithRoute,
            andrewsRouteActionContract,
            sourceRouteFrame,
            routeFrame: sourceRouteFrame,
            formulaSlotIsLiteralSpelling: false,
            invariants: surfaceEngineContract.invariants,
        },
        stemFrame: {
            stem: normalizeNuclearClauseSurfaceContractSurface(output.stem) || frameSourceInput,
            sourceStem: String(output.sourceStem || output.stemProvenance?.sourceStem || ""),
            stemProvenance: output.stemProvenance || null,
            verbstemClassProfile: output.verbstemClassProfile || output.stemProvenance?.verbstemClassProfile || null,
            stemIsWholeOutput: false,
            affixIsStem: false,
            derivationScope: surfaceEngineContract.derivationScope,
            sourceRouteFrame,
            routeFrame: sourceRouteFrame,
        },
        nuclearClauseFrame: activeNuclearShell,
        participantFrame: {
            posicionesFormula: posicionesFormula && typeof posicionesFormula === "object" ? { ...posicionesFormula } : null,
            slotNameBridge: activeSlotNameBridge,
            pers1Pers2: {
                prefix: String(pers1 || ""),
                suffix: String(pers2 || ""),
            },
            obj1: {
                prefix: String(obj1 || ""),
            },
            poseedor: {
                prefix: String(poseedor || ""),
            },
            valenceFrame: vncValencyFrame || output.vncValencyFrame || null,
            sourceRouteFrame,
            routeFrame: sourceRouteFrame,
            objectSlotOwnership: sourceRouteObjectSlotOwnership,
            routeFrameLicensesObjectSlotOwnership: sourceRouteFrame?.routeFrameLicensesObjectSlotOwnership === true,
            finalFormulaShapeDoesNotLicenseObjectSlots: sourceRouteFrame?.finalFormulaShapeDoesNotLicenseObjectSlots === true,
            functionUseDoesNotLicenseObjectSlots: sourceRouteFrame?.functionUseDoesNotLicenseObjectSlots === true,
        },
        inflectionFrame: {
            tenseMode: resolvedTenseMode,
            tiempo: tense,
            tense,
            derivationMode: resolvedDerivationMode,
            derivationType: resolvedDerivationType,
            voiceMode: resolvedVoiceMode,
            state: output.state || "",
            sourceTenseValue: adjectivalFunctionFrame.sourceTenseValue || "",
            sourceCombinedMode: adjectivalFunctionFrame.sourceCombinedMode || "",
            sourceVoiceMode: adjectivalFunctionFrame.sourceVoiceMode || "",
            inflectionScope: surfaceEngineContract.inflectionScope,
            inflectionInsideStem: false,
        },
        routeContract,
        astFrame: resolveGrammarFrameAstFrame(output),
        resultFrame,
        diagnosticFrame,
    });
}

function buildNuclearClauseSurfaceResultContract(resultPayload = null, grammarFrame = null) {
    if (typeof buildGrammarResultContract === "function") {
        return buildGrammarResultContract({
            result: resultPayload,
            grammarFrame,
        });
    }
    const surface = resolveNuclearClauseSurfaceContractSurface(resultPayload);
    return {
        ok: Boolean(surface) && resultPayload?.error !== true && resultPayload?.supported !== false,
        surface,
        frames: grammarFrame,
        diagnostics: Array.isArray(resultPayload?.diagnostics) ? resultPayload.diagnostics : [],
    };
}

function stripGeneratedVncFormulaTenseSuffix(stem = "", tense = "", sourceSubjectSuffix = "") {
    const value = String(stem || "");
    if (!value) {
        return "";
    }
    const suffixes = [];
    const rules = typeof TENSE_SUFFIX_RULES === "object" && TENSE_SUFFIX_RULES
        ? TENSE_SUFFIX_RULES[String(tense || "")]
        : null;
    const sourceSuffix = String(sourceSubjectSuffix || "");
    if (rules && Object.prototype.hasOwnProperty.call(rules, sourceSuffix)) {
        suffixes.push(String(rules[sourceSuffix] || ""));
    }
    if (String(tense || "") === "preterito") {
        suffixes.push(sourceSuffix === "t" ? "ket" : "k");
        suffixes.push("k");
    }
    const suffix = suffixes
        .filter(Boolean)
        .sort((left, right) => right.length - left.length)
        .find((candidate) => value.length > candidate.length && value.endsWith(candidate));
    return suffix ? value.slice(0, -suffix.length) : value;
}

function resolveGeneratedVncFormulaPers1BeforeInflection({
    tense = "",
    inputPers1 = "",
    appliedMorphology = null,
    formulaStem = "",
    hasFormulaValenceBeforeStem = false,
} = {}) {
    const pers1 = String(inputPers1 || "");
    if (
        String(tense || "") === "optativo"
        && (pers1 === "ti" || pers1 === "an")
        && (
            appliedMorphology?.pers1 === "shi"
            || appliedMorphology?.subjectPrefix === "shi"
        )
    ) {
        return "shi";
    }
    if (!hasFormulaValenceBeforeStem && String(formulaStem || "").startsWith("i")) {
        if (pers1 === "ni") {
            return "n";
        }
        if (pers1 === "ti") {
            return "t";
        }
    }
    if (
        !hasFormulaValenceBeforeStem
        &&
        VOWEL_START_RE.test(String(formulaStem || ""))
        && pers1.endsWith("n")
        && !pers1.endsWith("nh")
        && pers1.length >= 2
        && VOWEL_RE.test(pers1[pers1.length - 2] || "")
    ) {
        return `${pers1}h`;
    }
    return pers1;
}

function attachNuclearClauseSurfaceContractProperties(resultPayload = null, resultContract = null, grammarFrame = null, {
    enumerable = false,
} = {}) {
    if (!resultPayload || typeof resultPayload !== "object") {
        return resultPayload;
    }
    const contract = resultContract || buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
    const surfaceEngineContract = grammarFrame?.routeContract?.targetContract?.surfaceEngineContract
        || buildNuclearClauseSurfaceEngineContract();
    Object.defineProperties(resultPayload, {
        surfaceEngineContract: {
            configurable: true,
            enumerable,
            writable: true,
            value: surfaceEngineContract,
        },
        grammarFrame: {
            configurable: true,
            enumerable,
            writable: true,
            value: grammarFrame,
        },
        ok: {
            configurable: true,
            enumerable,
            writable: true,
            value: contract.ok,
        },
        surface: {
            configurable: true,
            enumerable,
            writable: true,
            value: contract.surface,
        },
        frames: {
            configurable: true,
            enumerable,
            writable: true,
            value: contract.frames,
        },
    });
    if (!Object.prototype.hasOwnProperty.call(resultPayload, "diagnostics")) {
        Object.defineProperty(resultPayload, "diagnostics", {
            configurable: true,
            enumerable,
            writable: true,
            value: contract.diagnostics,
        });
    }
    return resultPayload;
}

function buildNuclearClauseSurfaceBlockedResult({
    result = null,
    message = GENERATE_WORD_NO_OUTPUT_MESSAGE,
    diagnosticId = NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID,
    routeFamily = NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
    routeStage = "validate",
    resultMarker = "—",
    override = null,
    resolvedTenseMode = "",
    tense = "",
    pers1 = "",
    pers2 = "",
    obj1 = "",
    poseedor = "",
    posicionesFormula = null,
    verb = "",
    renderVerb = "",
    entradaGrammarObject = null,
    isReflexive = false,
    resolvedDerivationMode = "",
    resolvedDerivationType = "",
    resolvedVoiceMode = "",
    nuclearClauseShell = null,
    vncValencyFrame = null,
    enumerableContract = false,
} = {}) {
    const resultPayload = result && typeof result === "object" ? result : {};
    if (resultMarker !== null && !Object.prototype.hasOwnProperty.call(resultPayload, "result")) {
        resultPayload.result = resultMarker;
    }
    if (resultMarker !== null && !Object.prototype.hasOwnProperty.call(resultPayload, "surfaceForms")) {
        resultPayload.surfaceForms = [];
    }
    if (!Object.prototype.hasOwnProperty.call(resultPayload, "error")) {
        resultPayload.error = true;
    }
    if (!Object.prototype.hasOwnProperty.call(resultPayload, "isReflexive")) {
        resultPayload.isReflexive = isReflexive;
    }
    if (!Object.prototype.hasOwnProperty.call(resultPayload, "posicionesFormula")) {
        resultPayload.posicionesFormula = posicionesFormula && typeof posicionesFormula === "object" ? { ...posicionesFormula } : null;
    }
    if (entradaGrammarObject && !Object.prototype.hasOwnProperty.call(resultPayload, "entradaGrammarObject")) {
        resultPayload.entradaGrammarObject = entradaGrammarObject;
    }
    const failedLayerContract = getNuclearClauseSurfaceFailedLayerContract(routeStage);
    const fallbackDiagnostic = buildNuclearClauseSurfaceDiagnosticEntry({
        id: diagnosticId,
        message,
        ...failedLayerContract,
        routeFamily,
        routeStage,
    });
    resultPayload.diagnostics = normalizeNuclearClauseSurfaceDiagnosticEntries(
        resultPayload.diagnostics,
        fallbackDiagnostic
    );
    const grammarFrame = buildNuclearClauseSurfaceGrammarFrame({
        result: resultPayload,
        override,
        resolvedTenseMode,
        tense,
        routeFamily,
        routeStage,
        unitKind: resolveNuclearClauseSurfaceUnitKind(resolvedTenseMode, tense),
        pers1,
        pers2,
        obj1,
        poseedor,
        posicionesFormula,
        verb,
        renderVerb,
        entradaGrammarObject,
        nuclearClauseShell,
        vncValencyFrame,
        resolvedDerivationMode,
        resolvedDerivationType,
        resolvedVoiceMode,
    });
    const resultContract = buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
    return attachNuclearClauseSurfaceContractProperties(resultPayload, resultContract, grammarFrame, {
        enumerable: enumerableContract,
    });
}

function resolveGenerateWordUiHook(uiHooks = null, key = "") {
    return resolveNuclearClauseSurfaceUiHook(uiHooks, key);
}

function normalizeGenerateWordContractSurface(value = "") {
    return normalizeNuclearClauseSurfaceContractSurface(value);
}

function splitGenerateWordContractSurfaceText(value = "") {
    return splitNuclearClauseSurfaceContractText(value);
}

function getGenerateWordResultFrame(result = null) {
    return getNuclearClauseSurfaceResultFrame(result);
}

function getGenerateWordResultFramePayload(result = null) {
    return getNuclearClauseSurfaceResultFramePayload(result);
}

function resolveGenerateWordContractSurface(result = null) {
    return resolveNuclearClauseSurfaceContractSurface(result);
}

function resolveGenerateWordResultFrameSurface(result = null) {
    return resolveNuclearClauseSurfaceResultFrameSurface(result);
}

function resolveGenerateWordNominalConnectorSurface(connector = null, fallbackSurface = "") {
    return resolveNuclearClauseSurfaceNominalConnectorSurface(connector, fallbackSurface);
}

function resolveGenerateWordNominalConnectorDisplaySurface(connector = null, fallbackSurface = "") {
    return resolveNuclearClauseSurfaceNominalConnectorDisplaySurface(connector, fallbackSurface);
}

function resolveGenerateWordFrameSourceInput(options = {}) {
    return resolveNuclearClauseSurfaceFrameSourceInput(options);
}

function buildGenerateWordDiagnosticEntry(options = {}) {
    return buildNuclearClauseSurfaceDiagnosticEntry(options);
}

function getGenerateWordFailedLayerContract(routeStage = "") {
    return getNuclearClauseSurfaceFailedLayerContract(routeStage);
}

function normalizeGenerateWordDiagnosticEntries(diagnostics = [], fallbackDiagnostic = null) {
    return normalizeNuclearClauseSurfaceDiagnosticEntries(diagnostics, fallbackDiagnostic);
}

function resolveGenerateWordUnitKind(resolvedTenseMode = "", tense = "") {
    return resolveNuclearClauseSurfaceUnitKind(resolvedTenseMode, tense);
}

function isGenerateWordGrammarFrameCandidate(value = null) {
    return isNuclearClauseSurfaceGrammarFrameCandidate(value);
}

function getGenerateWordOverrideSourceGrammarFrame(override = null) {
    return getNuclearClauseSurfaceOverrideSourceGrammarFrame(override);
}

function getGenerateWordSourceEvidenceBoundaries(value = null) {
    return getNuclearClauseSurfaceSourceEvidenceBoundaries(value);
}

function mergeGenerateWordSourceEvidence(primary = null, fallback = null) {
    return mergeNuclearClauseSurfaceSourceEvidence(primary, fallback);
}

function buildGenerateWordOverrideSourceEvidence(override = null) {
    return buildNuclearClauseSurfaceOverrideSourceEvidence(override);
}

function buildGenerateWordGrammarFrame(options = {}) {
    return buildNuclearClauseSurfaceGrammarFrame(options);
}

function buildGenerateWordResultContract(resultPayload = null, grammarFrame = null) {
    return buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
}

function attachGenerateWordContractProperties(resultPayload = null, resultContract = null, grammarFrame = null, options = {}) {
    return attachNuclearClauseSurfaceContractProperties(resultPayload, resultContract, grammarFrame, options);
}

function buildGenerateWordBlockedResult(options = {}) {
    return buildNuclearClauseSurfaceBlockedResult(options);
}

function executeAdjectivalNncGenerationRoute({
    override = null,
    verb = "",
    pers1 = "",
    pers2 = "",
    obj1 = "",
} = {}) {
    const adjectivalNnc = getAdjectivalNncGenerationOptions(override);
    const entradaGrammarObject = adjectivalNnc.entradaGrammarObject && typeof adjectivalNnc.entradaGrammarObject === "object"
        ? adjectivalNnc.entradaGrammarObject
        : (adjectivalNnc.entryRouteContract?.entradaGrammarObject || null);
    const functionUseValenceGate = buildFunctionUseValenceObjectHardGate({
        override,
        entradaGrammarObject,
        posicionesFormula: {
            ...(override?.posicionesFormula && typeof override.posicionesFormula === "object" ? override.posicionesFormula : {}),
            obj1,
        },
        currentVectorOwnsValenceObjectSlots: false,
    });
    if (functionUseValenceGate.status === "blocked") {
        return buildNuclearClauseSurfaceBlockedResult({
            result: {
                outputKind: "adjectival-nnc-function",
                generationRoute: "adjectival-nnc",
                clauseKind: "nominal-nuclear-clause",
                result: "—",
                surfaceForms: [],
                error: true,
                supported: false,
                functionUseValenceGate,
                entradaGrammarObject,
            },
            message: "La función no puede consumir, crear, mover ni reclasificar objeto/valencia antes de fijar el marco de valencia.",
            diagnosticId: functionUseValenceGate.diagnosticId,
            routeFamily: "adjectival-nnc",
            routeStage: functionUseValenceGate.routeStage,
            resultMarker: "—",
            override,
            resolvedTenseMode: TENSE_MODE.adjetivo,
            tense: "adjectival-nnc",
            pers1,
            pers2,
            obj1,
            posicionesFormula: override?.posicionesFormula || null,
            verb,
            renderVerb: verb,
            entradaGrammarObject,
            enumerableContract: false,
        });
    }
    const adjectivalPers1 = adjectivalNnc.pers1 ?? pers1;
    const adjectivalPers2 = adjectivalNnc.pers2 ?? adjectivalNnc.num2 ?? pers2;
    const adjectivalObj1 = adjectivalNnc.obj1 ?? obj1;
    const shouldUseIntensifiedRoute = typeof shouldGenerateIntensifiedAdjectivalNnc === "function"
        && shouldGenerateIntensifiedAdjectivalNnc(adjectivalNnc);
    const shouldUseVncRoute = typeof shouldGenerateVncAdjectivalNnc === "function"
        && shouldGenerateVncAdjectivalNnc(adjectivalNnc);
    const shouldUseCompoundSourceRoute = typeof shouldGenerateCompoundSourceAdjectivalNnc === "function"
        && shouldGenerateCompoundSourceAdjectivalNnc(adjectivalNnc);
    const shouldUseDenominalCompoundRoute = typeof shouldGenerateDenominalCompoundAdjectivalNnc === "function"
        && shouldGenerateDenominalCompoundAdjectivalNnc(adjectivalNnc);
    const shouldUsePatientiveRoute = typeof shouldGeneratePatientiveAdjectivalNnc === "function"
        && shouldGeneratePatientiveAdjectivalNnc(adjectivalNnc);
    const shouldUseNominalizedVncRoute = typeof shouldGenerateNominalizedVncAdjectivalNnc === "function"
        && shouldGenerateNominalizedVncAdjectivalNnc(adjectivalNnc);
    const shouldUseRootPlusYaRoute = typeof shouldGenerateRootPlusYaAdjectivalNnc === "function"
        && shouldGenerateRootPlusYaAdjectivalNnc(adjectivalNnc);
    const shouldUseOrdinaryAbsolutiveRoute = String(adjectivalNnc.formation || "").trim() === "ordinary-absolutive";
    const result = shouldUseIntensifiedRoute && typeof buildIntensifiedAdjectivalNncOutput === "function"
        ? buildIntensifiedAdjectivalNncOutput({
            sourceSurface: resolveAdjectivalNncGenerationSurface(
                adjectivalNnc,
                ["sourceSurface", "surface", "stem"],
                verb
            ),
            sourceFormulaSlots: adjectivalNnc.sourceFormulaSlots || adjectivalNnc.formulaSlots || null,
            sourceFormulaEcho: adjectivalNnc.sourceFormulaEcho || adjectivalNnc.formulaEcho || "",
            role: adjectivalNnc.role ?? "predicate-surface",
        })
        : shouldUseVncRoute && typeof buildVncAdjectivalNncFunctionOutput === "function"
        ? buildVncAdjectivalNncFunctionOutput({
            vncSurface: resolveAdjectivalNncGenerationSurface(
                adjectivalNnc,
                ["vncSurface", "surface", "stem"],
                verb
            ),
            sourceVerb: adjectivalNnc.sourceVerb ?? verb,
            sourceTenseValue: adjectivalNnc.sourceTenseValue ?? adjectivalNnc.sourceTense ?? "",
            sourceCombinedMode: adjectivalNnc.sourceCombinedMode ?? "",
            sourceVoiceMode: adjectivalNnc.sourceVoiceMode ?? "",
            sourceFormulaSlots: adjectivalNnc.sourceFormulaSlots || adjectivalNnc.formulaSlots || null,
            sourceFormulaEcho: adjectivalNnc.sourceFormulaEcho || adjectivalNnc.formulaEcho || "",
            role: adjectivalNnc.role ?? "predicate-surface",
        })
        : shouldUseCompoundSourceRoute && typeof buildCompoundSourceAdjectivalNncFunctionOutput === "function"
        ? buildCompoundSourceAdjectivalNncFunctionOutput({
            compoundSourceSurface: resolveAdjectivalNncGenerationSurface(
                adjectivalNnc,
                ["compoundSourceSurface", "nominalizedSurface", "surface", "stem"],
                verb
            ),
            state: adjectivalNnc.state ?? "absolutive",
            sourceCompoundFrame: adjectivalNnc.sourceCompoundFrame || adjectivalNnc.compoundFrame || null,
            nominalizationKind: adjectivalNnc.nominalizedVncKind
                || adjectivalNnc.nominalizationProfile?.role?.nominalizationKind
                || "",
            nominalizationProfile: adjectivalNnc.nominalizationProfile || null,
            formulaSlots: adjectivalNnc.sourceFormulaSlots || adjectivalNnc.formulaSlots || null,
            formulaEcho: adjectivalNnc.sourceFormulaEcho || adjectivalNnc.formulaEcho || "",
            role: adjectivalNnc.role ?? "predicate-surface",
        })
        : shouldUseDenominalCompoundRoute && typeof buildDenominalCompoundAdjectivalNncFunctionOutput === "function"
        ? buildDenominalCompoundAdjectivalNncFunctionOutput({
            denominalCompoundSurface: resolveAdjectivalNncGenerationSurface(
                adjectivalNnc,
                ["denominalCompoundSurface", "nominalizedSurface", "surface", "stem"],
                verb
            ),
            state: adjectivalNnc.state ?? "absolutive",
            sourceDenominalCompoundFrame: adjectivalNnc.sourceDenominalCompoundFrame
                || adjectivalNnc.denominalCompoundFrame
                || null,
            formulaSlots: adjectivalNnc.sourceFormulaSlots || adjectivalNnc.formulaSlots || null,
            formulaEcho: adjectivalNnc.sourceFormulaEcho || adjectivalNnc.formulaEcho || "",
            role: adjectivalNnc.role ?? "predicate-surface",
        })
        : shouldUseNominalizedVncRoute && typeof buildNominalizedVncAdjectivalNncFunctionOutput === "function"
        ? buildNominalizedVncAdjectivalNncFunctionOutput({
            nominalizedSurface: resolveAdjectivalNncGenerationSurface(
                adjectivalNnc,
                ["nominalizedSurface", "surface", "stem"],
                verb
            ),
            state: adjectivalNnc.state ?? "absolutive",
            nominalizationProfile: adjectivalNnc.nominalizationProfile || null,
            formulaSlots: adjectivalNnc.formulaSlots || null,
            formulaEcho: adjectivalNnc.formulaEcho || "",
            role: adjectivalNnc.role ?? "predicate-surface",
        })
        : shouldUsePatientiveRoute && typeof buildPatientivoAdjectivalNncFunctionOutput === "function"
        ? buildPatientivoAdjectivalNncFunctionOutput({
            patientivoSurface: resolveAdjectivalNncGenerationSurface(
                adjectivalNnc,
                ["patientivoSurface", "surface", "stem"],
                verb
            ),
            state: adjectivalNnc.state ?? "absolutive",
            patientivoSource: adjectivalNnc.patientivoSource ?? "",
            sourceTenseValue: adjectivalNnc.sourceTenseValue ?? adjectivalNnc.sourceTense ?? "",
            sourceCombinedMode: adjectivalNnc.sourceCombinedMode ?? "",
            nominalizationProfile: adjectivalNnc.nominalizationProfile || null,
            formulaSlots: adjectivalNnc.formulaSlots || null,
            formulaEcho: adjectivalNnc.formulaEcho || "",
            role: adjectivalNnc.role ?? "predicate-surface",
        })
        : shouldUseOrdinaryAbsolutiveRoute && typeof generateAdjectivalNncFunctionOutput === "function"
        ? generateAdjectivalNncFunctionOutput({
            stem: String(
                adjectivalNnc.sourceStem
                || adjectivalNnc.predicateStem
                || adjectivalNnc.stem
                || verb
                || ""
            ).trim(),
            state: adjectivalNnc.state ?? "absolutive",
            subject: {
                subjectPrefix: adjectivalPers1,
                subjectSuffix: adjectivalPers2,
                personSubKey: adjectivalNnc.subjectKey ?? adjectivalNnc.personSubKey ?? "",
            },
            number: adjectivalNnc.number ?? "singular",
            pluralType: adjectivalNnc.pluralType ?? "auto",
            nounClass: adjectivalNnc.nounClass ?? "",
            animacy: adjectivalNnc.animacy ?? "",
            role: adjectivalNnc.role ?? "modifier-candidate",
        })
        : shouldUseRootPlusYaRoute && typeof generateRootPlusYaAdjectivalNncOutput === "function"
        ? generateRootPlusYaAdjectivalNncOutput({
            stem: resolveAdjectivalNncGenerationSurface(adjectivalNnc, ["stem", "surface"], verb),
            state: adjectivalNnc.state ?? "absolutive",
            subject: {
                subjectPrefix: adjectivalPers1,
                subjectSuffix: adjectivalPers2,
                personSubKey: adjectivalNnc.subjectKey ?? adjectivalNnc.personSubKey ?? "",
            },
            role: adjectivalNnc.role ?? "predicate-surface",
        })
        : typeof generateAdjectivalNncFunctionOutput === "function"
        ? generateAdjectivalNncFunctionOutput({
            stem: resolveAdjectivalNncGenerationSurface(adjectivalNnc, ["stem", "surface"], verb),
            state: adjectivalNnc.state ?? "absolutive",
            subject: {
                subjectPrefix: adjectivalPers1,
                subjectSuffix: adjectivalPers2,
                personSubKey: adjectivalNnc.subjectKey ?? adjectivalNnc.personSubKey ?? "",
            },
            number: adjectivalNnc.number ?? "singular",
            pluralType: adjectivalNnc.pluralType ?? "auto",
            nounClass: adjectivalNnc.nounClass ?? "",
            animacy: adjectivalNnc.animacy ?? "",
            role: adjectivalNnc.role ?? "modifier-candidate",
        })
        : {
            outputKind: "adjectival-nnc-function",
            clauseKind: "nominal-nuclear-clause",
            supported: false,
            result: "",
            surfaceForms: [],
            stem: String(adjectivalNnc.stem ?? verb ?? ""),
            state: adjectivalNnc.state ?? "absolutive",
            generationRoute: "adjectival-nnc",
            diagnostics: [{
                id: "adjectival-nnc-unavailable",
                severity: "error",
                message: "Adjectival NNC function generation is unavailable.",
            }],
        };
    const resultClauseKind = result.clauseKind || "nominal-nuclear-clause";
    const isVerbalAdjectivalFunction = resultClauseKind === "verbal-nuclear-clause";
    const nuclearClauseShell = typeof buildNuclearClauseShellMetadata === "function"
        ? buildNuclearClauseShellMetadata({
            clauseKind: resultClauseKind,
            formulaSlots: result.adjectivalNncFunctionFrame?.sourceFormulaSlots
                || result.nncBasic?.formulaSlots
                || result.clauseFrame?.formulaSlots
                || null,
            formulaEcho: result.adjectivalNncFunctionFrame?.sourceFormulaEcho
                || result.nncBasic?.formulaEcho
                || result.clauseFrame?.formulaEcho
                || "",
            subject: {
                subjectPrefix: adjectivalPers1,
                subjectSuffix: adjectivalPers2,
            },
            object: {
                objectPrefix: adjectivalObj1,
            },
            predicate: {
                stem: result.stem || adjectivalNnc.stem || verb,
                state: result.state || (isVerbalAdjectivalFunction ? "" : "absolutive"),
            },
            predicateState: result.state || (isVerbalAdjectivalFunction ? "" : "absolutive"),
            tenseValue: isVerbalAdjectivalFunction
                ? (adjectivalNnc.sourceTenseValue ?? adjectivalNnc.sourceTense ?? result.tense ?? "")
                : "",
        })
        : null;
    const sentenceLayer = typeof buildGeneratedSentenceLayerMetadata === "function"
        ? buildGeneratedSentenceLayerMetadata({
            override,
            tense: result.tense || adjectivalNnc.targetTense || "",
            nuclearClauseShell,
            clauseKind: resultClauseKind,
        })
        : null;
    const adjectivalSourceStem = String(
        result.sourceStem
        || result.adjectivalNncFunctionFrame?.sourceFormulaSlots?.predicateStem?.stem
        || result.adjectivalNncFunctionFrame?.sourcePredicateStem
        || ""
    ).trim();
    const resultPayload = {
        ...result,
        generationRoute: "adjectival-nnc",
        isReflexive: false,
        sourceStem: adjectivalSourceStem,
        stemProvenance: null,
        nuclearClauseShell,
        sentenceLayer,
        functionUseValenceGate,
        entradaGrammarObject,
    };
    const grammarFrame = buildNuclearClauseSurfaceGrammarFrame({
        result: resultPayload,
        override,
        resolvedTenseMode: TENSE_MODE.adjetivo,
        tense: result.tense || adjectivalNnc.targetTense || "adjectival-nnc",
        routeFamily: "adjectival-nnc",
        routeStage: "execute",
        unitKind: resultClauseKind === "verbal-nuclear-clause"
            ? "verbal-nuclear-clause"
            : "ordinary-nnc",
        pers1: adjectivalPers1,
        pers2: adjectivalPers2,
        obj1: adjectivalObj1,
        verb,
        renderVerb: resolveNuclearClauseSurfaceFrameSourceInput({
            result: resultPayload,
            verb: result.stem || verb,
        }),
        entradaGrammarObject,
        nuclearClauseShell,
    });
    const resultContract = buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
    const surfaceEngineContract = grammarFrame?.routeContract?.targetContract?.surfaceEngineContract || null;
    return {
        ...resultPayload,
        surfaceEngineContract,
        grammarFrame,
        ...resultContract,
    };
}

function executeOrdinaryNncGenerationRoute({
    override = null,
    verb = "",
    pers1 = "",
    pers2 = "",
    poseedor = "",
} = {}) {
    const ordinaryNnc = getOrdinaryNncGenerationOptions(override);
    const ordinaryPers1 = ordinaryNnc.pers1 ?? pers1;
    const ordinaryPers2 = ordinaryNnc.pers2 ?? ordinaryNnc.num2 ?? pers2;
    const possessor = ordinaryNnc.possessor ?? ordinaryNnc.possessivePrefix ?? poseedor;
    const state = ordinaryNnc.state ?? (possessor ? "possessive" : "absolutive");
    const result = typeof generateOrdinaryNncParadigm === "function"
        ? generateOrdinaryNncParadigm({
            stem: ordinaryNnc.stem ?? verb,
            state,
            subject: {
                subjectPrefix: ordinaryPers1,
                subjectSuffix: ordinaryPers2,
                personSubKey: ordinaryNnc.subjectKey ?? ordinaryNnc.personSubKey ?? "",
            },
            possessor,
            possessivePrefix: possessor,
            number: ordinaryNnc.number ?? "singular",
            pluralType: ordinaryNnc.pluralType ?? "auto",
            nounClass: ordinaryNnc.nounClass ?? "",
            animacy: ordinaryNnc.animacy ?? "",
            possessionKind: ordinaryNnc.possessionKind ?? "",
            stateCase: ordinaryNnc.stateCase ?? "",
            possessionType: ordinaryNnc.possessionType ?? "",
        })
        : {
            outputKind: "nominal-nuclear-clause",
            clauseKind: "nominal-nuclear-clause",
            supported: false,
            result: "",
            surfaceForms: [],
            stem: String(ordinaryNnc.stem ?? verb ?? ""),
            state,
            nounClass: "",
            animacy: "",
            number: ordinaryNnc.number ?? "singular",
            pluralType: ordinaryNnc.pluralType ?? "",
            subject: null,
            possessor: null,
            diagnostics: [{
                id: "ordinary-nnc-unavailable",
                severity: "error",
                message: "Ordinary NNC generation is unavailable.",
            }],
        };
    const nuclearClauseShell = typeof buildNuclearClauseShellMetadata === "function"
        ? buildNuclearClauseShellMetadata({
            clauseKind: "nominal-nuclear-clause",
            formulaSlots: result.formulaSlots || result.clauseFrame?.formulaSlots || null,
            formulaEcho: result.formulaEcho || result.clauseFrame?.formulaEcho || "",
            predicate: {
                stem: result.stem || ordinaryNnc.stem || verb,
                state: result.state || state,
            },
            predicateState: result.state || state,
        })
        : null;
    const sentenceLayer = typeof buildGeneratedSentenceLayerMetadata === "function"
        ? buildGeneratedSentenceLayerMetadata({
            override,
            tense: result.tense || ordinaryNnc.targetTense || "",
            nuclearClauseShell,
            clauseKind: "nominal-nuclear-clause",
        })
        : null;
    const resultPayload = {
        ...result,
        generationRoute: "ordinary-nnc",
        isReflexive: false,
        stemProvenance: null,
        nuclearClauseShell,
        sentenceLayer,
    };
    const grammarFrame = buildNuclearClauseSurfaceGrammarFrame({
        result: resultPayload,
        override,
        resolvedTenseMode: TENSE_MODE.sustantivo,
        tense: result.tense || ordinaryNnc.targetTense || "ordinary-nnc",
        routeFamily: "ordinary-nnc",
        routeStage: "execute",
        unitKind: "ordinary-nnc",
        pers1: ordinaryPers1,
        pers2: ordinaryPers2,
        poseedor: possessor,
        verb,
        renderVerb: resolveNuclearClauseSurfaceFrameSourceInput({
            result: resultPayload,
            verb: result.stem || verb,
        }),
        nuclearClauseShell,
    });
    const resultContract = buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
    const surfaceEngineContract = grammarFrame?.routeContract?.targetContract?.surfaceEngineContract || null;
    return {
        ...resultPayload,
        surfaceEngineContract,
        grammarFrame,
        ...resultContract,
    };
}

function executeRelationalNncGenerationRoute({
    override = null,
    verb = "",
    posicionesFormula = null,
    entradaGrammarObject = null,
} = {}) {
    const relationalNnc = getRelationalNncGenerationOptions(override);
    const hasExplicitRelationalSourceSlots = relationalNnc.sourceVerb != null
        || relationalNnc.sourceVerbstem != null
        || relationalNnc.sourceStem != null
        || relationalNnc.verbStem != null
        || relationalNnc.incorporatedNounStem != null
        || relationalNnc.incorporatedStem != null
        || relationalNnc.embeddedNounStem != null;
    const embeddedSource = relationalNnc.source
        ?? relationalNnc.sourceFormula
        ?? relationalNnc.embeddedSource
        ?? relationalNnc.embeddedSourceStem
        ?? (hasExplicitRelationalSourceSlots ? "" : verb);
    const sourceVerb = relationalNnc.sourceVerb
        ?? relationalNnc.sourceVerbstem
        ?? relationalNnc.sourceStem
        ?? relationalNnc.verbStem
        ?? (embeddedSource ? "" : verb);
    const result = typeof buildLesson46PreteritAgentiveLocativeNncFromSource === "function"
        ? buildLesson46PreteritAgentiveLocativeNncFromSource({
            source: embeddedSource,
            sourceVerb,
            incorporatedNounStem: relationalNnc.incorporatedNounStem
                ?? relationalNnc.incorporatedStem
                ?? relationalNnc.embeddedNounStem
                ?? "",
            evidenceSource: relationalNnc.evidenceSource || "",
        })
        : {
            kind: "lesson-46-3-1-a-preterit-agentive-locative-nnc",
            outputKind: "relational-nnc",
            clauseKind: "nominal-nuclear-clause",
            supported: false,
            generationAllowed: false,
            result: "—",
            surfaceForms: [],
            sourceVerb: String(sourceVerb || ""),
            incorporatedNounStem: String(relationalNnc.incorporatedNounStem || relationalNnc.incorporatedStem || ""),
            diagnostics: [{
                id: "relational-nnc-route-unavailable",
                severity: "error",
                message: "Relational NNC generation is unavailable.",
            }],
        };
    const nuclearClauseShell = typeof buildNuclearClauseShellMetadata === "function"
        ? buildNuclearClauseShellMetadata({
            clauseKind: "nominal-nuclear-clause",
            formulaSlots: result.formulaSlots || null,
            formulaEcho: result.formulaEcho || "",
            predicate: {
                stem: result.predicateStem || result.formulaStem || "",
                state: result.sourceState || "absolutive",
            },
            predicateState: result.sourceState || "absolutive",
        })
        : null;
    const resultPayload = {
        ...result,
        outputKind: "relational-nnc",
        clauseKind: "nominal-nuclear-clause",
        generationRoute: "relational-nnc",
        isReflexive: false,
        stem: result.predicateStem || result.formulaStem || "",
        state: result.sourceState || "absolutive",
        stemProvenance: null,
        nuclearClauseShell,
        relationalNncGenerationFrame: result,
        entradaGrammarObject,
        posicionesFormula,
    };
    const grammarFrame = buildNuclearClauseSurfaceGrammarFrame({
        result: resultPayload,
        override,
        resolvedTenseMode: TENSE_MODE.sustantivo,
        tense: result.routeStage || "relational-nnc",
        routeFamily: "relational-nnc",
        routeStage: result.routeStage || "execute",
        unitKind: "relational-nnc",
        posicionesFormula,
        verb: sourceVerb,
        renderVerb: result.sourceVerb || sourceVerb,
        entradaGrammarObject,
        nuclearClauseShell,
    });
    const resultContract = buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
    const surfaceEngineContract = grammarFrame?.routeContract?.targetContract?.surfaceEngineContract || null;
    return {
        ...resultPayload,
        surfaceEngineContract,
        grammarFrame,
        ...resultContract,
    };
}

function buildGeneratedNuclearClauseShellMetadata({
    resolvedTenseMode = "",
    tense = "",
    pers1 = "",
    pers2 = "",
    obj1 = "",
    obj2 = "",
    obj3 = "",
    isReflexive = false,
    verb = "",
    renderVerb = "",
    formulaPers1 = null,
    formulaPers2 = null,
    formulaObj1 = null,
    formulaObj2 = null,
    formulaObj3 = null,
    formulaReflexive = null,
    formulaDirectional = null,
    formulaVerb = "",
    formulaSubjectSuffix = "",
    formulaNumberConnector = null,
    nominalClauseMetadata = null,
} = {}) {
    if (typeof buildNuclearClauseShellMetadata !== "function") {
        return null;
    }
    const formalUnitKind = resolveNuclearClauseSurfaceUnitKind(resolvedTenseMode, tense);
    const isNominalShell = Boolean(nominalClauseMetadata?.nominalClauseFrame)
        || formalUnitKind === "nominal-nuclear-clause";
    if (isNominalShell) {
        const numberConnector = nominalClauseMetadata?.num1Num2
            || nominalClauseMetadata?.nominalClauseFrame?.subject?.numberConnector
            || null;
        const connectorSurface = numberConnector
            ? resolveNuclearClauseSurfaceNominalConnectorSurface(numberConnector, pers2)
            : normalizeNuclearClauseSurfaceContractSurface(pers2);
        const connectorDisplaySurface = numberConnector
            ? resolveNuclearClauseSurfaceNominalConnectorDisplaySurface(numberConnector, pers2)
            : normalizeNuclearClauseSurfaceContractSurface(pers2);
        const nominalPredicateStem = (() => {
            const stem = String(verb || renderVerb || "");
            const insideObjectPrefix = String(obj1 || "");
            if (!insideObjectPrefix || stem.startsWith(insideObjectPrefix)) {
                return stem;
            }
            return typeof buildOutputPrefixedChain === "function"
                ? buildOutputPrefixedChain({ obj1: insideObjectPrefix, tronco: stem })
                : `${insideObjectPrefix}${stem}`;
        })();
        return buildNuclearClauseShellMetadata({
            clauseKind: "nominal-nuclear-clause",
            formulaSlots: {
                pers1Pers2: {
                    slot: "pers1-pers2",
                    prefix: pers1,
                    suffix: "",
                },
                predicateStem: {
                    slot: "STEM",
                    stem: nominalPredicateStem,
                    state: nominalClauseMetadata?.nominalClauseFrame?.predicate?.state || "derived-nominal",
                    stateSlot: nominalClauseMetadata?.nominalClauseFrame?.predicate?.stateSlot || null,
                },
                num1Num2: {
                    slot: "num1-num2",
                    connector: connectorSurface,
                    displayConnector: connectorDisplaySurface || "Ø",
                    nounClass: numberConnector?.nounClass || "",
                },
            },
            predicateState: nominalClauseMetadata?.nominalClauseFrame?.predicate?.state || "derived-nominal",
        });
    }
    const verbalFormulaPers1 = formulaPers1 === null || formulaPers1 === undefined
        ? pers1
        : formulaPers1;
    const verbalFormulaPers2 = formulaPers2 === null || formulaPers2 === undefined
        ? formulaSubjectSuffix
        : formulaPers2;
    const verbalFormulaNumberConnector = formulaNumberConnector === null || formulaNumberConnector === undefined
        ? pers2
        : formulaNumberConnector;
    const verbalFormulaObj1 = formulaObj1 === null || formulaObj1 === undefined
        ? obj1
        : formulaObj1;
    const verbalFormulaObj2 = formulaObj2 === null || formulaObj2 === undefined
        ? obj2
        : formulaObj2;
    const verbalFormulaObj3 = formulaObj3 === null || formulaObj3 === undefined
        ? obj3
        : formulaObj3;
    const verbalFormulaReflexive = formulaReflexive === null || formulaReflexive === undefined
        ? (isReflexive ? "mu" : "")
        : formulaReflexive;
    const verbalFormulaObjectPrefix = String(verbalFormulaObj1 || "");
    const verbalFormulaReflexivePrefix = String(verbalFormulaReflexive || "");
    const shellFormulaObj1 = verbalFormulaObjectPrefix && verbalFormulaObjectPrefix === verbalFormulaReflexivePrefix
        ? ""
        : verbalFormulaObj1;
    const shell = buildNuclearClauseShellMetadata({
        clauseKind: "verbal-nuclear-clause",
        subject: {
            prefix: verbalFormulaPers1,
            suffix: verbalFormulaPers2,
            numberConnector: verbalFormulaNumberConnector,
        },
        object: {
            prefix: shellFormulaObj1,
            obj2: verbalFormulaObj2,
            obj3: verbalFormulaObj3,
            reflexivo: verbalFormulaReflexive,
        },
        directional: formulaDirectional,
        predicate: {
            stem: formulaVerb || renderVerb || verb,
        },
        tenseValue: tense,
        tenseLabel: tense,
    });
    const shellStem = String(formulaVerb || renderVerb || verb || "");
    const enrichLesson6Slot = (slotKey = "", prefix = "") => {
        const dyadFrame = getLesson6DirectNawatObjectDyadFrame(prefix, {
            stem: shellStem,
            pers1: verbalFormulaPers1,
        });
        if (!dyadFrame || !shell?.formulaSlots?.[slotKey]) {
            return;
        }
        shell.formulaSlots[slotKey].lesson6DirectNawatDyad = dyadFrame;
        shell.formulaSlots[slotKey].functionalSubslots = dyadFrame.formulaPosition === "va1-va2"
            ? {
                va1: dyadFrame.functionalVa1 || dyadFrame.va1 || "",
                va2: dyadFrame.functionalVa2 || dyadFrame.va2 || "",
                val1Features: dyadFrame.val1Features || null,
                val2Features: dyadFrame.val2Features || null,
                visibleLinearMorph: dyadFrame.visibleFormulaPrefix || "",
            }
            : null;
    };
    enrichLesson6Slot("obj1", shellFormulaObj1);
    enrichLesson6Slot("obj2", verbalFormulaObj2);
    enrichLesson6Slot("obj3", verbalFormulaObj3);
    enrichLesson6Slot("reflexivo", verbalFormulaReflexive);
    return shell;
}

function buildGeneratedVncValencyFrameMetadata({
    resolvedTenseMode = "",
    pers1 = "",
    pers2 = "",
    obj1 = "",
    obj1Base = "",
    obj2 = "",
    obj3 = "",
    parsedVerb = null,
    valencySummary = null,
    targetValency = null,
    isPassiveImpersonalMode = false,
    nuclearClauseShell = null,
} = {}) {
    if (resolvedTenseMode !== TENSE_MODE.verbo) {
        return null;
    }
    const normalizedObj1 = String(obj1 || "");
    const normalizedObj1Base = String(obj1Base || normalizedObj1 || "");
    const normalizedObj2 = String(obj2 || "");
    const normalizedObj3 = String(obj3 || "");
    const selectedObjectMarkers = [normalizedObj1, normalizedObj2, normalizedObj3].filter(Boolean);
    const baseObjectSlots = Number.isFinite(valencySummary?.baseObjectSlots)
        ? valencySummary.baseObjectSlots
        : (typeof getBaseObjectSlots === "function" ? getBaseObjectSlots(parsedVerb) : selectedObjectMarkers.length);
    const availableObjectSlots = Number.isFinite(valencySummary?.availableObjectSlots)
        ? valencySummary.availableObjectSlots
        : Math.max(0, baseObjectSlots);
    const resolvedTargetValency = Number.isFinite(targetValency)
        ? targetValency
        : Math.max(1, baseObjectSlots + 1);
    const subjectInfo = typeof getPers1Pers2Info === "function"
        ? getPers1Pers2Info(pers1, pers2)
        : null;
    const objectInfo = typeof getObj1PersonInfo === "function"
        ? getObj1PersonInfo(normalizedObj1)
        : null;
    const lesson6StemForDyad = String(
        nuclearClauseShell?.formulaSlots?.predicateStem?.stem
        || nuclearClauseShell?.formulaSlots?.predicateStem?.displayStem
        || parsedVerb?.verb
        || parsedVerb?.displayVerb
        || ""
    );
    const lesson6ObjectDyadFrame = getLesson6DirectNawatObjectDyadFrame(normalizedObj1Base || normalizedObj1, {
        stem: lesson6StemForDyad,
        pers1,
    });
    const lesson6ShellFormulaObjectPrefix = String(
        nuclearClauseShell?.formulaSlots?.reflexivo?.displayPrefix
        && nuclearClauseShell.formulaSlots.reflexivo.displayPrefix !== "Ø"
            ? nuclearClauseShell.formulaSlots.reflexivo.displayPrefix
            : (
                nuclearClauseShell?.formulaSlots?.obj1?.displayPrefix
                && nuclearClauseShell.formulaSlots.obj1.displayPrefix !== "Ø"
                    ? nuclearClauseShell.formulaSlots.obj1.displayPrefix
                    : ""
            )
    );
    const lesson6ResolvedObjectDyadFrame = lesson6ObjectDyadFrame
        ? {
            ...lesson6ObjectDyadFrame,
            visibleFormulaPrefix: lesson6ShellFormulaObjectPrefix || lesson6ObjectDyadFrame.visibleFormulaPrefix,
        }
        : null;
    const selectedValency = Math.max(1, 1 + selectedObjectMarkers.length);
    const isTransitiveFrame = baseObjectSlots > 0 || selectedObjectMarkers.length > 0 || resolvedTargetValency > 1;
    const pers1Pers2Slot = {
        slot: "pers1-pers2",
        functionRole: "subject",
        prefix: String(pers1 || ""),
        suffix: String(pers2 || ""),
        displayPrefix: String(pers1 || "") || "Ø",
        displaySuffix: String(pers2 || "") || "Ø",
        person: subjectInfo?.person ?? null,
        number: subjectInfo?.number || "",
    };
    const obj1Slot = {
        slot: "obj1",
        functionRole: "mainline-object",
        prefix: normalizedObj1,
        basePrefix: normalizedObj1Base,
        displayPrefix: normalizedObj1 || "Ø",
        displayBasePrefix: normalizedObj1Base || "Ø",
        person: objectInfo?.person ?? null,
        number: objectInfo?.number || "",
        isPresent: Boolean(normalizedObj1),
        lesson6DirectNawatDyad: lesson6ResolvedObjectDyadFrame,
        formulaPrefix: lesson6ResolvedObjectDyadFrame?.visibleFormulaPrefix || normalizedObj1,
        formulaPosition: lesson6ResolvedObjectDyadFrame?.formulaPosition || "",
        predicatePositionStatus: lesson6ResolvedObjectDyadFrame?.predicatePositionStatus || "",
        trajectory: lesson6ResolvedObjectDyadFrame?.trajectory || "",
        specificity: lesson6ResolvedObjectDyadFrame?.specificity || "",
        prominence: lesson6ResolvedObjectDyadFrame?.prominence || "",
    };
    const obj2Slot = {
        slot: "obj2",
        functionRole: "secondary-object",
        prefix: normalizedObj2,
        displayPrefix: normalizedObj2 || "Ø",
        isPresent: Boolean(normalizedObj2),
    };
    const obj3Slot = {
        slot: "obj3",
        functionRole: "tertiary-object",
        prefix: normalizedObj3,
        displayPrefix: normalizedObj3 || "Ø",
        isPresent: Boolean(normalizedObj3),
    };
    return {
        kind: "vnc-valency-frame",
        version: 1,
        lessonRange: "5-6",
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        sourceLayer: "valence-frame",
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        frameFixed: true,
        valenceFrameFixed: true,
        objectFrameFixed: true,
        fixedBy: "generated-nuclear-clause-surface",
        valency: isTransitiveFrame ? "transitive" : "intransitive",
        valencyLabel: isTransitiveFrame ? "transitiva" : "intransitiva",
        baseObjectSlots,
        availableObjectSlots,
        selectedObjectSlots: selectedObjectMarkers.length,
        selectedValency,
        targetValency: resolvedTargetValency,
        isPassiveImpersonalMode: Boolean(isPassiveImpersonalMode),
        pers1Pers2: pers1Pers2Slot,
        obj1: obj1Slot,
        obj2: obj2Slot,
        obj3: obj3Slot,
        objectSlotSequence: [obj1Slot, obj2Slot, obj3Slot],
        lesson6DirectNawatObject: lesson6ResolvedObjectDyadFrame,
        lesson6VisibleFormulaObjectPrefix: lesson6ResolvedObjectDyadFrame?.visibleFormulaPrefix || normalizedObj1 || "",
        lesson6ValencePosition: lesson6ResolvedObjectDyadFrame?.formulaPosition || "",
        nuclearClauseFormulaSlots: nuclearClauseShell?.formulaSlots || null,
        boundaries: {
            isSentenceEngine: false,
            isGenerationRule: false,
            changesSurfaceForms: false,
            objectLabelsAreNotEvidenceForSentenceObjects: true,
        },
    };
}

function buildGeneratedDerivedVoiceFrameMetadata({
    resolvedTenseMode = "",
    resolvedDerivationMode = "",
    resolvedVoiceMode = "",
    isNonactive = false,
    isPassiveImpersonalMode = false,
    sourceValency = null,
    targetValency = null,
    valencySummary = null,
    parsedVerb = null,
    verb = "",
    analysisVerb = "",
    pers1 = "",
    pers2 = "",
    obj1 = "",
    obj1Base = "",
    hasPromotableObject = false,
    preserveSubjectForPassive = false,
    allowPassiveObject = false,
} = {}) {
    if (resolvedTenseMode !== TENSE_MODE.verbo) {
        return null;
    }
    const hasImpersonalPrefix = parsedVerb?.hasImpersonalTaPrefix === true;
    if (!isNonactive && !isPassiveImpersonalMode && !hasImpersonalPrefix) {
        return null;
    }
    const normalizedObj1 = String(obj1 || "");
    const normalizedObj1Base = String(obj1Base || normalizedObj1 || "");
    const normalizedSourceValency = Number.isFinite(sourceValency)
        ? sourceValency
        : Math.max(1, (Number.isFinite(valencySummary?.baseObjectSlots) ? valencySummary.baseObjectSlots : 0) + 1);
    const normalizedTargetValency = Number.isFinite(targetValency)
        ? targetValency
        : normalizedSourceValency;
    const isImpersonalFrame = hasImpersonalPrefix || (isPassiveImpersonalMode && !hasPromotableObject);
    const voiceLabel = hasImpersonalPrefix
        ? "impersonal ta-"
        : (isPassiveImpersonalMode ? "pasivo/impersonal" : "no activo");
    return {
        kind: "derived-voice-frame",
        version: 1,
        lessonRange: "20-23",
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        derivation: {
            mode: String(resolvedDerivationMode || ""),
            isNonactive: Boolean(isNonactive),
            label: isNonactive ? "no activo" : "activo",
            finalStem: String(verb || ""),
            analysisStem: String(analysisVerb || verb || ""),
        },
        voice: {
            mode: String(resolvedVoiceMode || ""),
            label: voiceLabel,
            isPassiveImpersonalMode: Boolean(isPassiveImpersonalMode),
            isImpersonalFrame,
            hasImpersonalTaPrefix: hasImpersonalPrefix,
            hasPromotableObject: Boolean(hasPromotableObject),
            preserveSubjectForPassive: Boolean(preserveSubjectForPassive),
            allowPassiveObject: Boolean(allowPassiveObject),
        },
        valency: {
            sourceValency: normalizedSourceValency,
            targetValency: normalizedTargetValency,
            baseObjectSlots: Number.isFinite(valencySummary?.baseObjectSlots) ? valencySummary.baseObjectSlots : null,
            fusionObjectSlots: Number.isFinite(valencySummary?.fusionObjectSlots) ? valencySummary.fusionObjectSlots : null,
            availableObjectSlots: Number.isFinite(valencySummary?.availableObjectSlots) ? valencySummary.availableObjectSlots : null,
            selectedObj1: normalizedObj1,
            baseObj1: normalizedObj1Base,
            obj1ClearedByVoice: Boolean(normalizedObj1Base && !normalizedObj1 && isPassiveImpersonalMode),
        },
        pers1Pers2: {
            slot: "pers1-pers2",
            prefix: String(pers1 || ""),
            suffix: String(pers2 || ""),
            displayPrefix: String(pers1 || "") || "Ø",
            displaySuffix: String(pers2 || "") || "Ø",
        },
        boundaries: {
            isSentenceEngine: false,
            isGenerationRule: false,
            changesSurfaceForms: false,
            noNewVoiceBehavior: true,
        },
    };
}

function getGeneratedForwardDerivationLabel(derivationType = "") {
    if (derivationType === DERIVATION_TYPE.causative) {
        return "causativa";
    }
    if (derivationType === DERIVATION_TYPE.applicative) {
        return "aplicativa";
    }
    return String(derivationType || "");
}

function resolveForwardDerivationMetadataStemSurface(record = null) {
    if (!record || typeof record !== "object") {
        return "";
    }
    if (typeof getProvenancePrimaryStemSurface === "function") {
        const framedSurface = getProvenancePrimaryStemSurface(record);
        if (framedSurface) {
            return framedSurface;
        }
    }
    const grammarFrame = (
        (record.grammarFrame && typeof record.grammarFrame === "object" ? record.grammarFrame : null)
        || (record.frames && typeof record.frames === "object" ? record.frames : null)
    );
    if (grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object") {
        return "";
    }
    return normalizeDerivationStemValue(
        record.surfaceStem
        || (record.stemSpec ? realizeMorphStemSpec(record.stemSpec, record.stem || "") : "")
        || record.stem
        || ""
    );
}

function buildGeneratedForwardDerivationFrameMetadata({
    resolvedTenseMode = "",
    resolvedDerivationType = "",
    derivationValencyDelta = 0,
    sourceValency = null,
    forwardDerivations = null,
    forwardStemProvenance = null,
    causativeAllStems = null,
    applicativeAllStems = null,
    renderVerb = "",
    verb = "",
    analysisVerb = "",
} = {}) {
    if (resolvedTenseMode !== TENSE_MODE.verbo) {
        return null;
    }
    const config = typeof getForwardDerivationConfig === "function"
        ? getForwardDerivationConfig(resolvedDerivationType)
        : null;
    if (!config) {
        return null;
    }
    const selectedMeta = resolvedDerivationType === DERIVATION_TYPE.causative
        ? forwardDerivations?.causativeSelectionMeta
        : forwardDerivations?.applicativeSelectionMeta;
    const candidateStems = resolvedDerivationType === DERIVATION_TYPE.causative
        ? causativeAllStems
        : applicativeAllStems;
    const normalizedCandidateStems = Array.isArray(candidateStems)
        ? candidateStems.map((stem) => String(stem || "")).filter(Boolean)
        : [];
    const sourceStemForComparison = normalizeDerivationStemValue(renderVerb || "");
    const derivedCandidateStem = normalizedCandidateStems.find((stem) => (
        normalizeDerivationStemValue(stem) !== sourceStemForComparison
    )) || normalizedCandidateStems[0] || "";
    const selectedStemCandidate = normalizeDerivationStemValue(
        resolveForwardDerivationMetadataStemSurface(selectedMeta)
        || resolveForwardDerivationMetadataStemSurface(forwardStemProvenance)
        || ""
    );
    const selectedStem = normalizeDerivationStemValue(
        (
            selectedStemCandidate
            && selectedStemCandidate !== sourceStemForComparison
        )
            ? selectedStemCandidate
            : (
                derivedCandidateStem
                || selectedStemCandidate
                || analysisVerb
                || verb
                || ""
            )
    );
    const delta = Number.isFinite(derivationValencyDelta) ? derivationValencyDelta : 0;
    const derivedValency = Number.isFinite(sourceValency)
        ? sourceValency
        : null;
    const baseValency = Number.isFinite(derivedValency)
        ? Math.max(1, derivedValency - delta)
        : null;
    const lessonRange = resolvedDerivationType === DERIVATION_TYPE.causative
        ? "24-25"
        : "26";
    return {
        kind: "forward-derivation-frame",
        version: 1,
        lessonRange,
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        derivation: {
            type: resolvedDerivationType,
            label: getGeneratedForwardDerivationLabel(resolvedDerivationType),
            valencyDelta: delta,
            rule: String(selectedMeta?.rule || forwardStemProvenance?.rule || ""),
            patternType: String(selectedMeta?.patternType || forwardStemProvenance?.patternType || ""),
            guidanceRouteText: String(
                selectedMeta?.guidanceRoute?.text
                || forwardStemProvenance?.guidanceRoute?.text
                || ""
            ),
        },
        stem: {
            sourceVerb: String(renderVerb || ""),
            selectedStem,
            finalStem: String(verb || ""),
            analysisStem: String(analysisVerb || verb || ""),
            candidateStems: normalizedCandidateStems,
        },
        valency: {
            sourceValency: baseValency,
            derivedValency,
            delta,
        },
        boundaries: {
            isSentenceEngine: false,
            isGenerationRule: false,
            changesSurfaceForms: false,
            noNewDerivationBehavior: true,
        },
    };
}

function buildGeneratedCompoundFrameMetadata({
    resolvedTenseMode = "",
    parsedVerb = null,
    nuclearClauseShell = null,
} = {}) {
    const compoundAst = parsedVerb?.compoundAst || null;
    const allowsCompoundFrame = resolvedTenseMode === TENSE_MODE.verbo
        || resolvedTenseMode === TENSE_MODE.sustantivo
        || resolvedTenseMode === TENSE_MODE.adjetivo;
    if (!allowsCompoundFrame || !compoundAst || compoundAst.kind !== "compound") {
        return null;
    }
    const embeds = Array.isArray(compoundAst.embeds)
        ? compoundAst.embeds.map((entry) => ({
            role: String(entry?.role || ""),
            kind: String(entry?.kind || ""),
            value: String(entry?.value || ""),
            source: String(entry?.source || ""),
            explicit: entry?.explicit === true,
        }))
        : [];
    if (!embeds.length) {
        return null;
    }
    const compoundRouteFrame = buildGeneratedCompoundRouteFrameMetadata({
        resolvedTenseMode,
        compoundAst,
        embeds,
        nuclearClauseShell,
    });
    return {
        kind: "compound-frame",
        version: 1,
        lessonRange: "28,30",
        source: "parse-compoundAst",
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        compoundRouteFrame,
        routeFrame: compoundRouteFrame,
        matrix: {
            role: "matrix",
            stem: String(compoundAst.matrix?.stem || ""),
            ruleBase: String(compoundAst.matrix?.ruleBase || ""),
        },
        embeds,
        sourceInput: {
            rawInput: String(compoundAst.source?.rawInput || ""),
            displayVerb: String(compoundAst.source?.displayVerb || ""),
            displayCore: String(compoundAst.source?.displayCore || ""),
            verb: String(compoundAst.source?.verb || ""),
            analysisVerb: String(compoundAst.source?.analysisVerb || ""),
        },
        valency: compoundAst.valency && typeof compoundAst.valency === "object"
            ? { ...compoundAst.valency }
            : null,
        flags: compoundAst.flags && typeof compoundAst.flags === "object"
            ? { ...compoundAst.flags }
            : {},
        boundaries: {
            isSentenceEngine: false,
            isGenerationRule: false,
            changesSurfaceForms: false,
            notCompoundNncGeneration: true,
        },
    };
}

function getGeneratedCompoundFinalFormulaShape(sourceInput = "", compoundAst = null) {
    const raw = String(sourceInput || "").trim();
    if (/^-?\([^()/]+\/[^()/]+\)$/.test(raw)) {
        return "compound-vnc-embed-before-matrix";
    }
    if (/^\([^()]+\)-\([^()]+\)$/.test(raw)) {
        return "compound-verbstem-adjacent-embed-before-matrix";
    }
    if (compoundAst?.flags?.hasCompoundMarker === true) {
        return "compound-verbstem-marked-boundary";
    }
    return raw ? "compound-verbstem-route-specific-shape" : "";
}

function getGeneratedCompoundExternalObjectSlots(nuclearClauseShell = null, compoundAst = null) {
    const formulaSlots = nuclearClauseShell?.slots && typeof nuclearClauseShell.slots === "object"
        ? nuclearClauseShell.slots
        : {};
    const formulaSlotObjects = ["obj1", "obj2", "obj3", "reflexivo"]
        .map((slotId) => {
            const prefix = getFunctionUseValenceObjectSlotValue(formulaSlots[slotId]);
            return prefix ? {
                slotId,
                prefix,
                owner: "formula",
                sourceLayer: "nuclear-clause-formula",
            } : null;
        })
        .filter(Boolean);
    if (formulaSlotObjects.length) {
        return formulaSlotObjects;
    }
    const tokens = Array.isArray(compoundAst?.valency?.tokens)
        ? compoundAst.valency.tokens
        : [];
    return tokens
        .map((token, index) => {
            const prefix = normalizeFunctionUseValenceObjectSlot(token);
            return prefix ? {
                slotId: `obj${index + 1}`,
                prefix,
                owner: "compound-valency",
                sourceLayer: "compound-ast-valency",
            } : null;
        })
        .filter(Boolean);
}

function buildGeneratedCompoundObjectSlotOwnershipFrame({
    embedRole = "",
    matrixValence = "",
    sourceExternalObjectSlots = [],
    remainingExternalObjectSlots = [],
} = {}) {
    const sourceSlots = Array.isArray(sourceExternalObjectSlots) ? sourceExternalObjectSlots : [];
    const remainingSlots = Array.isArray(remainingExternalObjectSlots) ? remainingExternalObjectSlots : [];
    const resolvedMatrixValence = String(matrixValence || "").trim();
    const matrixValenceFrameFixed = Boolean(resolvedMatrixValence);
    return {
        kind: "generated-compound-object-slot-ownership-frame",
        version: 1,
        embedRole: String(embedRole || "").trim(),
        matrixValence: resolvedMatrixValence,
        matrixValenceFrameFixed,
        consumedObjectSlot: "",
        consumedObjectSlotOwnedBy: "none",
        sourceExternalObjectSlots: sourceSlots.map((slot) => ({ ...slot })),
        remainingExternalObjectSlots: remainingSlots.map((slot) => ({ ...slot })),
        sourceExternalObjectSlotsOwnedBy: sourceSlots.length
            ? "source-compound-route-frame"
            : "none",
        remainingExternalObjectSlotsOwnedBy: remainingSlots.length
            ? "matrix-route-frame"
            : "none",
        embeddedRoleLicensedBy: embedRole ? "generated-compound-route-frame" : "none",
        routeFrameOwnsObjectSlotLicensing: matrixValenceFrameFixed,
        functionUseOwnsObjectSlots: false,
        finalFormulaShapeOwnsObjectSlots: false,
        functionUseMayAnnotateLicensedReadingsOnly: true,
        matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership: true,
        objectSlotLicensingOrder: [
            "source-principal-vnc",
            "compound-ast-route-frame",
            "matrix-valence-frame",
            "route-frame",
            "function-use-annotation",
        ],
    };
}

function buildGeneratedCompoundRouteFrameMetadata({
    resolvedTenseMode = "",
    compoundAst = null,
    embeds = [],
    nuclearClauseShell = null,
} = {}) {
    if (!compoundAst || compoundAst.kind !== "compound") {
        return null;
    }
    const sourceInput = String(compoundAst.source?.rawInput || compoundAst.source?.displayVerb || "").trim();
    const normalizedEmbeds = Array.isArray(embeds) ? embeds : [];
    const sourceAdjunctNncs = normalizedEmbeds.map((entry) => ({
        surface: String(entry?.value || ""),
        stem: String(entry?.value || ""),
        kind: String(entry?.kind || ""),
        role: String(entry?.role || ""),
        sourceLayer: String(entry?.source || ""),
    }));
    const remainingExternalObjectSlots = getGeneratedCompoundExternalObjectSlots(nuclearClauseShell, compoundAst);
    const formulaSlots = nuclearClauseShell?.slots && typeof nuclearClauseShell.slots === "object"
        ? { ...nuclearClauseShell.slots }
        : null;
    const embedRole = normalizedEmbeds.length === 1
        ? String(normalizedEmbeds[0]?.role || "")
        : (normalizedEmbeds.length ? "multiple-embed-roles" : "");
    const embeddedRoot = normalizedEmbeds.length === 1
        ? String(normalizedEmbeds[0]?.value || "")
        : "";
    const matrixValence = String(compoundAst.valency?.transitivity || "");
    const objectSlotOwnership = buildGeneratedCompoundObjectSlotOwnershipFrame({
        embedRole,
        matrixValence,
        sourceExternalObjectSlots: remainingExternalObjectSlots,
        remainingExternalObjectSlots,
    });
    const matrixValenceFrameFixed = objectSlotOwnership.matrixValenceFrameFixed === true;
    return {
        kind: "generated-compound-route-frame",
        version: 1,
        sourcePrincipalVnc: {
            surface: sourceInput,
            formulaSlots,
            formulaEcho: String(nuclearClauseShell?.formulaEcho || ""),
        },
        sourceAdjunctNnc: sourceAdjunctNncs[0] || null,
        sourceAdjunctNncs,
        matrix: {
            role: "matrix",
            root: String(compoundAst.matrix?.stem || ""),
            ruleBase: String(compoundAst.matrix?.ruleBase || ""),
        },
        matrixValence,
        embedRole,
        embeddedRoot,
        embeddedRoots: normalizedEmbeds.map((entry) => String(entry?.value || "")).filter(Boolean),
        consumedObjectSlot: "",
        sourceExternalObjectSlots: remainingExternalObjectSlots,
        remainingExternalObjectSlots,
        remainingExternalObjectSlotIds: remainingExternalObjectSlots.map((slot) => slot.slotId),
        objectSlotOwnership,
        valenceDelta: 0,
        valenceEffects: {
            sourceExternalObjectSlotCount: remainingExternalObjectSlots.length,
            remainingExternalObjectSlotCount: remainingExternalObjectSlots.length,
            externalObjectSlotDelta: 0,
            stemInternalObjectSlotDelta: 0,
            compoundRoleStillRequiresAndrewsRouteFrame: true,
        },
        andrewsSection: "Andrews 28",
        andrewsRefs: ["Andrews 28", "Andrews 30"],
        generationStatus: "generated-output-carried-diagnostic-route-frame",
        generationAllowed: false,
        routeStage: "parse-compound-ast",
        resolvedTenseMode: String(resolvedTenseMode || ""),
        finalFormulaShape: getGeneratedCompoundFinalFormulaShape(sourceInput, compoundAst),
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

function buildGeneratedPatientiveCompoundSourceFrameMetadata({
    resolvedTenseMode = "",
    compoundFrame = null,
    nominalizationProfile = null,
    nuclearClauseShell = null,
    surfaceForms = [],
} = {}) {
    const patientiveFamilyProfile = nominalizationProfile?.patientiveFamilyProfile || null;
    if (
        resolvedTenseMode !== TENSE_MODE.sustantivo
        || !compoundFrame
        || compoundFrame.kind !== "compound-frame"
        || nominalizationProfile?.nominalKind !== "patientivo"
        || !patientiveFamilyProfile
    ) {
        return null;
    }
    const forms = Array.isArray(surfaceForms)
        ? surfaceForms.map((form) => String(form || "")).filter(Boolean)
        : [];
    const family = String(patientiveFamilyProfile.family || "");
    const compoundRouteFrame = cloneNuclearClauseSurfaceRouteFrame(
        compoundFrame.compoundRouteFrame || compoundFrame.routeFrame || null
    );
    return {
        kind: "patientive-compound-source-frame",
        version: 1,
        lessonRef: "Andrews 41.2.3",
        relatedLessonRefs: ["Andrews 39.6", "Andrews 39.7", "Andrews 39.8"],
        outputKind: "patientive-nnc-compound-source",
        sourceCategory: "compound-verbstem",
        nominalizationKind: "patientive",
        patientiveFamily: family,
        sourcePattern: String(patientiveFamilyProfile.sourcePattern || ""),
        sourceFamilyIds: Array.isArray(patientiveFamilyProfile.sourceFamilyIds)
            ? Array.from(patientiveFamilyProfile.sourceFamilyIds)
            : [],
        generatedSurfacePreserved: true,
        surfaceForms: forms,
        sourceFormulaEcho: String(nuclearClauseShell?.formulaEcho || ""),
        sourceFormulaSlots: nuclearClauseShell?.slots && typeof nuclearClauseShell.slots === "object"
            ? { ...nuclearClauseShell.slots }
            : null,
        compoundRouteFrame,
        routeFrame: compoundRouteFrame ? { ...compoundRouteFrame } : null,
        sourceCompoundFrame: {
            kind: compoundFrame.kind,
            lessonRange: compoundFrame.lessonRange,
            matrix: compoundFrame.matrix && typeof compoundFrame.matrix === "object"
                ? { ...compoundFrame.matrix }
                : null,
            embeds: Array.isArray(compoundFrame.embeds)
                ? compoundFrame.embeds.map((entry) => ({ ...entry }))
                : [],
            sourceInput: compoundFrame.sourceInput && typeof compoundFrame.sourceInput === "object"
                ? { ...compoundFrame.sourceInput }
                : null,
            valency: compoundFrame.valency && typeof compoundFrame.valency === "object"
                ? { ...compoundFrame.valency }
                : null,
            compoundRouteFrame: compoundFrame.compoundRouteFrame && typeof compoundFrame.compoundRouteFrame === "object"
                ? { ...compoundFrame.compoundRouteFrame }
                : null,
            routeFrame: compoundFrame.routeFrame && typeof compoundFrame.routeFrame === "object"
                ? { ...compoundFrame.routeFrame }
                : null,
            flags: compoundFrame.flags && typeof compoundFrame.flags === "object"
                ? { ...compoundFrame.flags }
                : {},
        },
        compoundPatientiveSource: {
            relation: family ? `${family}-patientive-from-compound-source` : "patientive-from-compound-source",
            evidence: "patientiveFamilyProfile + compoundAst",
            sourceRoleClass: family === "passive"
                ? "passive-patientive-compound-source"
                : (family === "impersonal"
                    ? "impersonal-patientive-compound-source"
                    : "patientive-compound-source"),
        },
        cannotInferFromSurfaceAlone: true,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
        boundaries: {
            isSentenceEngine: false,
            isGenerationRule: false,
            changesSurfaceForms: false,
            noNewSurfaceForms: true,
            noFixtureEvidence: true,
            doesNotResolveAllCompoundSemantics: true,
        },
    };
}

function buildGeneratedAdjectivalCompoundSourceFrameMetadata({
    resolvedTenseMode = "",
    compoundFrame = null,
    nominalizationProfile = null,
    nuclearClauseShell = null,
    surfaceForms = [],
} = {}) {
    if (
        resolvedTenseMode !== TENSE_MODE.adjetivo
        || !compoundFrame
        || compoundFrame.kind !== "compound-frame"
    ) {
        return null;
    }
    const nominalizationKind = String(nominalizationProfile?.role?.nominalizationKind || "");
    const adjectivalFunction = String(nominalizationProfile?.role?.adjectivalFunction || "");
    const isAdjectivalPredicateSurface = adjectivalFunction === "predicate-surface"
        || nominalizationKind === "adjectival-surface"
        || nominalizationKind === "patientive-adjectival";
    if (!isAdjectivalPredicateSurface) {
        return null;
    }
    const forms = Array.isArray(surfaceForms)
        ? surfaceForms.map((form) => String(form || "")).filter(Boolean)
        : [];
    const compoundRouteFrame = cloneNuclearClauseSurfaceRouteFrame(
        compoundFrame.compoundRouteFrame || compoundFrame.routeFrame || null
    );
    return {
        kind: "adjectival-compound-source-frame",
        version: 1,
        lessonRef: "Andrews 41.2",
        outputKind: "adjectival-nnc-compound-source",
        sourceCategory: "compound-verbstem",
        functionKind: "compound-source-adjectival",
        nominalizationKind: nominalizationKind || "adjectival-surface",
        adjectivalFunction: adjectivalFunction || "predicate-surface",
        generatedSurfacePreserved: true,
        surfaceForms: forms,
        sourceFormulaEcho: String(nuclearClauseShell?.formulaEcho || ""),
        sourceFormulaSlots: nuclearClauseShell?.slots && typeof nuclearClauseShell.slots === "object"
            ? { ...nuclearClauseShell.slots }
            : null,
        compoundRouteFrame,
        routeFrame: compoundRouteFrame ? { ...compoundRouteFrame } : null,
        sourceCompoundFrame: {
            kind: compoundFrame.kind,
            lessonRange: compoundFrame.lessonRange,
            matrix: compoundFrame.matrix && typeof compoundFrame.matrix === "object"
                ? { ...compoundFrame.matrix }
                : null,
            embeds: Array.isArray(compoundFrame.embeds)
                ? compoundFrame.embeds.map((entry) => ({ ...entry }))
                : [],
            sourceInput: compoundFrame.sourceInput && typeof compoundFrame.sourceInput === "object"
                ? { ...compoundFrame.sourceInput }
                : null,
            valency: compoundFrame.valency && typeof compoundFrame.valency === "object"
                ? { ...compoundFrame.valency }
                : null,
            compoundRouteFrame: compoundFrame.compoundRouteFrame && typeof compoundFrame.compoundRouteFrame === "object"
                ? { ...compoundFrame.compoundRouteFrame }
                : null,
            routeFrame: compoundFrame.routeFrame && typeof compoundFrame.routeFrame === "object"
                ? { ...compoundFrame.routeFrame }
                : null,
            flags: compoundFrame.flags && typeof compoundFrame.flags === "object"
                ? { ...compoundFrame.flags }
                : {},
        },
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
        boundaries: {
            isSentenceEngine: false,
            isGenerationRule: false,
            changesSurfaceForms: false,
            noNewSurfaceForms: true,
            noModificationAst: true,
            doesNotImplementLessons42_43: true,
        },
    };
}

function getAdverbialNuclearRouteFrameObjectSlots(vector = null) {
    const source = vector && typeof vector === "object" ? vector : {};
    return ["obj1", "obj2", "obj3", "reflexivo"]
        .map((slotId) => ({
            slotId,
            prefix: String(source[slotId] || ""),
            owner: "source-valence-frame",
        }))
        .filter((slot) => slot.prefix);
}

function buildAdverbialNuclearFunctionRouteFrame({
    sourceStem = "",
    finalStem = "",
    analysisStem = "",
    sourceValency = "",
    tense = "",
    functionUseValenceGate = null,
} = {}) {
    const gate = functionUseValenceGate && typeof functionUseValenceGate === "object"
        ? functionUseValenceGate
        : null;
    const sourceExternalObjectSlots = getAdverbialNuclearRouteFrameObjectSlots(gate?.sourceVector);
    const remainingExternalObjectSlots = getAdverbialNuclearRouteFrameObjectSlots(gate?.currentVector);
    const matrixValenceFrameFixed = gate?.generationAllowed === true;
    return {
        kind: "adverbial-nuclear-function-route-frame",
        version: 1,
        sourceFormula: "CNV predicate -> adverbial function reading",
        finalFormulaShape: "configured-adverbio-surface",
        andrewsSection: "Andrews Lesson 44",
        generationStatus: matrixValenceFrameFixed ? "generated-after-fixed-valence-frame" : "blocked-until-fixed-valence-frame",
        sourcePrincipalVnc: {
            role: "source-vnc",
            stem: String(sourceStem || ""),
            finalStem: String(finalStem || ""),
            analysisStem: String(analysisStem || ""),
            tense,
            valence: String(sourceValency || ""),
            externalObjectSlots: sourceExternalObjectSlots.map((slot) => ({ ...slot })),
        },
        sourceAdjunctNnc: null,
        embedRole: "none",
        consumedObjectSlot: "",
        consumedObjectSlotOwnedBy: "none",
        matrixValence: String(sourceValency || ""),
        matrixValenceFrameFixed,
        valenceDelta: {
            sourceExternalObjectSlotCount: sourceExternalObjectSlots.length,
            consumedObjectSlotCount: 0,
            remainingExternalObjectSlotCount: remainingExternalObjectSlots.length,
        },
        sourceExternalObjectSlots,
        remainingExternalObjectSlots,
        routeFrameLicensesEmbedRole: false,
        routeFrameLicensesObjectSlotOwnership: matrixValenceFrameFixed,
        finalFormulaShapeDoesNotLicenseRole: true,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseObjectSlots: true,
        functionUseValenceGate: gate,
        objectSlotOwnership: {
            kind: "adverbial-nuclear-function-object-slot-ownership-frame",
            matrixValence: String(sourceValency || ""),
            matrixValenceFrameFixed,
            matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership: true,
            routeFrameOwnsObjectSlotLicensing: matrixValenceFrameFixed,
            routeFrameLicensesObjectSlotOwnership: matrixValenceFrameFixed,
            sourceExternalObjectSlots: sourceExternalObjectSlots.map((slot) => ({ ...slot })),
            remainingExternalObjectSlots: remainingExternalObjectSlots.map((slot) => ({ ...slot })),
            consumedObjectSlot: "",
            consumedObjectSlotOwnedBy: "none",
            sourceExternalObjectSlotsOwnedBy: sourceExternalObjectSlots.length ? "source-valence-frame" : "none",
            remainingExternalObjectSlotsOwnedBy: remainingExternalObjectSlots.length ? "matrix-route-frame" : "none",
            functionUseOwnsObjectSlots: false,
            finalFormulaShapeOwnsObjectSlots: false,
            functionUseMayAnnotateLicensedReadingsOnly: true,
        },
    };
}

function buildGeneratedAdverbialNuclearFrameMetadata({
    resolvedTenseMode = "",
    tense = "",
    renderVerb = "",
    verb = "",
    analysisVerb = "",
    objectPrefix = "",
    baseObjectPrefix = "",
    surfaceForms = [],
    functionUseValenceGate = null,
} = {}) {
    if (resolvedTenseMode !== TENSE_MODE.adverbio) {
        return null;
    }
    const knownTenses = typeof getKnownConfiguredAdverbioTensesForAdverbialBoundary === "function"
        ? getKnownConfiguredAdverbioTensesForAdverbialBoundary()
        : ["pasado-remoto-adverbio-activo"];
    if (!knownTenses.includes(tense)) {
        return null;
    }
    const sourceStem = String(analysisVerb || verb || renderVerb || "");
    const normalizedObjectPrefix = String(objectPrefix || "");
    const normalizedBaseObjectPrefix = String(baseObjectPrefix || normalizedObjectPrefix || "");
    const sourceValency = normalizedObjectPrefix || normalizedBaseObjectPrefix ? "transitive" : "intransitive";
    const sourceRouteFrame = buildAdverbialNuclearFunctionRouteFrame({
        sourceStem,
        finalStem: String(verb || ""),
        analysisStem: String(analysisVerb || verb || ""),
        sourceValency,
        tense,
        functionUseValenceGate,
    });
    const classification = typeof classifyAdverbialNuclearCandidate === "function"
        ? classifyAdverbialNuclearCandidate({
            source: sourceStem,
            candidate: "",
            tense,
            adverbialKind: "manner-surface",
            falsePositiveSource: "configured-adverbio-surface",
        })
        : null;
    const clauseFrame = typeof buildAdverbialNuclearClauseFrame === "function"
        ? buildAdverbialNuclearClauseFrame({
            source: sourceStem,
            surfaceForms,
            sourceClauseKind: "vnc",
            adverbialKind: "vnc-adverbial",
            adverbialDegree: "first-degree",
            semanticDomain: "manner",
            tense,
            configuredTense: tense,
            sourceStem,
            finalStem: String(verb || ""),
            analysisStem: String(analysisVerb || verb || ""),
            sourceValency,
            objectPrefix: normalizedObjectPrefix,
            baseObjectPrefix: normalizedBaseObjectPrefix,
            evidenceSource: "generated configured adverbio route",
        })
        : null;
    return {
        kind: "adverbial-nuclear-frame",
        version: 1,
        lesson: 44,
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: false,
        doesNotGenerateForms: true,
        sourceRouteFrame,
        routeFrame: sourceRouteFrame,
        objectSlotOwnership: sourceRouteFrame.objectSlotOwnership,
        adverbialNuclearClauseFrame: clauseFrame,
        adverbial: {
            kind: "manner-surface",
            label: "manera",
            degree: "first-degree",
            configuredDegreeLabel: "configured-adverbio",
            isFullLesson44Engine: false,
        },
        sourceVnc: {
            stem: sourceStem,
            finalStem: String(verb || ""),
            analysisStem: String(analysisVerb || verb || ""),
            valency: sourceValency,
            objectPrefix: normalizedObjectPrefix,
            baseObjectPrefix: normalizedBaseObjectPrefix,
        },
        routeFrameLicensesObjectSlotOwnership: sourceRouteFrame.routeFrameLicensesObjectSlotOwnership,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseObjectSlots: true,
        functionUseValenceGate: functionUseValenceGate && typeof functionUseValenceGate === "object"
            ? functionUseValenceGate
            : null,
        tense,
        classification: classification
            ? {
                kind: classification.kind,
                adverbialKind: classification.adverbialKind,
                hasKnownConfiguredAdverbioTense: classification.hasKnownConfiguredAdverbioTense === true,
                confirmed: classification.confirmed === true,
                generationAllowed: classification.generationAllowed === true,
                diagnostics: Array.isArray(classification.diagnostics)
                    ? Array.from(classification.diagnostics)
                    : [],
            }
            : null,
        boundaries: {
            isSentenceEngine: false,
            isGenerationRule: false,
            changesSurfaceForms: false,
            hasAdverbialNuclearClauseFrame: Boolean(clauseFrame),
            noFullAdverbialClauseEngine: true,
            configuredAdverbioSurfaceOnly: true,
            functionUseAfterValenceFrameFixed: functionUseValenceGate?.generationAllowed === true,
        },
    };
}

function buildGeneratedRelationalNncBoundaryFrameMetadata({
    nominalKind = "",
    renderVerb = "",
    verb = "",
    analysisVerb = "",
    nominalizationProfile = null,
} = {}) {
    if (nominalKind !== "locativo-temporal") {
        return null;
    }
    const sourceStem = String(analysisVerb || verb || renderVerb || "");
    const sourceTense = String(nominalizationProfile?.source?.sourceTense || "imperfecto");
    const classification = typeof classifyRelationalNncCandidate === "function"
        ? classifyRelationalNncCandidate({
            candidate: String(renderVerb || verb || ""),
            relationalStem: "",
            relationalKind: "locative",
            relationalOption: "unknown",
            governedArgument: "",
            falsePositiveSource: "locative-temporal-nominal",
            sourceKind: "generated-verb-derived-nominal",
        })
        : null;
    return {
        kind: "relational-nnc-boundary-frame",
        version: 1,
        lessonRange: "45-47",
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        statusLabel: "no confirmado",
        candidate: {
            nominalKind,
            kindLabel: "locativo-temporal generado",
            sourceVnc: sourceStem,
            sourceTense,
            sourceKind: "generated-verb-derived-nominal",
        },
        classification: classification
            ? {
                kind: classification.kind,
                relationalKind: classification.relationalKind,
                relationalOption: classification.relationalOption,
                falsePositiveSource: classification.falsePositiveSource,
                confirmed: classification.confirmed === true,
                generationAllowed: classification.generationAllowed === true,
                diagnostics: Array.isArray(classification.diagnostics)
                    ? Array.from(classification.diagnostics)
                    : [],
            }
            : null,
        boundaries: {
            isGenerationRule: false,
            changesSurfaceForms: false,
            noRelationalNncGeneration: true,
            locativeTemporalNominalIsEvidence: false,
            noStaticRelationalFixture: true,
        },
    };
}

function buildGeneratedPlaceGentilicNncBoundaryFrameMetadata({
    nominalKind = "",
    renderVerb = "",
    verb = "",
    analysisVerb = "",
    nominalizationProfile = null,
} = {}) {
    if (nominalKind !== "locativo-temporal") {
        return null;
    }
    const sourceStem = String(analysisVerb || verb || renderVerb || "");
    const sourceTense = String(nominalizationProfile?.source?.sourceTense || "imperfecto");
    const classification = typeof classifyPlaceGentilicNncCandidate === "function"
        ? classifyPlaceGentilicNncCandidate({
            candidate: String(renderVerb || verb || ""),
            placeNameSource: "",
            gentilicSource: "",
            placeGentilicKind: "place-name",
            associatedPlace: "",
            collectivity: "",
            falsePositiveSource: "locative-temporal-nominal",
            sourceKind: "generated-verb-derived-nominal",
        })
        : null;
    return {
        kind: "place-gentilic-nnc-boundary-frame",
        version: 1,
        lesson: 48,
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        statusLabel: "no confirmado",
        candidate: {
            nominalKind,
            kindLabel: "locativo-temporal generado",
            placeGentilicKind: "place-name",
            sourceVnc: sourceStem,
            sourceTense,
            sourceKind: "generated-verb-derived-nominal",
        },
        classification: classification
            ? {
                kind: classification.kind,
                placeGentilicKind: classification.placeGentilicKind,
                falsePositiveSource: classification.falsePositiveSource,
                confirmed: classification.confirmed === true,
                generationAllowed: classification.generationAllowed === true,
                diagnostics: Array.isArray(classification.diagnostics)
                    ? Array.from(classification.diagnostics)
                    : [],
            }
            : null,
        boundaries: {
            isGenerationRule: false,
            changesSurfaceForms: false,
            noPlaceNameNncGeneration: true,
            noGentilicNncGeneration: true,
            locativeTemporalNominalIsEvidence: false,
            noStaticPlaceOrGentilicFixture: true,
        },
    };
}

function buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata({
    resolvedTenseMode = "",
    tense = "",
    nominalKind = "",
    renderVerb = "",
    verb = "",
    analysisVerb = "",
    sourceTense = "",
} = {}) {
    const isConfiguredAdverbio = resolvedTenseMode === TENSE_MODE.adverbio
        && tense === "pasado-remoto-adverbio-activo";
    const isLocativoTemporal = nominalKind === "locativo-temporal";
    if (!isConfiguredAdverbio && !isLocativoTemporal) {
        return null;
    }
    const sourceStem = String(analysisVerb || verb || renderVerb || "");
    const semanticRelation = isConfiguredAdverbio ? "manner" : "place";
    const adjoinedUnitType = isConfiguredAdverbio ? "vnc" : "nnc";
    const falsePositiveSource = isConfiguredAdverbio
        ? "configured-adverbio-surface"
        : "single-generated-word";
    const candidateLabel = isConfiguredAdverbio
        ? "adverbio heredado"
        : "locativo-temporal generado";
    const classification = typeof classifyAdverbialAdjunctionCandidate === "function"
        ? classifyAdverbialAdjunctionCandidate({
            principalClause: "",
            adjoinedUnit: candidateLabel,
            candidate: String(renderVerb || verb || ""),
            semanticRelation,
            adjoinedUnitType,
            marking: "",
            falsePositiveSource,
        })
        : null;
    return {
        kind: "adverbial-adjunction-boundary-frame",
        version: 1,
        lessonRange: "49-50",
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        statusLabel: "no confirmada",
        candidate: {
            label: candidateLabel,
            sourceVnc: sourceStem,
            sourceTense: String(sourceTense || tense || ""),
            semanticRelation,
            adjoinedUnitType,
            falsePositiveSource,
        },
        classification: classification
            ? {
                kind: classification.kind,
                semanticRelation: classification.semanticRelation,
                adjoinedUnitType: classification.adjoinedUnitType,
                falsePositiveSource: classification.falsePositiveSource,
                confirmed: classification.confirmed === true,
                generationAllowed: classification.generationAllowed === true,
                diagnostics: Array.isArray(classification.diagnostics)
                    ? Array.from(classification.diagnostics)
                    : [],
            }
            : null,
        boundaries: {
            isGenerationRule: false,
            changesSurfaceForms: false,
            noClauseAdjunctionAst: true,
            singleGeneratedWordIsEvidence: false,
            noStaticAdjunctionData: true,
        },
    };
}

const GENERATED_DENOMINAL_ROUTE_PROFILE_BY_TENSE = Object.freeze({
    "adjetivo-preterito-tik": {
        routeFamily: "vi-ti",
        structuralAnalogue: "inceptive-stative-ti-route",
        routeId: "denominal-vi-ti-preterit",
        sourceSlot: "noun/inc.root",
        sourceCategory: "noun-or-incorporated-root",
        verbalizer: "-ti",
        verbalizerType: "denominal-intransitive",
        valency: "intransitive",
        targetTense: "preterito",
        surfaceSuffix: "-tik",
    },
    "adjetivo-perfecto-tik": {
        routeFamily: "vi-ti",
        structuralAnalogue: "inceptive-stative-ti-route",
        routeId: "denominal-vi-ti-perfect",
        sourceSlot: "noun/inc.root",
        sourceCategory: "noun-or-incorporated-root",
        verbalizer: "-ti",
        verbalizerType: "denominal-intransitive",
        valency: "intransitive",
        targetTense: "perfecto",
        surfaceSuffix: "-tituk",
    },
    "adjetivo-preterito-naj": {
        routeFamily: "vt-na",
        structuralAnalogue: "nawat-transitive-route-no-andrews-suffix",
        routeId: "denominal-vt-na-preterit",
        sourceSlot: "noun/inc.obj.",
        sourceCategory: "noun-or-incorporated-object",
        verbalizer: "-na",
        verbalizerType: "denominal-transitive",
        valency: "transitive",
        targetTense: "preterito",
        surfaceSuffix: "-naj",
    },
    "adjetivo-perfecto-naj": {
        routeFamily: "vt-na",
        structuralAnalogue: "nawat-transitive-route-no-andrews-suffix",
        routeId: "denominal-vt-na-perfect",
        sourceSlot: "noun/inc.obj.",
        sourceCategory: "noun-or-incorporated-object",
        verbalizer: "-na",
        verbalizerType: "denominal-transitive",
        valency: "transitive",
        targetTense: "perfecto",
        surfaceSuffix: "-najtuk",
    },
});

function resolveGeneratedDenominalRouteProfileSpec(nominalKind = "") {
    const key = String(nominalKind || "").trim();
    if (!key) {
        return null;
    }
    if (typeof getNawatRouteProfile === "function") {
        const profile = getNawatRouteProfile(key);
        if (
            profile
            && typeof profile === "object"
            && profile.routePlacement === "patientivo-tronco-conversion"
            && profile.denominalFamily
        ) {
            return {
                ...profile,
                routeProfileSource: "static-modes",
            };
        }
    }
    const fallback = GENERATED_DENOMINAL_ROUTE_PROFILE_BY_TENSE[key];
    return fallback
        ? {
            ...fallback,
            routeProfileSource: "route-fallback",
        }
        : null;
}

function generatedDenominalRouteHasAndrewsSuffixContract(spec = null) {
    return String(spec?.structuralAnalogue || "").trim() !== "nawat-transitive-route-no-andrews-suffix";
}

function getGeneratedDenominalRouteCurriculumRef(spec = null) {
    if (generatedDenominalRouteHasAndrewsSuffixContract(spec)) {
        return { source: "Andrews", range: "54-55", role: "structural-analogue" };
    }
    return { source: "Nawat route data", range: "static_modes", role: "configured-denominal-route" };
}

function getGeneratedDenominalRouteSupportStatus(spec = null) {
    return generatedDenominalRouteHasAndrewsSuffixContract(spec)
        ? "current-route-supported"
        : "current-route-supported-nawat-only";
}

const GENERATED_DENOMINAL_ANDREWS_UNMODELED_CONTRACT_IDS = Object.freeze([
    "54.2.2-inceptive-stative-hui",
    "54.2.2-hui-lia-causative",
    "54.2.3-inceptive-stative-ya",
    "54.2.3-ti-ya-deverbal",
    "54.2.3-hui-ya-deverbal",
    "54.2.3-ya-lia-causative",
    "54.2.4-inceptive-stative-a",
    "54.2.5-inceptive-stative-hua",
    "54.3-included-possessor-ti",
    "54.2-54.4-ti-lia-causative",
    "54.5-ti-a-causative",
    "54.6-t-ia-applicative",
    "55.1-temporal-tia",
    "55.2-causative-tla",
    "55.2-tla-ti-lia-applicative",
    "55.2-intransitive-tla",
    "55.2-intransitive-tla-ti-a-causative",
    "55.2-intransitive-tla-ti-lia-applicative",
    "55.3-intransitive-o-a-applicative-huia",
    "55.3-o-a-il-huia-al-huia-applicative-note",
    "55.4-adverbial-huia",
    "55.5-relational-compound-o-a-huia",
    "55.7-transitive-i-a",
]);

const GENERATED_DENOMINAL_ANDREWS_TARGET_UNMODELED_CONTRACT_IDS = Object.freeze([
    "55.6-i-hui-a-hui-to-o-a",
]);

function getGeneratedDenominalRouteFamiliesWithoutAndrewsContract() {
    if (typeof getNawatRouteProfiles !== "function") {
        return ["vt-na"];
    }
    return Array.from(new Set(
        getNawatRouteProfiles()
            .filter((profile) => profile?.routePlacement === "patientivo-tronco-conversion")
            .filter((profile) => !generatedDenominalRouteHasAndrewsSuffixContract(profile))
            .map((profile) => profile.denominalFamily || profile.routeFamily || "")
            .filter(Boolean)
    )).sort();
}

function getGeneratedDenominalAndrewsContractCoverageSummary() {
    return {
        version: 1,
        curriculumRef: { source: "Andrews", range: "54.2-55.7", role: "denominal-contract-inventory" },
        outputKind: "denominal-andrews-contract-coverage",
        contractCount: 26,
        routeCoveredContractCount: 3,
        unmodeledContractCount: GENERATED_DENOMINAL_ANDREWS_UNMODELED_CONTRACT_IDS.length,
        targetUnmodeledContractCount: GENERATED_DENOMINAL_ANDREWS_TARGET_UNMODELED_CONTRACT_IDS.length,
        nawatOnlyRouteFamilies: getGeneratedDenominalRouteFamiliesWithoutAndrewsContract(),
        unmodeledContractIds: Array.from(GENERATED_DENOMINAL_ANDREWS_UNMODELED_CONTRACT_IDS),
        targetUnmodeledContractIds: Array.from(GENERATED_DENOMINAL_ANDREWS_TARGET_UNMODELED_CONTRACT_IDS),
        boundaries: {
            noNewSurfaceForms: true,
            noFixtureEvidence: true,
            structuralInventoryOnly: true,
            fullLessonGenerationModeled: false,
        },
    };
}

function getGeneratedDenominalRouteSuffixContract(spec = null) {
    const familyKey = spec?.denominalFamily || spec?.routeFamily || "";
    const contractByFamily = {
        "vi-ti": { range: "54.2/54.4", classicalSuffix: "ti" },
        "vi-iwi": { range: "55.6", classicalSuffix: "i-hui" },
        "vi-awi": { range: "55.6", classicalSuffix: "a-hui" },
    };
    const contractSpec = contractByFamily[familyKey];
    if (!contractSpec) {
        return null;
    }
    const orthographyConversion = typeof convertClassicalLettersToNawat === "function"
        ? convertClassicalLettersToNawat(contractSpec.classicalSuffix, {
            source: "Andrews Lessons 54-55 denominal route suffix",
        })
        : null;
    const nawatRuleSuffix = orthographyConversion?.output || contractSpec.classicalSuffix;
    return {
        kind: "denominal-route-suffix-contract",
        curriculumRef: { source: "Andrews", range: contractSpec.range, role: "suffix-family" },
        routeFamily: familyKey,
        classicalSuffix: contractSpec.classicalSuffix,
        nawatRuleSuffix,
        nawatVerbalizer: `-${String(nawatRuleSuffix || "").replace(/-/g, "")}`,
        routeVerbalizer: String(spec?.verbalizer || "").trim(),
        orthographyConversion,
        boundaries: {
            noFixtureEvidence: true,
            noNewSurfaceForms: true,
            suffixFamilyInventoryComplete: false,
        },
    };
}

function buildGeneratedDenominalRouteBoundaries(spec = null) {
    const boundaries = {
        noNewSurfaceForms: true,
        routeBasedOnly: true,
        suffixFamilyInventoryComplete: false,
        includedPossessorModeled: false,
        possessionDenominalModeled: false,
        temporalDenominalModeled: false,
        causativeApplicativeFamilyModeled: false,
    };
    if (!generatedDenominalRouteHasAndrewsSuffixContract(spec)) {
        boundaries.noAndrewsSuffixContract = true;
    }
    return boundaries;
}

function buildGeneratedDenominalFamilyProfileMetadata({
    nominalKind = "",
    renderVerb = "",
    verb = "",
    analysisVerb = "",
} = {}) {
    const spec = resolveGeneratedDenominalRouteProfileSpec(nominalKind);
    if (!spec) {
        return null;
    }
    const sourceSurface = String(renderVerb || analysisVerb || verb || "").trim();
    const sourceInput = String(verb || analysisVerb || renderVerb || "").trim();
    const andrewsContractRoutePreview = typeof generateNawatDenominalAndrewsContractRoutePreview === "function"
        ? generateNawatDenominalAndrewsContractRoutePreview({ sourceStem: sourceInput || sourceSurface })
        : null;
    return {
        version: 1,
        curriculumRef: getGeneratedDenominalRouteCurriculumRef(spec),
        outputKind: "denominal-route",
        routeFamily: spec.denominalFamily || spec.routeFamily || "",
        structuralAnalogue: spec.structuralAnalogue || "",
        routeId: spec.id || spec.routeId || "",
        routePlacement: spec.routePlacement || "patientivo-tronco-conversion",
        routeProfileSource: spec.routeProfileSource || "route-fallback",
        sourceState: "patientivo-tronco",
        sourceSlot: spec.sourceSlot,
        sourceCategory: spec.sourceCategory,
        sourceSurface,
        sourceInput,
        suffixContract: getGeneratedDenominalRouteSuffixContract(spec),
        verbalizer: spec.verbalizer,
        verbalizerType: spec.verbalizerType,
        valency: spec.valency,
        targetTense: spec.nawatTenseValue || spec.targetTenseValue || spec.finiteTense || spec.targetTense || "",
        surfaceSuffix: spec.surfaceSuffix,
        andrewsContractCoverage: getGeneratedDenominalAndrewsContractCoverageSummary(),
        andrewsContractRoutePreview,
        supportStatus: getGeneratedDenominalRouteSupportStatus(spec),
        isCompleteLesson54_55: false,
        boundaries: buildGeneratedDenominalRouteBoundaries(spec),
    };
}

function buildGeneratedNominalNum1Num2Metadata({
    subjectSuffix = "",
    nominalKind = "",
    possessivePrefix = "",
    source = NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
    sourceTense = "",
    sourceCombinedMode = "",
    actionNounStemUse = "",
    patientivoSource = "",
    patientiveSourceStageFrame = null,
    patientiveMultipleDerivationContract = null,
    renderVerb = "",
    verb = "",
    analysisVerb = "",
    subjectPrefix = "",
    sourceSubjectPrefix = "",
    sourceSubjectSuffix = "",
    instrumentivoImperfectActiveAbsolutiveException = null,
} = {}) {
    const connector = typeof buildNominalNum1Num2 === "function"
        ? buildNominalNum1Num2({
            subjectSuffix,
            nominalKind,
            predicateState: "derived-nominal",
            source,
        })
        : {
            version: 1,
            role: "subject-number-connector",
            slot: "subject.num1-num2",
            belongsTo: "subject",
            surface: String(subjectSuffix || ""),
            displaySurface: String(subjectSuffix || "") || "Ø",
            nominalKind: String(nominalKind || ""),
            predicateState: "derived-nominal",
            source,
            notNounSuffix: true,
            notStatePosition: true,
        };
    const hasPossessor = Boolean(possessivePrefix);
    const predicateStateSlot = {
        role: "predicate-state",
        slot: "predicate.state",
        state: hasPossessor ? "possessive" : "absolutive",
        statePosition: hasPossessor ? "possessor" : "vacant",
        isVacant: !hasPossessor,
        hasPossessor,
        participantRole: hasPossessor ? "possessor" : "",
        possessorPrefix: possessivePrefix || "",
        notSubjectConnector: true,
        notTense: true,
    };
    const nominalizationProfile = typeof buildVerbDerivedNominalizationProfile === "function"
        ? buildVerbDerivedNominalizationProfile({
            nominalKind,
            sourceTense,
            sourceModel: (sourceCombinedMode || actionNounStemUse) ? {
                matrixBase: analysisVerb || verb || renderVerb || "",
                sourceRawVerb: renderVerb || verb || analysisVerb || "",
                analysisVerb: analysisVerb || verb || "",
                combinedMode: sourceCombinedMode,
                actionNounStemUse,
                sourceSubjectPrefix: sourceSubjectPrefix || subjectPrefix,
                sourceSubjectSuffix,
            } : null,
            predicateStateSlot,
            num1Num2: connector,
            patientivoSource,
            patientiveSourceStageFrame,
            patientiveMultipleDerivationContract,
        })
        : null;
    return {
        num1Num2: connector,
        nominalizationProfile,
        relationalNncBoundaryFrame: buildGeneratedRelationalNncBoundaryFrameMetadata({
            nominalKind,
            renderVerb,
            verb,
            analysisVerb,
            nominalizationProfile,
        }),
        placeGentilicNncBoundaryFrame: buildGeneratedPlaceGentilicNncBoundaryFrameMetadata({
            nominalKind,
            renderVerb,
            verb,
            analysisVerb,
            nominalizationProfile,
        }),
        denominalFamilyProfile: buildGeneratedDenominalFamilyProfileMetadata({
            nominalKind,
            renderVerb,
            verb,
            analysisVerb,
        }),
        adverbialAdjunctionBoundaryFrame: buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata({
            nominalKind,
            renderVerb,
            verb,
            analysisVerb,
            sourceTense,
        }),
        nominalClauseFrame: {
            version: 1,
            clauseKind: "nominal-nuclear-clause",
            predicateKind: String(nominalKind || ""),
            hasTensePosition: false,
            tense: null,
            subject: {
                numberConnector: connector,
                numberConnectors: [connector],
            },
            predicate: {
                kind: String(nominalKind || ""),
                state: predicateStateSlot.state,
                stateSlot: predicateStateSlot,
            },
            stateSlot: predicateStateSlot,
        },
        instrumentivoImperfectActiveAbsolutiveException,
    };
}

function executeNuclearClauseSurfaceRequest(request = {}) {
    let options = request?.options || {};
    if (typeof Event !== "undefined" && options instanceof Event) {
        options = {};
    }
    options = sanitizeNuclearClauseSurfaceOptions(options);
    const silent = options.silent === true;
    const skipValidation = options.skipValidation === true;
    const override = options.override || null;
    const resolvedTenseMode = Object.values(TENSE_MODE).includes(override?.tenseMode)
        ? override.tenseMode
        : getActiveTenseMode();
    const resolvedDerivationMode = Object.values(DERIVATION_MODE).includes(override?.derivationMode)
        ? override.derivationMode
        : getActiveDerivationMode();
    const resolvedDerivationType = Object.values(DERIVATION_TYPE).includes(override?.derivationType)
        ? override.derivationType
        : getActiveDerivationType();
    const derivationValencyDelta = getDerivationValencyDelta(resolvedDerivationType);
    const resolvedVoiceMode = Object.values(VOICE_MODE).includes(override?.voiceMode)
        ? override.voiceMode
        : getActiveVoiceMode();
    const preservePassiveSubject = override?.preservePassiveSubject === true;
    const allowPassiveObject = options.allowPassiveObject === true || override?.allowPassiveObject === true;
    let posicionesFormula = typeof normalizeNuclearClauseSurfaceFormulaPositions === "function"
        ? normalizeNuclearClauseSurfaceFormulaPositions(
            request?.posicionesFormula || override?.posicionesFormula || null,
            {},
            { override }
        )
        : null;
    const entradasInternas = typeof buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula === "function"
        ? buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula(posicionesFormula)
        : {};
    let pers1 = entradasInternas.pers1 || "";
    let obj1 = entradasInternas.obj1 || "";
    let tronco = entradasInternas.tronco || "";
    let pers2 = entradasInternas.pers2 || entradasInternas.num2 || "";
    let poseedor = entradasInternas.poseedor || "";
    let entradaSurfaceDerivationFrame = null;
    const hasOverrideSourceFormulaEvidence = Boolean(
        override?.sourceFormulaSlots
        || override?.formulaSlots
        || override?.sourceFormulaEcho
        || override?.formulaEcho
        || override?.adjectivalNnc?.sourceFormulaSlots
        || override?.adjectivalNnc?.formulaSlots
        || override?.adjectivalNnc?.sourceFormulaEcho
        || override?.adjectivalNnc?.formulaEcho
        || override?.adjectivalNnc?.entryRouteContract?.sourceFormulaSlots
        || override?.adjectivalNnc?.entryRouteContract?.formulaSlots
        || override?.adjectivalNnc?.entryRouteContract?.sourceFormulaEcho
        || override?.adjectivalNnc?.entryRouteContract?.formulaEcho
    );
    const entradaSurfaceDerivation = (
        !hasOverrideSourceFormulaEvidence
        && typeof deriveNuclearClauseSurfaceFormulaPositionsFromEntradaCandidate === "function"
    )
        ? deriveNuclearClauseSurfaceFormulaPositionsFromEntradaCandidate({
            input: tronco,
            mode: resolvedTenseMode,
            posicionesFormula,
        })
        : null;
    if (entradaSurfaceDerivation?.applied === true) {
        entradaSurfaceDerivationFrame = entradaSurfaceDerivation.derivationFrame || null;
        posicionesFormula = entradaSurfaceDerivation.posicionesFormula || posicionesFormula;
        const derivedEntradasInternas = typeof buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula === "function"
            ? buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula(posicionesFormula)
            : {};
        pers1 = derivedEntradasInternas.pers1 || "";
        obj1 = derivedEntradasInternas.obj1 || "";
        tronco = derivedEntradasInternas.tronco || "";
        pers2 = derivedEntradasInternas.pers2 || derivedEntradasInternas.num2 || "";
        poseedor = derivedEntradasInternas.poseedor || "";
    }
    let pers1Slot = pers1;
    let obj1Slot = obj1;
    let troncoSlot = tronco;
    let pers2Slot = pers2;
    let poseedorSlot = poseedor;
    const inputPers1 = pers1;
    const inputPers2 = pers2;
    const entradaTronco = request?.entradaTronco && typeof request.entradaTronco === "object"
        ? request.entradaTronco
        : {};
    const tieneControlTronco = entradaTronco.tieneControlTronco === true;
    const valorTronco = String(entradaTronco.valorTronco || "");
    let entradaGrammarObject = (
        (request?.entradaGrammarObject && typeof request.entradaGrammarObject === "object" ? request.entradaGrammarObject : null)
        || (entradaTronco.entradaGrammarObject && typeof entradaTronco.entradaGrammarObject === "object" ? entradaTronco.entradaGrammarObject : null)
        || (override?.entradaGrammarObject && typeof override.entradaGrammarObject === "object" ? override.entradaGrammarObject : null)
    );
    const explicitEntradaGrammarObject = entradaGrammarObject;
    if (
        !entradaGrammarObject
        && typeof parseMovingTargetRegexInput === "function"
        && typeof buildEntradaGrammarObjectFromMovingTargetParsed === "function"
    ) {
        const entradaRawValue = String(valorTronco || troncoSlot || tronco || "");
        const parsedEntrada = parseMovingTargetRegexInput(entradaRawValue);
        if (parsedEntrada?.isValid === true) {
            entradaGrammarObject = buildEntradaGrammarObjectFromMovingTargetParsed(entradaRawValue, parsedEntrada);
        }
    }
    const clearError = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "clearError");
    const setError = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "setError");
    const onSearchQueryOnly = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onSearchQueryOnly");
    const onValidationError = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onValidationError");
    const onEntradaTroncoSync = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onEntradaTroncoSync");
    const onAnalisisTroncoResuelto = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onAnalisisTroncoResuelto");
    const onComplete = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onComplete");
    const patientivoOwnership = override?.patientivoOwnership ?? DEFAULT_PATIENTIVO_OWNERSHIP;
    const patientivoSource = override?.patientivoSource ?? "";
    const patientivoNominalSuffix = override?.patientivoNominalSuffix ?? null;
    const actionNounStemUse = String(override?.actionNounStemUse || "");
    const predicateNominalSourceTense = String(override?.predicateNominalSourceTense || "");
    let searchQuery = "";
    let hasSearchQuery = false;
    let hasSearchSeparator = false;
    if (!override?.tronco && tieneControlTronco) {
        const searchParts = getSearchParts(troncoSlot);
        searchQuery = searchParts.query;
        hasSearchQuery = searchParts.trimmedQuery.length > 0;
        hasSearchSeparator = searchParts.hasQuery;
        const baseValue = rememberNonSearchValue(searchParts);
        if (baseValue) {
            troncoSlot = searchParts.base;
        } else if (hasSearchQuery && VerbInputState.lastNonSearchValue) {
            troncoSlot = VerbInputState.lastNonSearchValue;
        }
        if (hasSearchQuery && !troncoSlot) {
            if (!silent) {
                onSearchQueryOnly({
                    valorTronco,
                });
            }
            return null;
        }
    }
    let tiempo = posicionesFormula?.tiempo || override?.tiempo || "";
    if (!tiempo) {
        const selectionState = getCurrentResolvedConjugationSelectionState();
        tiempo = selectionState.group === CONJUGATION_GROUPS.universal
            ? selectionState.universalTenseValue
            : selectionState.tenseValue;
    }
    let tense = normalizeNuclearClauseSurfaceTenseValue(tiempo);
    if (isRelationalNncGenerationOptIn(override)) {
        return executeRelationalNncGenerationRoute({
            override,
            verb: troncoSlot,
            posicionesFormula,
            entradaGrammarObject,
        });
    }
    if (isOrdinaryNncGenerationOptIn(override)) {
        return executeOrdinaryNncGenerationRoute({
            override,
            verb: troncoSlot,
            pers1: pers1Slot,
            pers2: pers2Slot,
            poseedor: poseedorSlot,
        });
    }
    if (isAdjectivalNncGenerationOptIn(override)) {
        return executeAdjectivalNncGenerationRoute({
            override,
            verb: troncoSlot,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: obj1Slot,
        });
    }
    const isTroncoNajActiveWrapperTense = isPotencialTroncoNajActiveTense(tense);
    const isPatientivoAdjectiveProfile = isPatientivoAdjectiveTense(tense);
    const isNominalOutputProfile = isNominalMorphProfileTense(tense);
    const isPresentAgentivoNominalProfile = tense === "agentivo-presente";
    const isPreteritAgentivoNominalProfile = tense === "agentivo-preterito";
    const isFutureAgentivoNominalProfile = tense === "agentivo-futuro";
    if (isPotencialProfileTense(tense) && tense !== "potencial") {
        poseedorSlot = "";
    }
    const overrideInstrumentivoMode = override?.instrumentivoMode === INSTRUMENTIVO_MODE.posesivo
        ? INSTRUMENTIVO_MODE.posesivo
        : (override?.instrumentivoMode === INSTRUMENTIVO_MODE.absolutivo
            ? INSTRUMENTIVO_MODE.absolutivo
            : (override?.instrumentivoMode === INSTRUMENTIVO_MODE.absolutivoImperfectoActivo
                ? INSTRUMENTIVO_MODE.absolutivoImperfectoActivo
                : ""));
    if (
        tense === "instrumentivo"
        && overrideInstrumentivoMode === INSTRUMENTIVO_MODE.posesivo
        && !poseedorSlot
        && typeof resolveInstrumentivoPossessorPrefixFromSourceSubject === "function"
    ) {
        poseedorSlot = resolveInstrumentivoPossessorPrefixFromSourceSubject(pers1Slot, pers2Slot);
    }
    if (
        tense === "calificativo-instrumentivo"
        && actionNounStemUse === "general-use"
        && !poseedorSlot
        && typeof resolveNawatPossessorPrefixFromSourceSubject === "function"
    ) {
        poseedorSlot = resolveNawatPossessorPrefixFromSourceSubject(pers1Slot, pers2Slot);
    }
    if (isPresentAgentivoNominalProfile) {
        poseedorSlot = "";
    }
    if (isPatientivoAdjectiveProfile) {
        poseedorSlot = "";
    }
    let baseObj1Slot = obj1Slot;
    let isReflexive = obj1Slot === "mu";
    let isYawiOptativeSingular = false;
    let shouldAddYuVariant = false;
    const yawiSurfaceBase = getSuppletiveYawiImperfective();
    const yawiPresentLong = yawiSurfaceBase;
    const yawiPresentShort = yawiSurfaceBase;
    const yawiHabitual = yawiSurfaceBase;
    const yawiCanonicalLong = getSuppletiveYawiCanonical();
    const yawiCanonicalShort = getSuppletiveYawiShort();
    const yawiYuVariant = getSuppletiveYawiYuVariant();
    let primaryFormSpec = null;
    let troncoRender = "";
    const returnGenerationValencyObjectSlotGateBlockedResult = (
        valencyObjectSlotGate,
        {
            routeFamily = "generation-valency",
            resultMarker = "—",
            verb = troncoSlot,
            renderVerb = troncoRender,
        } = {},
    ) => buildNuclearClauseSurfaceBlockedResult({
        result: {
            result: resultMarker,
            surfaceForms: [],
            generationAllowed: false,
            routeRankingAllowed: false,
            valencyObjectSlotGate,
        },
        message: GENERATE_WORD_NO_OUTPUT_MESSAGE,
        diagnosticId: valencyObjectSlotGate?.diagnosticId || "generation-valency-object-slot-frame-unfixed",
        routeFamily,
        routeStage: valencyObjectSlotGate?.routeStage || "generation-valency-object-slot-gate",
        resultMarker,
        override,
        resolvedTenseMode,
        tense,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        poseedor: poseedorSlot,
        posicionesFormula,
        verb,
        renderVerb,
        entradaGrammarObject,
        isReflexive,
        resolvedDerivationMode,
        resolvedDerivationType,
        resolvedVoiceMode,
        enumerableContract: false,
    });
    if (isTroncoNajActiveWrapperTense) {
        const troncoNajActiveWrapperSlotGate = typeof buildGenerationValencyObjectSlotMutationGate === "function"
            ? buildGenerationValencyObjectSlotMutationGate({
                operation: "apply-tronco-naj-active-wrapper-slot-clearing",
                mutationKind: "delete-object-slots",
                sourceObj1: obj1Slot,
                sourceBaseObj1: baseObj1Slot,
                sourceObj2: "",
                sourceObj3: "",
                targetObj1: "",
                targetBaseObj1: "",
                targetObj2: "",
                targetObj3: "",
                options: {
                    entradaGrammarObject,
                    requireFixedValenceFrame: true,
                },
            })
            : null;
        if (troncoNajActiveWrapperSlotGate?.status === "blocked") {
            return returnGenerationValencyObjectSlotGateBlockedResult(troncoNajActiveWrapperSlotGate);
        }
        obj1Slot = "";
    }
    baseObj1Slot = obj1Slot;
    isReflexive = obj1Slot === "mu";

    const returnError = (message, errorTargets = []) => {
        if (skipValidation) {
            return null;
        }
        errorTargets.forEach((target) => setError(target));
        if (!silent) {
            onValidationError({
                tiempo: tense,
                obj1Base: baseObj1Slot,
            });
        }
        return buildNuclearClauseSurfaceBlockedResult({
            result: { error: message },
            message,
            diagnosticId: "nuclear-clause-surface-validation-error",
            routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
            routeStage: "validate",
            resultMarker: null,
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: baseObj1Slot,
            poseedor: poseedorSlot,
            posicionesFormula,
            verb: troncoSlot,
            renderVerb: troncoRender,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false,
        });
    };
    const returnIfError = (message, errorTargets = []) => {
        const error = returnError(message, errorTargets);
        return error || null;
    };
    if (tense === "patientivo" && !normalizeVerbDerivedPatientiveFamily(patientivoSource)) {
        return buildNuclearClauseSurfaceBlockedResult({
            result: {
                result: "—",
                error: true,
                surfaceForms: [],
                generationAllowed: false,
                routeRankingAllowed: false,
                patientivoSourceRequired: true,
            },
            message: "Patientivo requiere fuente explícita: pasivo, impersonal, perfectivo, imperfectivo o tronco verbal.",
            diagnosticId: "nuclear-clause-surface-patientivo-source-required",
            routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
            routeStage: "patientivo-source-gate",
            resultMarker: "—",
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: baseObj1Slot,
            poseedor: poseedorSlot,
            posicionesFormula,
            verb: troncoSlot,
            renderVerb: troncoRender,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false,
        });
    }
    const buildActiveNuclearClauseSurfaceText = ({
        pers1Slot: pers1SlotValue = "",
        obj1Slot: obj1SlotValue = "",
        pers2Slot: pers2SlotValue = "",
        troncoSlot: troncoSlotValue = "",
        verb: compatibilityVerbValue = "",
        trailingSuffix = "",
        directionalChainMeta = null,
        surfaceRuleMeta = null,
        isYawiOptative = false,
    } = {}) => {
        const resolvedTroncoSlot = troncoSlotValue || compatibilityVerbValue;
        const usePossessivePrefix = (
            tense === "sustantivo-verbal"
            || isPotencialProfileTense(tense)
            || tense === "agentivo"
            || tense === "agentivo-presente"
            || tense === "agentivo-preterito"
            || tense === "agentivo-futuro"
            || tense === "patientivo"
            || tense === "instrumentivo"
            || isPredicateNominalTense(tense)
            || tense === "calificativo-instrumentivo"
            || tense === "locativo-temporal"
        );
        const preposedParticle = tense === "optativo"
            ? (
                isYawiOptative
                    ? "ma "
                    : (
                        getPers1Pers2Info(pers1SlotValue, pers2SlotValue)?.person === 2
                            ? ""
                            : "ma "
                    )
            )
            : "";
        const outputTextOptions = {
            particulaPrepuesta: preposedParticle,
            pers1: pers1SlotValue,
            poseedor: usePossessivePrefix ? poseedorSlot : "",
            obj1: obj1SlotValue,
            tronco: resolvedTroncoSlot,
            pers2: pers2SlotValue,
            hasOptionalSupportiveI: parsedVerb.hasOptionalSupportiveI === true,
            optionalSupportiveLetter: parsedVerb.optionalSupportiveLetter || "",
            directionalChainMeta,
            surfaceRuleMeta,
        };
        const outputSurfaceResult = isNominalOutputProfile
            ? buildNominalOutputResult({
                ...outputTextOptions,
                sufijoNominal: trailingSuffix,
            })
            : buildOutputWordResult(outputTextOptions);
        collectGeneratedSurfaceSoundSpellingFrames(outputSurfaceResult);
        collectGeneratedOutputSurfaceRecord(outputSurfaceResult);
        return outputSurfaceResult.surface || "";
    };
    let appliedMorphology = null;
    const mergeSurfaceRuleMeta = (...metas) => {
        const merged = {};
        let hasMeta = false;
        metas.forEach((meta) => {
            if (!meta || typeof meta !== "object") {
                return;
            }
            Object.assign(merged, meta);
            hasMeta = true;
        });
        return hasMeta ? merged : null;
    };
    const getCurrentSurfaceRuleMeta = () => (
        mergeSurfaceRuleMeta(appliedMorphology?.surfaceRuleMeta, suppletiveStemSet?.surfaceRuleMeta)
    );
    const generatedSurfaceSoundSpellingFrames = [];
    const generatedOutputSurfaceRecords = [];
    const getGeneratedSurfaceTextVariants = (surface = "") => {
        const normalizedSurface = String(surface || "").trim();
        if (!normalizedSurface) {
            return [];
        }
        const variants = typeof expandOptionalParentheticalForms === "function"
            ? expandOptionalParentheticalForms([normalizedSurface])
            : [normalizedSurface];
        return variants
            .map((variant) => String(variant || "").trim())
            .filter((variant, index, list) => variant && list.indexOf(variant) === index);
    };
    const pushGeneratedSurfaceForm = (surface = "") => {
        getGeneratedSurfaceTextVariants(surface).forEach((variant) => {
            if (!forms.includes(variant)) {
                forms.push(variant);
            }
        });
    };
    const collectGeneratedSurfaceSoundSpellingFrames = (...sources) => {
        collectNuclearClauseSurfaceSoundSpellingFrames(...sources).forEach((frame) => {
            const key = getNuclearClauseSurfaceSoundSpellingFrameKey(frame);
            if (!key || generatedSurfaceSoundSpellingFrames.some((entry) => getNuclearClauseSurfaceSoundSpellingFrameKey(entry) === key)) {
                return;
            }
            generatedSurfaceSoundSpellingFrames.push(frame);
        });
    };
    const collectGeneratedOutputSurfaceRecord = (record = null) => {
        if (!record || typeof record !== "object") {
            return;
        }
        const surface = String(record.surface || "");
        const segments = normalizeCnvSurfacePathSegments(record.segments || []);
        if (!surface && !segments.length) {
            return;
        }
        const surfaceVariants = getGeneratedSurfaceTextVariants(surface);
        const troncoSegmentIndex = segments.findIndex((segment) => (
            segment?.role === "tronco" || segment?.slot === "tronco"
        ));
        const troncoVariants = troncoSegmentIndex >= 0
            ? getGeneratedSurfaceTextVariants(segments[troncoSegmentIndex]?.value || "")
            : [];
        (surfaceVariants.length ? surfaceVariants : [surface]).forEach((surfaceVariant, variantIndex) => {
            if (generatedOutputSurfaceRecords.some((entry) => entry.surface === surfaceVariant)) {
                return;
            }
            const variantSegments = segments.map((segment, segmentIndex) => {
                if (
                    segmentIndex === troncoSegmentIndex
                    && troncoVariants.length === surfaceVariants.length
                    && troncoVariants[variantIndex]
                ) {
                    return {
                        ...segment,
                        value: troncoVariants[variantIndex],
                    };
                }
                return { ...segment };
            });
            generatedOutputSurfaceRecords.push({
                surface: surfaceVariant,
                segments: variantSegments,
            });
        });
    };
    const buildSurfaceFromCurrentSlots = (overrideTronco = troncoSlot, overrideSuffix = pers2Slot) => {
        const realizedNominal = isNominalOutputProfile
            ? realizeNominalFormSpec(primaryFormSpec, {
                verb: overrideTronco,
                subjectSuffix: overrideSuffix,
            })
            : null;
        return buildActiveNuclearClauseSurfaceText({
            pers1Slot: pers1Slot,
            obj1Slot: obj1Slot,
            pers2Slot: realizedNominal ? realizedNominal.subjectSuffix : overrideSuffix,
            troncoSlot: realizedNominal ? realizedNominal.verb : overrideTronco,
            trailingSuffix: appliedMorphology?.trailingSuffix || "",
            directionalChainMeta: appliedMorphology?.directionalChainMeta || null,
            surfaceRuleMeta: getCurrentSurfaceRuleMeta(),
            isYawiOptative: isYawiOptativeSingular,
        });
    };
    const buildSurfaceFromSlotParts = ({
        pers1Slot: pers1SlotValue,
        obj1Slot: obj1SlotValue,
        pers2Slot: pers2SlotValue,
        troncoSlot: troncoSlotValue = "",
        verb: compatibilityVerbValue = "",
        formSpec = null,
        trailingSuffix = "",
        isYawiOptative = false,
        directionalChainMeta = null,
        surfaceRuleMeta = null,
    }) => {
        const resolvedTroncoSlot = troncoSlotValue || compatibilityVerbValue;
        const realizedNominal = isNominalOutputProfile
            ? realizeNominalFormSpec(formSpec, {
                verb: resolvedTroncoSlot,
                subjectSuffix: pers2SlotValue,
            })
            : null;
        return buildActiveNuclearClauseSurfaceText({
            pers1Slot: pers1SlotValue,
            obj1Slot: obj1SlotValue,
            pers2Slot: realizedNominal ? realizedNominal.subjectSuffix : pers2SlotValue,
            troncoSlot: realizedNominal ? realizedNominal.verb : resolvedTroncoSlot,
            trailingSuffix,
            directionalChainMeta,
            surfaceRuleMeta,
            isYawiOptative,
        });
    };

    clearError("subject-prefix");
    clearError("object-prefix");
    clearError("subject-suffix");

    const rawVerb = String(troncoSlot || "");
    const parseInputVerb = rawVerb;
    const rawVerbTiMetadata = getRawInputTiCausativeMetadata(parseInputVerb);
    const invalidCharacters = getInvalidVerbCharacters(parseInputVerb);
    const invalidLetters = getInvalidVerbLetters(parseInputVerb);
    const invalidStructure = getInvalidVerbStructure(parseInputVerb, {
        expectRegexEnvelope: false,
    });
    if (invalidCharacters.length || invalidLetters.length || invalidStructure) {
        const invalidList = Array.from(new Set([...invalidCharacters, ...invalidLetters])).join(", ");
        const message = invalidStructure
            ? getInvalidVerbStructureMessage(invalidStructure, {
                expectRegexEnvelope: false,
            })
            : (invalidList
                ? `El verbo contiene letras invalidas: ${invalidList}`
                : "El verbo contiene letras invalidas.");
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
    }
    const preParsedVerb = override?.parsedVerb;
    const shouldReusePreParsed = canReusePreParsedVerb({
        parsedVerb: preParsedVerb,
        rawVerb: parseInputVerb,
    });
    const parsedVerb = shouldReusePreParsed
        ? { ...preParsedVerb }
        : parseVerbInput(parseInputVerb);
    parsedVerb.derivationType = resolvedDerivationType;
    parsedVerb.derivationValencyDelta = derivationValencyDelta;
    parsedVerb.tiCausativeClass = parsedVerb.tiCausativeClass
        || rawVerbTiMetadata.tiCausativeClass
        || normalizeTiCausativeClass(getComposerActiveTiCausativeClass())
        || "";
    troncoSlot = parsedVerb.verb;
    troncoRender = parsedVerb.displayVerb;
    const rootPlusYaAdjectivalSource = typeof resolveRootPlusYaAdjectivalNncSource === "function"
        ? resolveRootPlusYaAdjectivalNncSource(parsedVerb)
        : {
            supported: parsedVerb.isRootPlusYa === true
                && parsedVerb.isWeya !== true
                && parsedVerb.hasSlashMarker !== true,
        };
    if (
        tense === "adjetivo-preterito"
        && resolvedTenseMode === TENSE_MODE.adjetivo
        && resolvedDerivationMode === DERIVATION_MODE.active
        && rootPlusYaAdjectivalSource.supported === true
    ) {
        return executeAdjectivalNncGenerationRoute({
            override: {
                ...override,
                adjectivalNnc: {
                    ...(override?.adjectivalNnc && typeof override.adjectivalNnc === "object" ? override.adjectivalNnc : {}),
                    enabled: true,
                    stem: rawVerb || troncoRender || troncoSlot,
                    state: "absolutive",
                    formation: "root-plus-ya-obsolete-preterit",
                    role: "predicate-surface",
                },
            },
            verb: rawVerb || troncoRender || troncoSlot,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: obj1Slot,
        });
    }
    if (
        tense === "adjetivo-preterito"
        && resolvedTenseMode === TENSE_MODE.adjetivo
        && resolvedDerivationMode === DERIVATION_MODE.active
        && rootPlusYaAdjectivalSource.diagnosticId === "adjectival-nnc-root-plus-ya-exception"
    ) {
        return executeAdjectivalNncGenerationRoute({
            override: {
                ...override,
                adjectivalNnc: {
                    ...(override?.adjectivalNnc && typeof override.adjectivalNnc === "object" ? override.adjectivalNnc : {}),
                    enabled: true,
                    stem: rawVerb || troncoRender || troncoSlot,
                    state: "absolutive",
                    formation: "root-plus-ya-obsolete-preterit",
                    role: "predicate-surface",
                },
            },
            verb: rawVerb || troncoRender || troncoSlot,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: obj1Slot,
        });
    }
    let analysisVerb = parsedVerb.analysisVerb;
    const analysisExactVerb = parsedVerb.exactBaseVerb || parsedVerb.analysisVerb || parsedVerb.verb;
    let indirectObjectMarker = posicionesFormula?.obj2 || parsedVerb.indirectObjectMarker;
    let thirdObjectMarker = posicionesFormula?.obj3 || "";
    const sourceSelectedProjectiveObjectPrefix = obj1Slot;
    const sourceSelectedProjectiveMarkers = [obj1Slot, indirectObjectMarker, thirdObjectMarker]
        .filter((marker) => marker === "ta" || marker === "te");
    const passivePatientivoSelectedProjectiveObjectPrefix = (
        tense === "patientivo"
        && normalizeVerbDerivedPatientiveFamily(patientivoSource) === "passive"
        && sourceSelectedProjectiveMarkers.length > 1
        && (sourceSelectedProjectiveObjectPrefix === "ta" || sourceSelectedProjectiveObjectPrefix === "te")
    ) ? sourceSelectedProjectiveObjectPrefix : "";
    const customaryPresentPatientiveSelectedProjectiveObjectPrefix = (
        sourceSelectedProjectiveMarkers.length > 1
        && (sourceSelectedProjectiveObjectPrefix === "ta" || sourceSelectedProjectiveObjectPrefix === "te")
    ) ? sourceSelectedProjectiveObjectPrefix : "";
    const boundMarkerSlotOverrides = applyBoundMarkerSlotOverrides(
        parsedVerb,
        obj1Slot,
        baseObj1Slot,
        {
            preserveOccupiedSourceObjectPrefix: isNominalOutputProfile,
            entradaGrammarObject,
        }
    );
    if (boundMarkerSlotOverrides.blocked === true) {
        return buildNuclearClauseSurfaceBlockedResult({
            result: {
                result: "—",
                surfaceForms: [],
                generationAllowed: false,
                routeRankingAllowed: false,
                valencyObjectSlotGate: boundMarkerSlotOverrides.valencyObjectSlotGate || null,
            },
            message: GENERATE_WORD_NO_OUTPUT_MESSAGE,
            diagnosticId: boundMarkerSlotOverrides.diagnosticId || "generation-valency-object-slot-frame-unfixed",
            routeFamily: "generation-valency",
            routeStage: boundMarkerSlotOverrides.routeStage || "generation-valency-object-slot-gate",
            resultMarker: "—",
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: obj1Slot,
            poseedor: poseedorSlot,
            posicionesFormula,
            verb: troncoSlot,
            renderVerb: troncoRender,
            entradaGrammarObject,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false,
        });
    }
    ({ obj1: obj1Slot, baseObj1: baseObj1Slot } = boundMarkerSlotOverrides);
    if (parsedVerb.hasImpersonalTaPrefix) {
        const impersonalTaPrefixSlotGate = typeof buildGenerationValencyObjectSlotMutationGate === "function"
            ? buildGenerationValencyObjectSlotMutationGate({
                operation: "apply-impersonal-ta-prefix-slot-clearing",
                mutationKind: "delete-object-slots",
                sourceObj1: obj1Slot,
                sourceBaseObj1: baseObj1Slot,
                sourceObj2: indirectObjectMarker,
                sourceObj3: thirdObjectMarker,
                targetObj1: "",
                targetBaseObj1: "",
                targetObj2: "",
                targetObj3: "",
                options: {
                    entradaGrammarObject,
                },
            })
            : null;
        if (impersonalTaPrefixSlotGate?.status === "blocked") {
            return buildNuclearClauseSurfaceBlockedResult({
                result: {
                    result: "—",
                    surfaceForms: [],
                    generationAllowed: false,
                    routeRankingAllowed: false,
                    valencyObjectSlotGate: impersonalTaPrefixSlotGate,
                },
                message: GENERATE_WORD_NO_OUTPUT_MESSAGE,
                diagnosticId: impersonalTaPrefixSlotGate.diagnosticId || "generation-valency-object-slot-frame-unfixed",
                routeFamily: "generation-valency",
                routeStage: impersonalTaPrefixSlotGate.routeStage || "generation-valency-object-slot-gate",
                resultMarker: "—",
                override,
                resolvedTenseMode,
                tense,
                pers1: pers1Slot,
                pers2: pers2Slot,
                obj1: obj1Slot,
                poseedor: poseedorSlot,
                posicionesFormula,
                verb: troncoSlot,
                renderVerb: troncoRender,
                entradaGrammarObject,
                isReflexive,
                resolvedDerivationMode,
                resolvedDerivationType,
                resolvedVoiceMode,
                enumerableContract: false,
            });
        }
        obj1Slot = "";
        baseObj1Slot = "";
        indirectObjectMarker = "";
        thirdObjectMarker = "";
    }
    ({
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
    } = resolveObj1Obj2Positions({
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
        derivationType: resolvedDerivationType,
    }));
    if (isTroncoNajActiveWrapperTense) {
        const troncoNajResolvedSlotGate = typeof buildGenerationValencyObjectSlotMutationGate === "function"
            ? buildGenerationValencyObjectSlotMutationGate({
                operation: "apply-tronco-naj-active-wrapper-resolved-slot-clearing",
                mutationKind: "delete-object-slots",
                sourceObj1: obj1Slot,
                sourceBaseObj1: baseObj1Slot,
                sourceObj2: indirectObjectMarker,
                sourceObj3: thirdObjectMarker,
                targetObj1: "",
                targetBaseObj1: "",
                targetObj2: "",
                targetObj3: "",
                options: {
                    entradaGrammarObject,
                    requireFixedValenceFrame: true,
                },
            })
            : null;
        if (troncoNajResolvedSlotGate?.status === "blocked") {
            return returnGenerationValencyObjectSlotGateBlockedResult(troncoNajResolvedSlotGate);
        }
        obj1Slot = "";
        indirectObjectMarker = "";
        thirdObjectMarker = "";
    }
    baseObj1Slot = obj1Slot;
    const sourceValency = getActiveVerbValency(parsedVerb);
    const fusionPrefixes = Array.isArray(parsedVerb.fusionPrefixes) ? parsedVerb.fusionPrefixes : [];
    const validationVerb = troncoSlot;
    const hasObjectSelection = Boolean(obj1Slot || indirectObjectMarker || thirdObjectMarker);
    const allowIntransitiveSuppletiveContext = isSuppletiveIntransitiveOnlyContext(parsedVerb, {
        hasObjectSelection,
    });
    let isYawi = parsedVerb.isYawi === true && allowIntransitiveSuppletiveContext;
    const isWeya = parsedVerb.isWeya === true && allowIntransitiveSuppletiveContext;
    isReflexive = obj1Slot === "mu";
    const directionalPrefix = parsedVerb.directionalPrefix;
    const rawSuppletivePath = getSuppletiveStemPath(parsedVerb);
    const suppletivePath = (
        rawSuppletivePath
        && isIntransitiveOnlySuppletiveId(rawSuppletivePath.id)
        && !allowIntransitiveSuppletiveContext
    ) ? null : rawSuppletivePath;
    let suppletiveStemSet = suppletivePath?.stemSet || null;
    const isYawiSuppletive = suppletivePath?.id === "yawi";
    const yawiPrefix = isYawiSuppletive
        && analysisVerb
        && troncoSlot.endsWith(analysisVerb)
        ? troncoSlot.slice(0, -analysisVerb.length)
        : "";
    const applyYawiPrefix = (form) => (yawiPrefix ? `${yawiPrefix}${form}` : form);
    if (suppletiveStemSet && isYawiSuppletive && yawiPrefix) {
        suppletiveStemSet = applySuppletiveYawiPrefixToStemSet(suppletiveStemSet, applyYawiPrefix);
    }
    const suppletiveTenseSuffixes = suppletivePath?.tenseSuffixOverrides || null;
    const suppletiveVerbOverrides = suppletivePath?.verbOverrides || null;
    const suppletiveNonactiveTenses = suppletivePath?.nonactiveTenses || null;
    const yawiPresentLongPrefixed = applyYawiPrefix(yawiPresentLong);
    const yawiPresentShortPrefixed = applyYawiPrefix(yawiPresentShort);
    const yawiHabitualPrefixed = applyYawiPrefix(yawiHabitual);
    const yawiCanonicalLongPrefixed = applyYawiPrefix(yawiCanonicalLong);
    const yawiCanonicalShortPrefixed = applyYawiPrefix(yawiCanonicalShort);
    const yawiYuVariantPrefixed = applyYawiPrefix(yawiYuVariant);
    if (suppletiveStemSet?.imperfective && !isPerfectiveTense(tense)) {
        troncoSlot = suppletiveStemSet.imperfective.verb;
        analysisVerb = suppletiveStemSet.imperfective.analysisVerb;
    }
    const isPotencialHabitualNominalProfile = isPotencialHabitualTense(tense)
        && resolvedTenseMode === TENSE_MODE.adjetivo
        && resolvedDerivationMode === DERIVATION_MODE.nonactive;
    const isPotencialHabitualNominalNonactive = isPotencialHabitualNominalProfile;
    const isSustantivoVerbalImpersonalActionProfile = tense === "sustantivo-verbal"
        && resolvedTenseMode === TENSE_MODE.sustantivo
        && resolvedDerivationMode === DERIVATION_MODE.nonactive;
    const isCalificativoInstrumentivoPassiveActionProfile = tense === "calificativo-instrumentivo"
        && resolvedTenseMode === TENSE_MODE.sustantivo
        && resolvedDerivationMode === DERIVATION_MODE.nonactive;
    const isPredicateNominalPassivePredicateProfile = isPredicateNominalTense(tense)
        && resolvedTenseMode === TENSE_MODE.sustantivo
        && resolvedDerivationMode === DERIVATION_MODE.nonactive;
    const isPassiveImpersonalMode =
        (resolvedTenseMode === TENSE_MODE.verbo && resolvedVoiceMode === VOICE_MODE.passive)
        || isPotencialHabitualNominalNonactive
        || isSustantivoVerbalImpersonalActionProfile
        || isCalificativoInstrumentivoPassiveActionProfile
        || isPredicateNominalPassivePredicateProfile;
    const targetValency = isPassiveImpersonalMode ? Math.max(0, sourceValency - 1) : sourceValency;
    let preserveSubjectForPassive = preservePassiveSubject;
    const valencySummary = getVerbValencySummary(parsedVerb);
    const hasOpenObjectSlot = valencySummary.baseObjectSlots > valencySummary.fusionObjectSlots;
    const hasPromotableObject = PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(obj1Slot)
        || fusionPrefixes.some((prefix) => PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix))
        || hasOpenObjectSlot;
    const hasSubjectValent = !isPassiveImpersonalMode || (targetValency > 0 && hasPromotableObject);
    const shouldDelayPretAllomorphy = shouldDelaySlashSupportiveIAllomorphyForPret({
        parsedVerb,
        tense,
        obj1Slot: obj1Slot,
        indirectObjectMarker,
        thirdObjectMarker,
    });
    const allomorphyResult = shouldDelayPretAllomorphy
        ? {
            verb: troncoSlot,
            analysisVerb,
            morphologyObj1: obj1Slot,
            soundSpellingFrames: [],
        }
        : applyObj1Allomorphy({
            verb: troncoSlot,
            analysisVerb,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: obj1Slot,
            obj2: indirectObjectMarker,
            obj3: thirdObjectMarker,
            isPassiveImpersonalMode,
            ...buildObjectAllomorphyMetaOptions(parsedVerb),
        });
    troncoSlot = allomorphyResult.verb;
    analysisVerb = allomorphyResult.analysisVerb;
    let morphologyObj1Slot = allomorphyResult.morphologyObj1;
    let allomorphySoundSpellingFrames = collectNuclearClauseSurfaceSoundSpellingFrames(
        allomorphyResult.soundSpellingFrames
    );
    if (!silent) {
        const resolvedComposerDisplayValue = isVerbInputModeComposer()
            ? resolveVerbInputSource(valorTronco || rawVerb, { mode: VERB_INPUT_MODE.composer }).displayValue
            : "";
        const siguienteValorTronco = isVerbInputModeComposer()
            ? (resolvedComposerDisplayValue || rawVerb)
            : (serializeRegexInputValue(parseInputVerb) || parseInputVerb);
        onEntradaTroncoSync({
            siguienteValorTronco,
        });
    }

    const isNonactive =
        (resolvedTenseMode === TENSE_MODE.verbo && resolvedDerivationMode === DERIVATION_MODE.nonactive)
        || isPotencialHabitualNominalNonactive
        || isSustantivoVerbalImpersonalActionProfile
        || isCalificativoInstrumentivoPassiveActionProfile
        || isPredicateNominalPassivePredicateProfile;
    if (isNonactive && PRETERITO_UNIVERSAL_ORDER.includes(tense)) {
        tense = getCurrentResolvedConjugationSelectionState({ tenseMode: resolvedTenseMode }).tenseValue;
    }
    const resolvedDirectionalRuleMode = resolveDirectionalRuleMode(parsedVerb, {
        isNonactive,
        derivationType: resolvedDerivationType,
    });
    const getCurrentDerivationOptions = (overrides = {}) => {
        const optionVerb = overrides.verb ?? troncoSlot;
        const optionAnalysisVerb = overrides.analysisVerb ?? analysisVerb;
        const optionIsYawi = overrides.isYawi ?? isYawi;
        const optionSuppletiveStemSet = overrides.suppletiveStemSet ?? suppletiveStemSet;
        const reducedPotencialHabitualSource = resolvePotencialHabitualReducedNonactiveSource({
            parsedVerb,
            verb: optionVerb,
            analysisVerb: optionAnalysisVerb,
            obj1Slot: obj1Slot,
            tense,
            tenseMode: resolvedTenseMode,
            derivationMode: resolvedDerivationMode,
        });
        return buildNonactiveDerivationOptions({
            verb: optionVerb,
            analysisVerb: optionAnalysisVerb,
            obj1Slot: obj1Slot,
            parsedVerb,
            directionalPrefix,
            isYawi: optionIsYawi,
            suppletiveStemSet: optionSuppletiveStemSet,
            tense,
            tenseMode: resolvedTenseMode,
            derivationMode: resolvedDerivationMode,
            preferredNonactiveBaseVerb: reducedPotencialHabitualSource?.preferredNonactiveBaseVerb || "",
            preferredNonactiveSourceMeta: reducedPotencialHabitualSource?.preferredNonactiveSourceMeta || null,
            preferredNonactiveSourcePrefix: reducedPotencialHabitualSource?.preferredNonactiveSourcePrefix || "",
        });
    };
    const forwardDerivations = applyGenerateForwardDerivations({
        resolvedDerivationType,
        buildDerivationOptions: ({ verb, analysisVerb, isYawi, suppletiveStemSet }) => ({
            ...getCurrentDerivationOptions({
                verb,
                analysisVerb,
                isYawi,
                suppletiveStemSet,
            }),
            causativeSubtype: getActiveCausativeSubtype(),
        }),
        silent,
        renderVerb: troncoRender,
        obj1Base: baseObj1Slot,
        tense,
        isReflexive,
        initialState: { verb: troncoSlot, analysisVerb, isYawi, suppletiveStemSet },
    });
    if (forwardDerivations.noStemMask) {
        return buildNuclearClauseSurfaceBlockedResult({
            result: forwardDerivations.noStemMask,
            message: GENERATE_WORD_NO_OUTPUT_MESSAGE,
            diagnosticId: "nuclear-clause-surface-forward-derivation-no-stem",
            routeFamily: "forward-derivation",
            routeStage: "no-stem-mask",
            resultMarker: "—",
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: baseObj1Slot,
            poseedor: poseedorSlot,
            verb: troncoSlot,
            renderVerb: troncoRender,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false,
        });
    }
    ({
        verb: troncoSlot,
        analysisVerb,
        isYawi,
        suppletiveStemSet,
    } = forwardDerivations);
    let causativeAllStems = forwardDerivations.causativeAllStems;
    let applicativeAllStems = forwardDerivations.applicativeAllStems;
    let causativeAllStemSpecs = forwardDerivations.causativeAllStemSpecs || null;
    let applicativeAllStemSpecs = forwardDerivations.applicativeAllStemSpecs || null;
    const forwardStemProvenance = (
        !isNonactive
        && resolvedDerivationType === DERIVATION_TYPE.causative
        && forwardDerivations.causativeSelectionMeta
    )
        ? buildForwardDerivationProvenance({
            sourceVerb: troncoRender,
            analysisTarget: analysisVerb,
            tense,
            derivationType: resolvedDerivationType,
            isTransitive: getBaseObjectSlots(parsedVerb) > 0,
            selectedMeta: forwardDerivations.causativeSelectionMeta,
        })
        : null;
    const nonactiveDerivation = applyNonactiveDerivationFromOptions({
        isNonactive,
        derivationType: resolvedDerivationType,
        causativeAllStems,
        applicativeAllStems,
        derivationOptions: getCurrentDerivationOptions(),
    });
    ({
        verb: troncoSlot,
        analysisVerb,
        isYawi,
        suppletiveStemSet,
    } = extractForwardDerivationState(
        nonactiveDerivation,
        { verb: troncoSlot, analysisVerb, isYawi, suppletiveStemSet }
    ));
    let nonactiveAllStems = nonactiveDerivation.nonactiveAllStems;
    let nonactiveAllStemSpecs = Array.isArray(nonactiveDerivation.nonactiveAllStemSpecs)
        ? nonactiveDerivation.nonactiveAllStemSpecs
        : null;
    ({
        obj1: obj1Slot,
        morphologyObj1: morphologyObj1Slot,
        obj1Base: baseObj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        isReflexive,
    } = applyNonactiveGenerateOverrides({
        nonactiveDerivation,
        obj1: obj1Slot,
        morphologyObj1: morphologyObj1Slot,
        obj1Base: baseObj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        isReflexive,
    }));
    const passiveValencyAdjustments = applyPassiveImpersonalSlotAdjustments({
        isPassiveImpersonalMode,
        verb: troncoSlot,
        analysisVerb,
        fusionPrefixes,
        hasLeadingDash: parsedVerb.hasLeadingDash,
        targetValency,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        preserveSubjectForPassive,
        allowPassiveObject,
        morphologyObj1: morphologyObj1Slot,
        hasPromotableObject,
        entradaGrammarObject: explicitEntradaGrammarObject,
    });
    if (passiveValencyAdjustments.blocked === true) {
        return buildNuclearClauseSurfaceBlockedResult({
            result: {
                result: "—",
                surfaceForms: [],
                generationAllowed: false,
                routeRankingAllowed: false,
                valencyObjectSlotGate: passiveValencyAdjustments.valencyObjectSlotGate || null,
            },
            message: GENERATE_WORD_NO_OUTPUT_MESSAGE,
            diagnosticId: passiveValencyAdjustments.diagnosticId || "generation-valency-object-slot-frame-unfixed",
            routeFamily: "generation-valency",
            routeStage: passiveValencyAdjustments.routeStage || "generation-valency-object-slot-gate",
            resultMarker: "—",
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: obj1Slot,
            poseedor: poseedorSlot,
            posicionesFormula,
            verb: troncoSlot,
            renderVerb: troncoRender,
            entradaGrammarObject,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false,
        });
    }
    troncoSlot = passiveValencyAdjustments.verb;
    analysisVerb = passiveValencyAdjustments.analysisVerb;
    pers1Slot = passiveValencyAdjustments.pers1;
    pers2Slot = passiveValencyAdjustments.pers2;
    obj1Slot = passiveValencyAdjustments.obj1;
    indirectObjectMarker = passiveValencyAdjustments.obj2;
    thirdObjectMarker = passiveValencyAdjustments.obj3;
    preserveSubjectForPassive = passiveValencyAdjustments.preserveSubjectForPassive;
    morphologyObj1Slot = passiveValencyAdjustments.morphologyObj1;
    const shouldApplyDerivedAllomorphy = !!getForwardDerivationConfig(resolvedDerivationType);
    if (shouldApplyDerivedAllomorphy) {
        const derivedAllomorphy = applyObj1Allomorphy({
            verb: troncoSlot,
            analysisVerb,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: morphologyObj1Slot,
            obj2: indirectObjectMarker,
            obj3: thirdObjectMarker,
            isPassiveImpersonalMode,
            ...buildObjectAllomorphyMetaOptions(parsedVerb),
        });
        troncoSlot = derivedAllomorphy.verb;
        analysisVerb = derivedAllomorphy.analysisVerb;
        morphologyObj1Slot = derivedAllomorphy.morphologyObj1;
        allomorphySoundSpellingFrames = collectNuclearClauseSurfaceSoundSpellingFrames(
            allomorphySoundSpellingFrames,
            derivedAllomorphy.soundSpellingFrames
        );
    }
    const isWitziNonactive = isNonactive && suppletivePath?.id === "witzi";
    const isWitzInput = validationVerb === "witz";
    const allowConsonantEnding = isWitzInput;
    if (
        isNonactive
        && resolvedTenseMode === TENSE_MODE.verbo
        && suppletiveNonactiveTenses
        && !suppletiveNonactiveTenses.has(tense)
    ) {
        const error = returnIfError("Solo pretérito y pasado remoto.", ["verb"]);
        if (error) return error;
    }
    if (!isNonactive && suppletiveVerbOverrides && Object.prototype.hasOwnProperty.call(suppletiveVerbOverrides, tense)) {
        const overrideVerb = suppletiveVerbOverrides[tense];
        troncoSlot = overrideVerb;
        analysisVerb = overrideVerb;
    }
    if (
        !isNonactive
        && resolvedTenseMode === TENSE_MODE.verbo
        && suppletivePath?.activeTenses
        && !suppletivePath.activeTenses.has(tense)
    ) {
        const error = returnIfError("Solo pretérito y pasado remoto.", ["verb"]);
        if (error) return error;
    }
    isYawiOptativeSingular = isYawi && tense === "optativo" && pers2Slot === "";
    shouldAddYuVariant = isYawi && (tense === "presente" || isYawiOptativeSingular);

    if (validationVerb === "") {
        const message = "El verbo no puede estar vacío. Ingrese verbo.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
    } else {
        clearError("verb");
    }
    if (!VOWEL_RE.test(validationVerb)) {
        const message = "El verbo no está escrito correctamente.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
    } else {
        clearError("verb");
    }
    const authoritativeDerivationalRawInputSource = getAuthoritativeDerivationalSourceForRawInputGate({
        tense,
        patientivoSource,
    });
    const shouldBypassGenericRawInputGates = Boolean(authoritativeDerivationalRawInputSource);
    if (
        !VOWEL_END_RE.test(validationVerb)
        && !allowConsonantEnding
        && !shouldBypassGenericRawInputGates
    ) {
        if (skipValidation) {
            return buildNuclearClauseSurfaceBlockedResult({
                result: {
                    result: "—",
                    error: true,
                    surfaceForms: [],
                    isReflexive,
                },
                message: "El verbo debe terminar en vocal.",
                diagnosticId: "nuclear-clause-surface-final-vowel-gate-blocked",
                routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
                routeStage: "raw-input-final-vowel-gate",
                resultMarker: "—",
                override,
                resolvedTenseMode,
                tense,
                pers1: pers1Slot,
                pers2: pers2Slot,
                obj1: baseObj1Slot,
                poseedor: poseedorSlot,
                verb: troncoSlot,
                renderVerb: troncoRender,
                isReflexive,
                resolvedDerivationMode,
                resolvedDerivationType,
                resolvedVoiceMode,
                enumerableContract: false,
            });
        }
        const message = "El verbo debe terminar en vocal.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
    } else {
        clearError("verb");
    }
    const stemGate = evaluateVerbStemInputGate(rawVerb, parsedVerb);
    if (!stemGate.isValid && !shouldBypassGenericRawInputGates) {
        if (skipValidation) {
            return buildNuclearClauseSurfaceBlockedResult({
                result: {
                    result: "—",
                    error: true,
                    surfaceForms: [],
                    isReflexive,
                },
                message: "El segmento final del verbo no cumple un patrón silábico válido.",
                diagnosticId: "nuclear-clause-surface-stem-syllable-gate-blocked",
                routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
                routeStage: "raw-input-stem-syllable-gate",
                resultMarker: "—",
                override,
                resolvedTenseMode,
                tense,
                pers1: pers1Slot,
                pers2: pers2Slot,
                obj1: baseObj1Slot,
                poseedor: poseedorSlot,
                verb: troncoSlot,
                renderVerb: troncoRender,
                isReflexive,
                resolvedDerivationMode,
                resolvedDerivationType,
                resolvedVoiceMode,
                enumerableContract: false,
            });
        }
        const message = "El segmento final del verbo no cumple un patrón silábico válido.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
    } else {
        clearError("verb");
    }
    if (isYawi && (tense === "presente" || isYawiOptativeSingular)) {
        const useLongYawiSlot = pers2Slot === "t" || pers1Slot === "";
        if (useLongYawiSlot) {
            troncoSlot = yawiPresentLongPrefixed;
        } else {
            troncoSlot = yawiPresentShortPrefixed;
        }
    }
    if (isYawi && (tense === "presente-habitual" || tense === "agentivo" || tense === "potencial-habitual")) {
        troncoSlot = yawiHabitualPrefixed;
    }
    const resetSubjectOverride = {
        ...(override && typeof override === "object" ? override : {}),
    };
    if (posicionesFormula && Object.prototype.hasOwnProperty.call(posicionesFormula, "pers1")) {
        resetSubjectOverride.pers1 = pers1Slot;
    }
    if (posicionesFormula && (
        Object.prototype.hasOwnProperty.call(posicionesFormula, "pers2")
        || Object.prototype.hasOwnProperty.call(posicionesFormula, "num2")
    )) {
        resetSubjectOverride.pers2 = pers2Slot;
    }
    ({ pers1: pers1Slot, pers2: pers2Slot } = resetPers1Pers2ForNominalTiempos({
        tiempo: tense,
        override: resetSubjectOverride,
        pers1: pers1Slot,
        pers2: pers2Slot,
    }));
    const isPassiveImpersonal = isPassiveImpersonalMode;
    if (isPassiveImpersonal) {
        const passiveOverrides = applyPassiveImpersonalSlotOverrides({
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: obj1Slot,
            analysisVerb,
            preserveSubjectForPassive,
            allowPassiveObject,
            entradaGrammarObject: explicitEntradaGrammarObject,
        });
        if (passiveOverrides.blocked === true) {
            return buildNuclearClauseSurfaceBlockedResult({
                result: {
                    result: "—",
                    surfaceForms: [],
                    generationAllowed: false,
                    routeRankingAllowed: false,
                    valencyObjectSlotGate: passiveOverrides.valencyObjectSlotGate || null,
                },
                message: GENERATE_WORD_NO_OUTPUT_MESSAGE,
                diagnosticId: passiveOverrides.diagnosticId || "generation-valency-object-slot-frame-unfixed",
                routeFamily: "generation-valency",
                routeStage: passiveOverrides.routeStage || "generation-valency-object-slot-gate",
                resultMarker: "—",
                override,
                resolvedTenseMode,
                tense,
                pers1: pers1Slot,
                pers2: pers2Slot,
                obj1: obj1Slot,
                poseedor: poseedorSlot,
                posicionesFormula,
                verb: troncoSlot,
                renderVerb: troncoRender,
                entradaGrammarObject,
                isReflexive,
                resolvedDerivationMode,
                resolvedDerivationType,
                resolvedVoiceMode,
                enumerableContract: false,
            });
        }
        pers1Slot = passiveOverrides.pers1;
        pers2Slot = passiveOverrides.pers2;
        obj1Slot = passiveOverrides.obj1;
        morphologyObj1Slot = passiveOverrides.morphologyObj1;
    }

    const allowReflexiveAutoSwitch =
        (!indirectObjectMarker && !thirdObjectMarker) || resolvedDerivationType === DERIVATION_TYPE.applicative;
    const reflexiveUpdate = allowReflexiveAutoSwitch
        ? applyReflexivoAutoSwitch({
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: obj1Slot,
            isPassiveImpersonal,
            entradaGrammarObject,
            clearError,
        })
        : { obj1Slot: obj1Slot, isReflexive: obj1Slot === "mu" };
    if (reflexiveUpdate.blocked === true) {
        return buildNuclearClauseSurfaceBlockedResult({
            result: {
                result: "—",
                surfaceForms: [],
                generationAllowed: false,
                routeRankingAllowed: false,
                valencyObjectSlotGate: reflexiveUpdate.valencyObjectSlotGate || null,
            },
            message: GENERATE_WORD_NO_OUTPUT_MESSAGE,
            diagnosticId: reflexiveUpdate.diagnosticId || "generation-valency-object-slot-frame-unfixed",
            routeFamily: "generation-valency",
            routeStage: reflexiveUpdate.routeStage || "generation-valency-object-slot-gate",
            resultMarker: "—",
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: obj1Slot,
            poseedor: poseedorSlot,
            posicionesFormula,
            verb: troncoSlot,
            renderVerb: troncoRender,
            entradaGrammarObject,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false,
        });
    }
    obj1Slot = reflexiveUpdate.obj1 ?? reflexiveUpdate.obj1Slot;
    isReflexive = reflexiveUpdate.isReflexive;

    const isCalificativoInstrumentivo = tense === "calificativo-instrumentivo";
    const isNounTense = isNonanimateNounTense(tense)
        || isPotencialProfileTense(tense)
        || isPatientivoAdjectiveProfile
        || tense === "agentivo"
        || isPresentAgentivoNominalProfile
        || isPreteritAgentivoNominalProfile
        || isFutureAgentivoNominalProfile
        || tense === "patientivo"
        || tense === "instrumentivo"
        || isPredicateNominalTense(tense)
        || tense === "calificativo-instrumentivo"
        || tense === "locativo-temporal";
    const invalidComboObjectPrefix = resolveComboValidationObj1({
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
        derivationType: resolvedDerivationType,
    });
    if (!skipValidation && !isNounTense && INVALID_COMBINATION_KEYS.has(
        getPers1Obj1Pers2Key(pers1Slot, invalidComboObjectPrefix, pers2Slot)
    )) {
        const message = "Combinacion inválida";
        const error = returnIfError(message, [
            "subject-prefix",
            "object-prefix",
            "subject-suffix",
        ]);
        if (error) return error;
    }
    clearError("object-prefix");

    if (isNounTense) {
        const sourceSubjectMapsToPossessor = tense === "calificativo-instrumentivo"
            && actionNounStemUse === "general-use";
        if (
            isNonanimateNounTense(tense)
            && !sourceSubjectMapsToPossessor
            && !isNonanimatePers1Pers2(pers1Slot, pers2Slot)
        ) {
            const message = tense === "sustantivo-verbal"
                ? "Sustantivo verbal solo con 3a persona no animada común."
                : "Solo 3a persona no animada (singular o plural).";
            const error = returnIfError(message, ["subject-prefix", "subject-suffix"]);
            if (error) return error;
        }
        const isTransitiveVerb = getBaseObjectSlots(parsedVerb) > 0;
        if (
            (
                (tense === "patientivo" && patientivoSource === "tronco-verbal")
                || (isPatientivoAdjectiveProfile && getPatientivoAdjectiveSourceForTense(tense) === "tronco-verbal")
            )
            && isTransitiveVerb
            && !obj1Slot
        ) {
            obj1Slot = "ta";
            morphologyObj1Slot = "ta";
        }
        if (
            resolvedTenseMode === TENSE_MODE.adjetivo
            && isIntransitiveOnlyActiveAdjectiveTense(tense)
            && isTransitiveVerb
        ) {
            if (skipValidation) {
                return buildNuclearClauseSurfaceBlockedResult({
                    result: {
                        result: "—",
                        error: true,
                        surfaceForms: [],
                        isReflexive,
                    },
                    message: "Adjetivo activo solo para verbos intransitivos.",
                    diagnosticId: "nuclear-clause-surface-active-adjective-transitive-blocked",
                    routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
                    routeStage: "adjective-active-valency-gate",
                    resultMarker: "—",
                    override,
                    resolvedTenseMode,
                    tense,
                    pers1: pers1Slot,
                    pers2: pers2Slot,
                    obj1: obj1Slot,
                    poseedor: poseedorSlot,
                    verb: troncoSlot,
                    renderVerb: troncoRender,
                    isReflexive,
                    resolvedDerivationMode,
                    resolvedDerivationType,
                    resolvedVoiceMode,
                    enumerableContract: false,
                });
            }
            const error = returnIfError(
                "Adjetivo activo solo para verbos intransitivos.",
                ["verb"]
            );
            if (error) return error;
        }
        const nounCombinedMode = resolvedDerivationMode === DERIVATION_MODE.nonactive
            ? COMBINED_MODE.nonactive
            : COMBINED_MODE.active;
        const slotPlanBundle = getNounObjectSlotPlansFromMeta(parsedVerb, tense, {
            combinedMode: nounCombinedMode,
        });
        const slotPlans = slotPlanBundle.slotPlans;
        const selectedBySlot = {
            object: obj1Slot || "",
            object2: indirectObjectMarker || "",
            object3: thirdObjectMarker || "",
        };
        const hasDerivedValencyIncrease = getDerivationValencyDelta(resolvedDerivationType) > 0;
        const derivationLabel = getDerivationTypeDisplayLabel(resolvedDerivationType, false).toLowerCase();
        const derivedSlots = slotPlans.filter((slotPlan) => slotPlan.isAddedSlot);
        const allowCollapsedDerivedSlot = allowsCollapsedDerivedNounSlot({
            tenseValue: tense,
            combinedMode: nounCombinedMode,
            slotPlanBundle,
            derivationType: resolvedDerivationType,
        });
        if (hasDerivedValencyIncrease && !derivedSlots.length && !allowCollapsedDerivedSlot) {
            const error = returnIfError(
                `La derivación ${derivationLabel} no tiene espacio para prefijo no específico (ta/te/mu).`,
                ["object-prefix"]
            );
            if (error) return error;
        }
        const overflowedSlot = NOUN_OBJECT_SLOT_SCHEMA
            .slice(slotPlans.length)
            .find((slotMeta) => Boolean(selectedBySlot[slotMeta.id]));
        if (overflowedSlot) {
            const derivationLabel = getDerivationTypeDisplayLabel(resolvedDerivationType, false).toLowerCase();
            const error = returnIfError(
                `La derivación ${derivationLabel} no tiene espacio para marcadores de valencia adicionales.`,
                ["object-prefix"]
            );
            if (error) return error;
        }
        const invalidSlotPlan = slotPlans.find((slotPlan) => (
            !slotPlan.toggleValues.includes(selectedBySlot[slotPlan.id] || "")
        ));
        if (invalidSlotPlan) {
            if (invalidSlotPlan.id !== "object") {
                const slotNumber = Number.isFinite(invalidSlotPlan.index) ? invalidSlotPlan.index + 1 : 2;
                const error = returnIfError(
                    `Derivación ${derivationLabel} nominal requiere ta/te/mu en objeto ${slotNumber}.`,
                    ["object-prefix"]
                );
                if (error) return error;
            }
            if (isCalificativoInstrumentivo) {
                if (isTransitiveVerb && slotPlans.length > 0) {
                    const error = returnIfError("Calificativo transitivo solo con ta/te/mu.", ["object-prefix"]);
                    if (error) return error;
                } else {
                    const error = returnIfError("Calificativo intransitivo va sin prefijo.", ["object-prefix"]);
                    if (error) return error;
                }
            }
            const primaryUsesDerivedSlot = slotPlans[0]?.isAddedSlot === true;
            const transitiveMessage = (() => {
                if (hasDerivedValencyIncrease && primaryUsesDerivedSlot) {
                    return `Derivación ${derivationLabel} nominal transitiva solo con ta/te/mu.`;
                }
                switch (tense) {
                    case "agentivo":
                        return "Agentivo transitivo solo con ta/te/mu.";
                    case "patientivo":
                        return "Patientivo transitivo solo con ta/te/mu o Ø.";
                    case "instrumentivo":
                        return "Instrumentivo transitivo solo con ta/te/mu o Ø.";
                    case "potencial":
                        return "Potencial transitivo solo con Ø.";
                    case "adjetivo-preterito":
                    case "adjetivo-perfecto":
                    case "adjetivo-preterito-tik":
                    case "adjetivo-perfecto-tik":
                    case "adjetivo-preterito-naj":
                    case "adjetivo-perfecto-naj":
                        return "Adjetivo activo solo para verbos intransitivos.";
                    case "adjetivo-patientivo-no-activo":
                    case "adjetivo-patientivo-perfectivo":
                        return "Adjetivo patientivo transitivo solo con ta/te/mu o Ø.";
                    case "potencial-habitual":
                        return "Adjetivo no activo transitivo solo con ta/te/mu.";
                    case "pasado-remoto-adverbio-activo":
                        return "Adverbio activo transitivo solo con ta/te/mu.";
                    case "sustantivo-verbal":
                        return "Sustantivo verbal transitivo solo con ta/te/mu.";
                    default:
                        return "Sustantivo verbal transitivo solo con ta/te/mu.";
                }
            })();
            const intransitiveMessage = (() => {
                switch (tense) {
                    case "agentivo":
                        return "Agentivo intransitivo va sin prefijo.";
                    case "patientivo":
                        return "Patientivo intransitivo va sin prefijo.";
                    case "instrumentivo":
                        return "Instrumentivo intransitivo va sin prefijo.";
                    case "potencial":
                        return "Potencial intransitivo va sin prefijo.";
                    case "adjetivo-preterito":
                    case "adjetivo-perfecto":
                    case "adjetivo-preterito-tik":
                    case "adjetivo-perfecto-tik":
                    case "adjetivo-preterito-naj":
                    case "adjetivo-perfecto-naj":
                        return "Adjetivo activo solo para verbos intransitivos.";
                    case "adjetivo-patientivo-no-activo":
                    case "adjetivo-patientivo-perfectivo":
                        return "Adjetivo patientivo intransitivo va sin prefijo.";
                    case "potencial-habitual":
                        return "Adjetivo no activo intransitivo va sin prefijo.";
                    case "pasado-remoto-adverbio-activo":
                        return "Adverbio activo intransitivo va sin prefijo.";
                    default:
                        return "Sustantivo verbal intransitivo va sin prefijo.";
                }
            })();
            if (tense === "pasado-remoto-adverbio-activo" && skipValidation) {
                const blockedSlotKey = invalidSlotPlan.id === "object2"
                    ? "obj2"
                    : (invalidSlotPlan.id === "object3" ? "obj3" : "obj1");
                const functionUseValenceGate = buildFunctionUseValenceObjectHardGate({
                    override,
                    posicionesFormula,
                    sourceKind: "verbal-nuclear-clause",
                    currentVector: {
                        obj1: obj1Slot,
                        obj2: indirectObjectMarker,
                        obj3: thirdObjectMarker,
                        reflexivo: isReflexive ? "mu" : "",
                    },
                    forceBlockedReason: isTransitiveVerb && slotPlans.length > 0
                        ? "function-use-would-relocate-or-reclassify-valence-object"
                        : "function-use-would-invent-valence-object",
                    currentVectorOwnsValenceObjectSlots: true,
                    gateContext: "adverbial-nuclear-function-use",
                    licensedCurrentValues: {
                        [blockedSlotKey]: (Array.isArray(invalidSlotPlan.toggleValues)
                            ? invalidSlotPlan.toggleValues
                            : [])
                            .filter(Boolean),
                    },
                });
                return buildNuclearClauseSurfaceBlockedResult({
                    result: {
                        outputKind: "adverbial-nuclear-function",
                        generationRoute: "adverbio",
                        clauseKind: "verbal-nuclear-clause",
                        result: "—",
                        error: true,
                        supported: false,
                        surfaceForms: [],
                        isReflexive,
                        functionUseValenceGate,
                    },
                    message: isTransitiveVerb && slotPlans.length > 0 ? transitiveMessage : intransitiveMessage,
                    diagnosticId: functionUseValenceGate.diagnosticId,
                    routeFamily: "adverbial-nuclear-function",
                    routeStage: functionUseValenceGate.routeStage,
                    resultMarker: "—",
                    override,
                    resolvedTenseMode,
                    tense,
                    pers1: pers1Slot,
                    pers2: pers2Slot,
                    obj1: obj1Slot,
                    poseedor: poseedorSlot,
                    posicionesFormula,
                    verb: troncoSlot,
                    renderVerb: troncoRender,
                    isReflexive,
                    resolvedDerivationMode,
                    resolvedDerivationType,
                    resolvedVoiceMode,
                    enumerableContract: false,
                });
            }
            if (isTransitiveVerb && slotPlans.length > 0) {
                const error = returnIfError(transitiveMessage, ["object-prefix"]);
                if (error) return error;
            }
            const error = returnIfError(intransitiveMessage, ["object-prefix"]);
            if (error) return error;
        }
        if (slotPlans.length >= 3 && !isValidObj1Obj2Obj3Combo({
            obj1: obj1Slot,
            obj2: indirectObjectMarker,
            obj3: thirdObjectMarker,
        })) {
            const error = returnIfError(
                "Combinación de objetos no permitida para valencia nominal 4.",
                ["object-prefix"]
            );
            if (error) return error;
        }
        if (!slotPlans.length) {
            const hasUnexpectedObjectMarker = Boolean(
                selectedBySlot.object
                || selectedBySlot.object2
                || selectedBySlot.object3
            );
            if (hasUnexpectedObjectMarker) {
                const intransitiveMessage = (() => {
                    switch (tense) {
                        case "agentivo":
                            return "Agentivo intransitivo va sin prefijo.";
                        case "patientivo":
                            return "Patientivo intransitivo va sin prefijo.";
                        case "instrumentivo":
                            return "Instrumentivo intransitivo va sin prefijo.";
                        case "potencial":
                            return "Potencial intransitivo va sin prefijo.";
                        case "adjetivo-preterito":
                        case "adjetivo-perfecto":
                        case "adjetivo-preterito-tik":
                        case "adjetivo-perfecto-tik":
                        case "adjetivo-preterito-naj":
                        case "adjetivo-perfecto-naj":
                            return "Adjetivo activo solo para verbos intransitivos.";
                        case "adjetivo-patientivo-no-activo":
                        case "adjetivo-patientivo-perfectivo":
                            return "Adjetivo patientivo intransitivo va sin prefijo.";
                        case "potencial-habitual":
                            return "Adjetivo no activo intransitivo va sin prefijo.";
                        case "pasado-remoto-adverbio-activo":
                            return "Adverbio activo intransitivo va sin prefijo.";
                        default:
                            return "Sustantivo verbal intransitivo va sin prefijo.";
                    }
                })();
                const error = returnIfError(intransitiveMessage, ["object-prefix"]);
                if (error) return error;
            }
        }
    }

    if (isWitziNonactive && tense === "preterito" && pers2Slot === "t") {
        pers2Slot = "et";
    }
    if (
        isPotencialHabitualNominalProfile
        && sourceSelectedProjectiveObjectPrefix === "mu"
    ) {
        morphologyObj1Slot = "ne";
    }
    const skipPretClass = isWitziNonactive && SUPPLETIVE_WITZI_NONACTIVE_TENSES.has(tense);
    const isUnderlyingTransitive = !isNonactive
        ? (resolvedDerivationType === DERIVATION_TYPE.causative || parsedVerb.isMarkedTransitive || parsedVerb.isTaFusion)
        : Boolean(morphologyObj1Slot || indirectObjectMarker || thirdObjectMarker || parsedVerb.isTaFusion);
    const forceTransitiveBase = parsedVerb.isTaFusion || isUnderlyingTransitive;

    if (!silent) {
        onAnalisisTroncoResuelto({
            tronco: troncoSlot,
            troncoAnalisis: analysisVerb,
            troncoAnalisisExacto: analysisExactVerb,
            obj1Morfologico: morphologyObj1Slot,
            fuerzaTransitivaBase: forceTransitiveBase,
            isYawi,
            isWeya,
            resolvedDerivationType,
            parsedVerb,
            troncoRender: troncoRender,
        });
    }

    const formulaStemBeforeInflection = troncoSlot;
    const baseMorphologyInput = {
        pers1: pers1Slot,
        obj1: morphologyObj1Slot,
        pers2: pers2Slot,
        subjectPrefix: pers1Slot,
        objectPrefix: morphologyObj1Slot,
        subjectSuffix: pers2Slot,
        pers1Slot: pers1Slot,
        obj1Slot: morphologyObj1Slot,
        pers2Slot: pers2Slot,
        verb: troncoSlot,
        tense,
        analysisVerb,
        rawAnalysisVerb: parsedVerb.rawAnalysisVerb,
        rawVerb,
        sourceRawVerb: parsedVerb.sourceRawVerb,
        analysisExactVerb,
        verbMeta: parsedVerb,
        isYawi,
        isWeya,
        directionalPrefix,
        directionalRuleMode: resolvedDirectionalRuleMode,
        suppletiveStemSet,
        suppletiveTenseSuffixes,
        ...buildMorphologyMetaOptions(parsedVerb, {
            hasDoubleDash: parsedVerb.hasDoubleDash,
            indirectObjectMarker,
            isUnderlyingTransitive,
        }),
        thirdObjectMarker,
        skipPretClass,
        hasSubjectValent,
        boundPrefix: parsedVerb.hasBoundMarker
            ? (
                parsedVerb.sourcePrefix
                || parsedVerb.canonical?.sourcePrefix
                || (parsedVerb.boundPrefixes || []).join("")
            )
            : "",
        embeddedPrefix: getEmbeddedVerbPrefix(parsedVerb),
        boundPrefixes: Array.isArray(parsedVerb.boundPrefixes) ? parsedVerb.boundPrefixes.slice() : [],
        boundExplicitFlags: Array.isArray(parsedVerb.boundExplicitFlags) ? parsedVerb.boundExplicitFlags.slice() : [],
        directionalPrefixFromSlash: parsedVerb.directionalPrefixFromSlash
            || parsedVerb.canonical?.directionalPrefixFromSlash
            || "",
        sourceSplitPrefix: parsedVerb.hasBoundMarker
            ? (parsedVerb.sourcePrefix || parsedVerb.canonical?.sourcePrefix || "")
            : "",
        sourceCompositeBase: parsedVerb.canonical?.slashCompositeRuleBase || "",
        verbSegment: parsedVerb.verbSegment || "",
        patientivoOwnership: override?.patientivoOwnership ?? DEFAULT_PATIENTIVO_OWNERSHIP,
        patientivoSource,
        patientivoNominalSuffix,
        passivePatientivoSelectedProjectiveObjectPrefix,
        possessivePrefix: poseedorSlot,
        poseedorSlot: poseedorSlot,
        actionNounStemUse,
        predicateNominalSourceTense,
        combinedMode: isNonactive ? COMBINED_MODE.nonactive : COMBINED_MODE.active,
        customaryPresentPatientiveNnc: isPotencialHabitualNominalProfile,
        customaryPresentPatientivePlural: isPotencialHabitualNominalProfile && inputPers2 === "t",
        customaryPresentPatientiveSelectedProjectiveObjectPrefix,
        instrumentivoMode: overrideInstrumentivoMode || (poseedorSlot === ""
            ? INSTRUMENTIVO_MODE.absolutivo
            : INSTRUMENTIVO_MODE.posesivo),
        derivationType: resolvedDerivationType,
        isNonactiveMode: isNonactive,
        stemProvenanceSeed: forwardStemProvenance,
        entradaGrammarObject,
    };
    appliedMorphology = applyMorphologyRules(baseMorphologyInput);
    if (!appliedMorphology?.error && allomorphySoundSpellingFrames.length) {
        appliedMorphology = {
            ...appliedMorphology,
            soundSpellingFrames: collectNuclearClauseSurfaceSoundSpellingFrames(
                allomorphySoundSpellingFrames,
                appliedMorphology?.soundSpellingFrames
            ),
        };
    }
    if (appliedMorphology?.error) {
        return buildNuclearClauseSurfaceBlockedResult({
            result: { ...appliedMorphology, error: true },
            message: GENERATE_WORD_NO_OUTPUT_MESSAGE,
            diagnosticId: appliedMorphology.valencyObjectSlotGate?.diagnosticId
                || "nuclear-clause-surface-morphology-application-blocked",
            routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
            routeStage: appliedMorphology.valencyObjectSlotGate?.routeStage
                || "morphology-application",
            resultMarker: null,
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: morphologyObj1Slot,
            poseedor: poseedorSlot,
            verb: troncoSlot,
            renderVerb: troncoRender,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false,
        });
    }
    const classPerfectiveFormulaProfile = buildGeneratedClassPerfectiveFormulaProfile({
        tense,
        surfaceForms: [
            appliedMorphology?.verb || "",
            ...(Array.isArray(appliedMorphology?.alternateForms)
                ? appliedMorphology.alternateForms.map((form) => form?.verb || "")
                : []),
        ],
        subjectPrefix: inputPers1,
        objectPrefix: morphologyObj1Slot,
        sourceSubjectSuffix: inputPers2,
        sourceStem: formulaStemBeforeInflection,
    });
    const formulaStemForSlots = classPerfectiveFormulaProfile?.base || formulaStemBeforeInflection;
    const formulaStemContext = { stem: formulaStemForSlots, pers1: inputPers1 };
    const realizedFormulaObj1Slot = String(
        isReflexive ? "mu" : (classPerfectiveFormulaProfile?.objectPrefix || appliedMorphology?.objectPrefix || morphologyObj1Slot)
    );
    const foldedPreteritFormulaObj1Slot = (
        !isReflexive
        && !realizedFormulaObj1Slot
        && morphologyObj1Slot
        && tense === "preterito"
    )
        ? getGeneratedPreteritFoldedObjectPrefix(morphologyObj1Slot, inputPers1)
        : realizedFormulaObj1Slot;
    let formulaReflexiveBeforeInflection = isReflexive ? getLesson6DirectNawatFormulaObjectPrefix("mu", formulaStemContext) : "";
    let formulaObj1BeforeInflection = isReflexive
        ? formulaReflexiveBeforeInflection
        : (classPerfectiveFormulaProfile?.formulaObject || getLesson6DirectNawatFormulaObjectPrefix(foldedPreteritFormulaObj1Slot, formulaStemContext));
    const formulaObj2BeforeInflection = getLesson6DirectNawatFormulaObjectPrefix(indirectObjectMarker, formulaStemContext);
    const formulaObj3BeforeInflection = getLesson6DirectNawatFormulaObjectPrefix(thirdObjectMarker, formulaStemContext);
    if (isPotencialHabitualNominalProfile) {
        const customaryPresentSubjectSuffix = String(appliedMorphology.subjectSuffix || "");
        const customaryPresentPluralSuffix = inputPers2 === "t" ? "met" : "";
        const keepSelectedProjectiveInPatientiveStem = (stem = "") => {
            const normalizedStem = String(stem || "");
            if (!customaryPresentPatientiveSelectedProjectiveObjectPrefix || !normalizedStem) {
                return normalizedStem;
            }
            return normalizedStem.startsWith(customaryPresentPatientiveSelectedProjectiveObjectPrefix)
                ? normalizedStem
                : `${customaryPresentPatientiveSelectedProjectiveObjectPrefix}${normalizedStem}`;
        };
        const shouldMoveCustomaryPresentNi = customaryPresentSubjectSuffix === "ni"
            || customaryPresentSubjectSuffix === "nit";
        const customaryPresentVerb = keepSelectedProjectiveInPatientiveStem(shouldMoveCustomaryPresentNi
            ? `${appliedMorphology.verb || ""}ni`
            : appliedMorphology.verb);
        const customaryPresentConnector = shouldMoveCustomaryPresentNi
            ? customaryPresentPluralSuffix
            : customaryPresentSubjectSuffix;
        appliedMorphology = {
            ...appliedMorphology,
            verb: customaryPresentVerb,
            subjectSuffix: customaryPresentConnector,
            formSpec: isNominalOutputProfile
                ? buildLiteralNominalFormSpec(customaryPresentVerb, customaryPresentConnector)
                : appliedMorphology.formSpec,
            alternateForms: (appliedMorphology.alternateForms || []).map((form) => {
                const formSubjectSuffix = String(form.subjectSuffix || "");
                const moveFormNi = formSubjectSuffix === "ni" || formSubjectSuffix === "nit";
                const formVerb = keepSelectedProjectiveInPatientiveStem(
                    moveFormNi ? `${form.verb || ""}ni` : form.verb
                );
                const formConnector = moveFormNi ? customaryPresentPluralSuffix : formSubjectSuffix;
                return {
                    ...form,
                    verb: formVerb,
                    subjectSuffix: formConnector,
                    formSpec: isNominalOutputProfile
                        ? buildLiteralNominalFormSpec(formVerb, formConnector)
                        : form.formSpec,
                };
            }),
        };
    }
    ({
        subjectPrefix: pers1Slot,
        objectPrefix: obj1Slot,
        subjectSuffix: pers2Slot,
        verb: troncoSlot,
    } = appliedMorphology);
    const isPatientivoPossessed = tense === "patientivo" && Boolean(poseedorSlot);
    if (isPatientivoPossessed) {
        pers2Slot = adjustPatientivoPossessiveSuffix(
            pers2Slot,
            true,
            patientivoOwnership,
            {
                stem: troncoSlot,
            }
        );
        if (pers2Slot === null) {
            return buildNuclearClauseSurfaceBlockedResult({
                result: { error: true },
                message: GENERATE_WORD_NO_OUTPUT_MESSAGE,
                diagnosticId: "nuclear-clause-surface-patientivo-possessive-suffix-blocked",
                routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
                routeStage: "patientivo-possessive-suffix",
                resultMarker: null,
                override,
                resolvedTenseMode,
                tense,
                pers1: pers1Slot,
                pers2: "",
                obj1: obj1Slot,
                poseedor: poseedorSlot,
                verb: troncoSlot,
                renderVerb: troncoRender,
                isReflexive,
                resolvedDerivationMode,
                resolvedDerivationType,
                resolvedVoiceMode,
                enumerableContract: false,
            });
        }
    }
    primaryFormSpec = appliedMorphology.formSpec
        || (isNominalOutputProfile ? buildLiteralNominalFormSpec(troncoSlot, pers2Slot) : null);
    let formulaShellVerb = stripGeneratedVncFormulaTenseSuffix(
        isNonactive ? troncoSlot : formulaStemForSlots,
        tense,
        inputPers2
    );
    let formulaShellSubjectSuffix = "";
    const directionalFormulaFrame = buildGeneratedDirectionalFormulaFrame({
        directionalChainMeta: appliedMorphology?.directionalChainMeta || null,
        subjectPrefix: inputPers1,
        baseObjectPrefix: morphologyObj1Slot,
        formulaObjectPrefix: formulaObj1BeforeInflection,
        formulaReflexivePrefix: formulaReflexiveBeforeInflection,
    });
    if (directionalFormulaFrame) {
        formulaShellVerb = stripGeneratedDirectionalPrefixFromFormulaStem(
            formulaShellVerb,
            appliedMorphology?.directionalChainMeta || null
        );
        formulaObj1BeforeInflection = isReflexive ? "" : directionalFormulaFrame.formulaObj1;
        formulaReflexiveBeforeInflection = isReflexive
            ? (directionalFormulaFrame.formulaReflexive || formulaReflexiveBeforeInflection)
            : formulaReflexiveBeforeInflection;
    }
    let formulaShellCapturedFromStemCandidate = false;
    if (isNominalOutputProfile && isPatientivoPossessed) {
        primaryFormSpec = withNominalFormSpecSuffix(primaryFormSpec, pers2Slot, {
            verb: troncoSlot,
            subjectSuffix: pers2Slot,
        });
    }
    const alternateForms = (appliedMorphology.alternateForms || []).map((form) => {
        if (!form) {
            return form;
        }
        if (!isPatientivoPossessed) {
            return isNominalOutputProfile
                ? normalizeNominalFormEntry(form, {
                    subjectSuffix: pers2Slot,
                })
                : form;
        }
        const adjustedSubjectSuffix = adjustPatientivoPossessiveSuffix(
            form.subjectSuffix ?? pers2Slot,
            true,
            patientivoOwnership,
            {
                stem: form.verb,
            }
        );
        return {
            ...form,
            subjectSuffix: adjustedSubjectSuffix,
            formSpec: isNominalOutputProfile
                ? withNominalFormSpecSuffix(form.formSpec || null, adjustedSubjectSuffix, {
                    verb: form.verb,
                    subjectSuffix: adjustedSubjectSuffix,
                })
                : form.formSpec,
        };
    }).filter((form) => form && form.subjectSuffix !== null);
    const preteritCnvConnectorProfile = buildGeneratedPreteritCnvConnectorProfile({
        tense,
        primaryVerb: appliedMorphology?.verb || "",
        alternateForms,
        sourceSubjectSuffix: inputPers2,
    });
    let stemProvenance = appliedMorphology.stemProvenance || null;
    const verbstemClassProfile = stemProvenance?.verbstemClassProfile
        || (typeof buildVncVerbstemClassProfileFromProvenance === "function"
            ? buildVncVerbstemClassProfileFromProvenance(stemProvenance)
            : null);
    if (stemProvenance && verbstemClassProfile && !stemProvenance.verbstemClassProfile) {
        stemProvenance = {
            ...stemProvenance,
            verbstemClassProfile,
        };
    }
    let forms = [];
    const embeddedPrefix = getEmbeddedVerbPrefix(parsedVerb);
    const stemMorphologyArgs = {
        baseMorphologyInput,
        directionalPrefix,
        embeddedPrefix,
        shouldApplyDerivedAllomorphy,
        isPassiveImpersonalMode,
        parsedVerb,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        isNominalOutputProfile,
        tense,
        poseedor: poseedorSlot,
        patientivoOwnership,
        isYawi,
    };
    const stemCollectionPool = resolveStemCollectionPool({
        isNonactive,
        nonactiveAllStems,
        nonactiveAllStemSpecs,
        resolvedDerivationType,
        causativeAllStems,
        applicativeAllStems,
        causativeAllStemSpecs,
        applicativeAllStemSpecs,
    });
    if (Array.isArray(stemCollectionPool) && stemCollectionPool.length > 1) {
        stemCollectionPool.forEach((stemCandidate) => {
            const morphResult = resolveStemCandidateMorphologyResult({
                stemCandidate,
                ...stemMorphologyArgs,
            });
            if (!morphResult) {
                return;
            }
            if (!formulaShellCapturedFromStemCandidate) {
                formulaShellVerb = stripGeneratedVncFormulaTenseSuffix(morphResult.verb, tense, inputPers2);
                formulaShellSubjectSuffix = "";
                formulaShellCapturedFromStemCandidate = true;
            }
            const baseText = buildSurfaceFromSlotParts({
                pers1Slot: morphResult.pers1,
                obj1Slot: morphResult.obj1,
                pers2Slot: morphResult.pers2,
                troncoSlot: morphResult.verb,
                formSpec: morphResult.formSpec,
                trailingSuffix: morphResult.trailingSuffix || "",
                isYawiOptative: morphResult.isYawiOptative,
                directionalChainMeta: morphResult.directionalChainMeta,
                surfaceRuleMeta: mergeSurfaceRuleMeta(morphResult.surfaceRuleMeta, suppletiveStemSet?.surfaceRuleMeta),
            });
            pushGeneratedSurfaceForm(baseText);
            morphResult.alternateForms.forEach((form) => {
                if (!form || !form.verb) {
                    return;
                }
                const altText = buildSurfaceFromSlotParts({
                    pers1Slot: morphResult.pers1,
                    obj1Slot: form.surfaceObjectPrefix ?? morphResult.obj1,
                    pers2Slot: form.subjectSuffix,
                    troncoSlot: form.verb,
                    formSpec: form.formSpec,
                    trailingSuffix: form.trailingSuffix || "",
                    isYawiOptative: morphResult.isYawiOptative,
                    directionalChainMeta: morphResult.directionalChainMeta,
                    surfaceRuleMeta: mergeSurfaceRuleMeta(
                        morphResult.surfaceRuleMeta,
                        suppletiveStemSet?.surfaceRuleMeta,
                        form.surfaceRuleMeta
                    ),
                });
                pushGeneratedSurfaceForm(altText);
            });
        });
    } else {
        const baseText = buildSurfaceFromCurrentSlots();
        pushGeneratedSurfaceForm(baseText);
        alternateForms.forEach((form) => {
            if (!form || !form.verb) {
                return;
            }
            const altText = buildSurfaceFromSlotParts({
                pers1Slot: pers1Slot,
                obj1Slot: form.surfaceObjectPrefix ?? obj1Slot,
                pers2Slot: form.subjectSuffix ?? pers2Slot,
                troncoSlot: form.verb,
                formSpec: form.formSpec || null,
                trailingSuffix: form.trailingSuffix || "",
                directionalChainMeta: appliedMorphology?.directionalChainMeta || null,
                surfaceRuleMeta: mergeSurfaceRuleMeta(
                    appliedMorphology?.surfaceRuleMeta,
                    suppletiveStemSet?.surfaceRuleMeta,
                    form.surfaceRuleMeta
                ),
                isYawiOptative: isYawiOptativeSingular,
            });
            pushGeneratedSurfaceForm(altText);
        });
    }
    if (isYawi && tense === "presente" && directionalPrefix !== "wal") {
        const useLongYawiSlot = pers2Slot === "t" || pers1Slot === "";
        const yawiSelectedForm = useLongYawiSlot
            ? yawiCanonicalLongPrefixed
            : yawiCanonicalShortPrefixed;
        const yawiText = buildSurfaceFromCurrentSlots(yawiSelectedForm, pers2Slot);
        pushGeneratedSurfaceForm(yawiText);
    }
    if (shouldAddYuVariant && (troncoSlot === yawiPresentShortPrefixed || troncoSlot === yawiPresentLongPrefixed)) {
        const yuText = buildSurfaceFromCurrentSlots(yawiYuVariantPrefixed);
        pushGeneratedSurfaceForm(yuText);
    }
    const generatedText = forms.join(" / ");
    const generatedSoundSpellingFrames = collectNuclearClauseSurfaceSoundSpellingFrames(
        generatedSurfaceSoundSpellingFrames,
        appliedMorphology?.soundSpellingFrames,
        appliedMorphology?.surfaceRuleMeta,
        suppletiveStemSet?.surfaceRuleMeta
    );

    if (!silent) {
        onComplete({
            textoGenerado: generatedText,
            analisisTronco: parsedVerb,
            procedenciaTronco: stemProvenance,
            tiempo: tense,
            troncoRender: troncoRender,
            obj1Base: baseObj1Slot,
        });
    }

    const nominalClauseMetadata = isNominalOutputProfile
        ? buildGeneratedNominalNum1Num2Metadata({
            subjectSuffix: pers2Slot,
            nominalKind: tense,
            possessivePrefix: poseedorSlot,
            patientivoSource,
            sourceTense: appliedMorphology?.surfaceRuleMeta?.verbDerivedNominalResultMetadata?.nominalizationProfile?.source?.sourceTense || "",
            sourceCombinedMode: isNonactive ? COMBINED_MODE.nonactive : "",
            actionNounStemUse,
            renderVerb: troncoRender,
            verb: troncoSlot,
            analysisVerb,
            patientiveSourceStageFrame: appliedMorphology?.surfaceRuleMeta?.patientivoSourceStageFrame || null,
            patientiveMultipleDerivationContract: appliedMorphology?.surfaceRuleMeta?.patientivoMultipleDerivationContract || null,
            sourceSubjectPrefix: inputPers1,
            sourceSubjectSuffix: inputPers2,
            instrumentivoImperfectActiveAbsolutiveException: appliedMorphology?.surfaceRuleMeta?.verbDerivedNominalResultMetadata?.instrumentivoImperfectActiveAbsolutiveException || null,
        })
        : {};
    const formulaPers1BeforeInflection = resolveGeneratedVncFormulaPers1BeforeInflection({
        tense,
        inputPers1,
        appliedMorphology,
        formulaStem: formulaShellVerb || formulaStemForSlots,
        hasFormulaValenceBeforeStem: Boolean(
            formulaObj1BeforeInflection
            || formulaObj2BeforeInflection
            || formulaObj3BeforeInflection
            || formulaReflexiveBeforeInflection
        ),
    });
    const nuclearClauseShell = buildGeneratedNuclearClauseShellMetadata({
        resolvedTenseMode,
        tense,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        isReflexive,
        verb: troncoSlot,
        renderVerb: troncoRender,
        formulaPers1: directionalFormulaFrame?.formulaPers1 ?? formulaPers1BeforeInflection,
        formulaPers2: "",
        formulaObj1: formulaObj1BeforeInflection,
        formulaObj2: formulaObj2BeforeInflection,
        formulaObj3: formulaObj3BeforeInflection,
        formulaReflexive: formulaReflexiveBeforeInflection,
        formulaDirectional: directionalFormulaFrame
            ? {
                prefix: directionalFormulaFrame.prefix,
                position: directionalFormulaFrame.position,
                allomorphy: {
                    source: "wal",
                    surface: directionalFormulaFrame.prefix,
                    shouldUseAl: directionalFormulaFrame.shouldUseAl,
                },
            }
            : null,
        formulaVerb: formulaShellVerb,
        formulaSubjectSuffix: formulaShellSubjectSuffix,
        formulaNumberConnector: preteritCnvConnectorProfile?.primaryConnector || inputPers2,
        nominalClauseMetadata,
    });
    const primaryOutputSurfaceRecord = generatedOutputSurfaceRecords.find((record) => record.surface === forms[0])
        || generatedOutputSurfaceRecords[0]
        || null;
    const cnvFormulaSurfacePath = buildGeneratedCnvFormulaSurfacePath({
        nuclearClauseShell,
        surfaceRecord: primaryOutputSurfaceRecord,
        surfaceRecords: generatedOutputSurfaceRecords,
        soundSpellingFrames: generatedSoundSpellingFrames,
    });
    const rawSlotNameBridge = typeof buildNuclearClauseSurfaceSlotNameBridge === "function"
        ? buildNuclearClauseSurfaceSlotNameBridge(posicionesFormula)
        : null;
    const slotNameBridge = alignNuclearClauseSurfaceSlotNameBridgeToCnvFormulaSurfacePath(
        rawSlotNameBridge,
        cnvFormulaSurfacePath
    );
    const vncValencyFrame = buildGeneratedVncValencyFrameMetadata({
        resolvedTenseMode,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        obj1Base: baseObj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        parsedVerb,
        valencySummary,
        targetValency,
        isPassiveImpersonalMode,
        nuclearClauseShell,
    });
    const adverbialFunctionSourceFormulaSlots = resolvedTenseMode === TENSE_MODE.adverbio
        ? {
            obj1: {
                slot: "obj1",
                prefix: baseObj1Slot || obj1Slot,
                basePrefix: baseObj1Slot || obj1Slot,
                displayPrefix: baseObj1Slot || obj1Slot || "Ø",
            },
            obj2: {
                slot: "obj2",
                prefix: indirectObjectMarker,
                displayPrefix: indirectObjectMarker || "Ø",
            },
            obj3: {
                slot: "obj3",
                prefix: thirdObjectMarker,
                displayPrefix: thirdObjectMarker || "Ø",
            },
            reflexivo: {
                slot: "reflexivo",
                prefix: isReflexive ? "mu" : "",
                displayPrefix: isReflexive ? "mu" : "Ø",
            },
        }
        : null;
    const functionUseValenceGate = resolvedTenseMode === TENSE_MODE.adverbio
        ? buildFunctionUseValenceObjectHardGate({
            override,
            posicionesFormula,
            sourceFrame: nuclearClauseShell,
            sourceFormulaSlots: adverbialFunctionSourceFormulaSlots || nuclearClauseShell?.formulaSlots || null,
            entradaGrammarObject,
            sourceKind: "verbal-nuclear-clause",
            currentVector: {
                obj1: baseObj1Slot || obj1Slot,
                obj2: indirectObjectMarker,
                obj3: thirdObjectMarker,
                reflexivo: isReflexive ? "mu" : "",
            },
            currentVectorOwnsValenceObjectSlots: true,
            gateContext: "adverbial-nuclear-function-use",
        })
        : null;
    if (functionUseValenceGate?.status === "blocked") {
        return buildNuclearClauseSurfaceBlockedResult({
            result: {
                outputKind: "adverbial-nuclear-function",
                generationRoute: "adverbio",
                clauseKind: "verbal-nuclear-clause",
                result: "—",
                error: true,
                supported: false,
                surfaceForms: [],
                isReflexive,
                functionUseValenceGate,
                entradaGrammarObject,
            },
            message: "La función no puede consumir, crear, mover ni reclasificar objeto/valencia antes de fijar el marco de valencia.",
            diagnosticId: functionUseValenceGate.diagnosticId,
            routeFamily: "adverbial-nuclear-function",
            routeStage: functionUseValenceGate.routeStage,
            resultMarker: "—",
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: obj1Slot,
            poseedor: poseedorSlot,
            posicionesFormula,
            verb: troncoSlot,
            renderVerb: troncoRender,
            entradaGrammarObject,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            nuclearClauseShell,
            vncValencyFrame,
            enumerableContract: false,
        });
    }
    const derivedVoiceFrame = buildGeneratedDerivedVoiceFrameMetadata({
        resolvedTenseMode,
        resolvedDerivationMode,
        resolvedVoiceMode,
        isNonactive,
        isPassiveImpersonalMode,
        sourceValency,
        targetValency,
        valencySummary,
        parsedVerb,
        verb: troncoSlot,
        analysisVerb,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        obj1Base: baseObj1Slot,
        hasPromotableObject,
        preserveSubjectForPassive,
        allowPassiveObject,
    });
    const forwardDerivationFrame = buildGeneratedForwardDerivationFrameMetadata({
        resolvedTenseMode,
        resolvedDerivationType,
        derivationValencyDelta,
        sourceValency,
        forwardDerivations,
        forwardStemProvenance,
        causativeAllStems,
        applicativeAllStems,
        renderVerb: troncoRender,
        verb: troncoSlot,
        analysisVerb,
    });
    const compoundFrame = buildGeneratedCompoundFrameMetadata({
        resolvedTenseMode,
        parsedVerb,
        nuclearClauseShell,
    });
    const patientiveCompoundSourceFrame = buildGeneratedPatientiveCompoundSourceFrameMetadata({
        resolvedTenseMode,
        compoundFrame,
        nominalizationProfile: nominalClauseMetadata?.nominalizationProfile || null,
        nuclearClauseShell,
        surfaceForms: forms,
    });
    const adjectivalCompoundSourceFrame = buildGeneratedAdjectivalCompoundSourceFrameMetadata({
        resolvedTenseMode,
        compoundFrame,
        nominalizationProfile: nominalClauseMetadata?.nominalizationProfile || null,
        nuclearClauseShell,
        surfaceForms: forms,
    });
    const adverbialNuclearFrame = buildGeneratedAdverbialNuclearFrameMetadata({
        resolvedTenseMode,
        tense,
        renderVerb: troncoRender,
        verb: troncoSlot,
        analysisVerb,
        objectPrefix: obj1Slot,
        baseObjectPrefix: baseObj1Slot,
        surfaceForms: forms,
        functionUseValenceGate,
    });
    const generatedAdverbialAdjunctionBoundaryFrame = buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata({
        resolvedTenseMode,
        tense,
        renderVerb: troncoRender,
        verb: troncoSlot,
        analysisVerb,
    });
    const sentenceLayer = typeof buildGeneratedSentenceLayerMetadata === "function"
        ? buildGeneratedSentenceLayerMetadata({
            override,
            tense,
            nuclearClauseShell,
            clauseKind: nuclearClauseShell?.clauseKind || "",
        })
        : null;
    const resultPayload = {
        result: generatedText,
        surfaceForms: forms,
        isReflexive,
        stemProvenance,
        verbstemClassProfile,
        ...nominalClauseMetadata,
        nuclearClauseShell,
        vncValencyFrame,
        derivedVoiceFrame,
        forwardDerivationFrame,
        compoundFrame,
        patientiveCompoundSourceFrame,
        adjectivalCompoundSourceFrame,
        adverbialNuclearFrame,
        adverbialNuclearClauseFrame: adverbialNuclearFrame?.adverbialNuclearClauseFrame || null,
        adverbialAdjunctionBoundaryFrame: generatedAdverbialAdjunctionBoundaryFrame
            || nominalClauseMetadata?.adverbialAdjunctionBoundaryFrame
            || null,
        functionUseValenceGate,
        sentenceLayer,
        cnvFormulaSurfacePath,
        slotNameBridge,
        soundSpellingFrames: generatedSoundSpellingFrames,
        orthographyFrame: {
            soundSpellingFrames: generatedSoundSpellingFrames,
        },
        entradaSurfaceDerivationFrame,
        entradaGrammarObject,
        posicionesFormula,
    };
    const formalUnitKind = resolveNuclearClauseSurfaceUnitKind(resolvedTenseMode, tense);
    const grammarFrame = buildNuclearClauseSurfaceGrammarFrame({
        result: resultPayload,
        override,
        resolvedTenseMode,
        tense,
        routeFamily: resultPayload.generationRoute
            || nominalClauseMetadata?.nominalizationProfile?.role?.nominalizationKind
            || (resolvedTenseMode === TENSE_MODE.verbo ? "vnc" : resolvedTenseMode),
        routeStage: "execute",
        unitKind: formalUnitKind,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        poseedor: poseedorSlot,
        posicionesFormula,
        verb: troncoSlot,
        renderVerb: troncoRender,
        entradaGrammarObject,
        nuclearClauseShell,
        cnvFormulaSurfacePath,
        vncValencyFrame,
        resolvedDerivationMode,
        resolvedDerivationType,
        resolvedVoiceMode,
    });
    const resultContract = buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
    const surfaceEngineContract = grammarFrame?.routeContract?.targetContract?.surfaceEngineContract || null;
    return {
        ...resultPayload,
        surfaceEngineContract,
        grammarFrame,
        ...resultContract,
    };
}

function executeGenerateWordRequest(request = {}) {
    return executeNuclearClauseSurfaceRequest(request);
}
