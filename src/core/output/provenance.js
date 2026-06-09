// core/output/provenance.js
// Provenance helpers for derived stems and explainability metadata.
// Kept separate from surface realization so surface.js can focus on output assembly.

"use strict";

var OUTPUT_PROVENANCE_STEM_ANDREWS_REFS = Object.freeze([
    "Andrews Lesson 7 7.1-7.5",
]);

var OUTPUT_PROVENANCE_CAUSATIVE_ANDREWS_REFS = Object.freeze([
    "Andrews Lesson 24 24.1",
]);

function getOutputProvenanceAndrewsRefs({ derivationType = "" } = {}) {
    const refs = [...OUTPUT_PROVENANCE_STEM_ANDREWS_REFS];
    if (String(derivationType || "") === "causative") {
        refs.push(...OUTPUT_PROVENANCE_CAUSATIVE_ANDREWS_REFS);
    }
    return refs;
}

function buildOutputProvenanceMissingStemDiagnostic({
    sourceVerb = "",
    analysisTarget = "",
    derivationType = "",
} = {}) {
    const andrewsRefs = getOutputProvenanceAndrewsRefs({ derivationType });
    return {
        id: "OUTPUT_PROVENANCE_STEM_MISSING",
        code: "OUTPUT_PROVENANCE_STEM_MISSING",
        severity: "blocked",
        message: "Forward derivation provenance has no realized stem surface.",
        authority: andrewsRefs.join("; "),
        sourceVerb: String(sourceVerb || ""),
        analysisTarget: String(analysisTarget || ""),
        derivationType: String(derivationType || ""),
    };
}

function normalizeOutputProvenanceContractSurfaceValue(value = "") {
    if (typeof normalizeGrammarSurfaceValue === "function") {
        return normalizeGrammarSurfaceValue(value);
    }
    const text = String(value || "").trim();
    return text === "—" ? "" : text;
}

function splitOutputProvenanceContractSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeOutputProvenanceContractSurfaceValue(entry))
        .filter(Boolean);
}

function getOutputProvenanceGrammarFrame(record = null, options = {}) {
    const optionFrame = options?.grammarFrame && typeof options.grammarFrame === "object"
        ? options.grammarFrame
        : (options?.frames && typeof options.frames === "object" ? options.frames : null);
    const recordFrame = record?.grammarFrame && typeof record.grammarFrame === "object"
        ? record.grammarFrame
        : (record?.frames && typeof record.frames === "object" ? record.frames : null);
    return optionFrame || recordFrame || null;
}

function getOutputProvenanceResultFrame(record = null, options = {}) {
    const grammarFrame = getOutputProvenanceGrammarFrame(record, options);
    return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
}

function getOutputProvenanceSurfaceForms(record = null, fallbackSurface = "", options = {}) {
    const node = record && typeof record === "object" ? record : {};
    const resultFrame = getOutputProvenanceResultFrame(node, options);
    const hasResultFrame = Boolean(resultFrame);
    const candidates = [];
    if (Array.isArray(resultFrame?.surfaceForms)) {
        candidates.push(...resultFrame.surfaceForms);
    }
    if (resultFrame?.surface) {
        candidates.push(resultFrame.surface);
    }
    if (hasResultFrame) {
        return candidates
            .flatMap((entry) => splitOutputProvenanceContractSurfaceText(entry))
            .filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    if (!hasResultFrame && Array.isArray(node.surfaceForms)) {
        candidates.push(...node.surfaceForms);
    }
    if (!hasResultFrame && node.surface) {
        candidates.push(node.surface);
    }
    if (!hasResultFrame && node.surfaceStem) {
        candidates.push(node.surfaceStem);
    }
    if (!hasResultFrame && node.result) {
        candidates.push(node.result);
    }
    if (!hasResultFrame && fallbackSurface) {
        candidates.push(fallbackSurface);
    }
    return candidates
        .flatMap((entry) => splitOutputProvenanceContractSurfaceText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function getOutputProvenancePrimarySurface(record = null, fallbackSurface = "", options = {}) {
    return getOutputProvenanceSurfaceForms(record, fallbackSurface, options)[0] || "";
}

function attachOutputProvenanceGrammarContract(record = null, options = {}) {
    if (!record || typeof record !== "object" || typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    const fallbackSurface = normalizeDerivationStemValue(
        options.surface
        || record.surfaceStem
        || ""
    );
    const surfaceForms = getOutputProvenanceSurfaceForms(record, fallbackSurface, options);
    const surface = getOutputProvenancePrimarySurface(record, fallbackSurface, options);
    const supported = options.supported !== undefined
        ? options.supported === true
        : Boolean(surface || surfaceForms.length);
    const diagnostics = Array.isArray(options.diagnostics) ? options.diagnostics : [];
    const sourceVerb = String(options.sourceVerb || record.verb || record.base || "").trim();
    const analysisTarget = String(options.analysisTarget || record.analysisTarget || "").trim();
    const derivationType = String(options.derivationType || record.stemPath || "").trim();
    const tense = String(options.tense || record.tense || "").trim();
    const variants = Array.isArray(record.variants) ? record.variants : [];
    const metadataKind = String(options.metadataKind || "output-provenance").trim();
    const routeStage = String(options.routeStage || (supported ? "record-result-provenance" : "blocked")).trim();
    const andrewsRefs = getOutputProvenanceAndrewsRefs({ derivationType });
    return attachGrammarMetadataContract({
        ...record,
        surfaceForms,
    }, {
        enumerable: false,
        metadataKind,
        unitKind: "output-provenance",
        routeFamily: "output-provenance",
        routeStage,
        generationAllowed: false,
        supported,
        structuralSource: andrewsRefs[0] || "Andrews Lesson 7",
        andrewsRefs,
        evidenceStatus: supported ? "provenance-recorded" : "blocked",
        diagnosticStatus: supported ? "provenance-recorded" : "blocked",
        surface,
        surfaceForms,
        sourceInput: sourceVerb || analysisTarget || surface,
        diagnostics,
        provenance: record,
        sourceContract: {
            unitKind: "source-verbcore",
            sourceVerb,
            analysisTarget,
            tense,
            derivationType,
            isTransitive: options.isTransitive === true || record.isTransitive === true,
        },
        targetContract: {
            unitKind: "result-stem-provenance",
            surfaceStem: surface,
            stemPath: String(record.stemPath || derivationType || ""),
            rule: String(record.rule || ""),
            patternType: String(record.patternType || ""),
            variants,
        },
        orthographyFrame: {
            surface,
            surfaceForms,
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
        },
        morphBoundaryFrame: {
            routeStage,
            stemPath: String(record.stemPath || derivationType || ""),
            base: String(record.base || ""),
            suffix: String(record.suffix || ""),
            rule: String(record.rule || ""),
            patternType: String(record.patternType || ""),
            baseSpec: record.baseSpec || null,
            stemSpec: record.stemSpec || null,
        },
        stemFrame: {
            sourceStem: sourceVerb,
            analysisTarget,
            surfaceStem: surface,
            stemSpec: record.stemSpec || null,
            variants,
        },
        inflectionFrame: {
            tense,
            derivationType,
            isTransitive: options.isTransitive === true || record.isTransitive === true,
        },
    });
}

function buildProvenanceVariantEntry({
    base = "",
    suffix = "",
    baseSpec = null,
    stemSpec = null,
    surfaceStem = "",
} = {}) {
    const resolvedStemSpec = (
        stemSpec
        && typeof stemSpec === "object"
        && stemSpec.kind
    )
        ? stemSpec
        : null;
    const resolvedBaseSpec = (
        baseSpec
        && typeof baseSpec === "object"
    )
        ? baseSpec
        : null;
    const realizedStem = normalizeDerivationStemValue(
        surfaceStem
        || (resolvedStemSpec
            ? realizeMorphStemSpec(resolvedStemSpec, `${base || ""}${suffix || ""}`)
            : `${base || ""}${suffix || ""}`)
    );
    const variant = {
        base: String(base || ""),
        suffix: String(suffix || ""),
        baseSpec: resolvedBaseSpec,
        stemSpec: resolvedStemSpec,
        surfaceStem: realizedStem,
    };
    return attachOutputProvenanceGrammarContract(variant, {
        metadataKind: "output-provenance-variant",
        routeStage: realizedStem ? "record-stem-variant" : "blocked",
        supported: Boolean(realizedStem),
        surface: realizedStem,
        sourceVerb: String(base || ""),
        analysisTarget: realizedStem,
        diagnostics: realizedStem ? [] : [buildOutputProvenanceMissingStemDiagnostic()],
    });
}

function getProvenancePrimaryStemSurface(provenance = null) {
    const variants = Array.isArray(provenance?.variants) ? provenance.variants : [];
    const primaryVariant = variants[0] || null;
    if (primaryVariant) {
        const primaryResultFrame = getOutputProvenanceResultFrame(primaryVariant);
        if (primaryResultFrame) {
            return getOutputProvenancePrimarySurface(primaryVariant);
        }
        const framedSurface = getOutputProvenancePrimarySurface(primaryVariant);
        if (framedSurface) {
            return framedSurface;
        }
        const resolvedSurface = normalizeDerivationStemValue(
            primaryVariant.surfaceStem
            || (primaryVariant.stemSpec
                ? realizeMorphStemSpec(
                    primaryVariant.stemSpec,
                    `${primaryVariant.base || ""}${primaryVariant.suffix || ""}`
                )
                : `${primaryVariant.base || ""}${primaryVariant.suffix || ""}`)
        );
        if (resolvedSurface) {
            return resolvedSurface;
        }
    }
    const provenanceResultFrame = getOutputProvenanceResultFrame(provenance);
    if (provenanceResultFrame) {
        return getOutputProvenancePrimarySurface(provenance);
    }
    if (provenance?.stemSpec) {
        return normalizeDerivationStemValue(realizeMorphStemSpec(provenance.stemSpec, ""));
    }
    return getOutputProvenancePrimarySurface(provenance)
        || normalizeDerivationStemValue(provenance?.surfaceStem || "");
}

function buildForwardDerivationProvenance({
    sourceVerb = "",
    analysisTarget = "",
    tense = "",
    derivationType = "",
    isTransitive = false,
    selectedMeta = null,
} = {}) {
    const meta = selectedMeta && typeof selectedMeta === "object" ? selectedMeta : {};
    const selectedStem = normalizeDerivationStemValue(
        meta.surfaceStem
        || realizeMorphStemSpec(meta.stemSpec || null, meta.stem || "")
        || meta.stem
        || ""
    );
    const variants = selectedStem ? [buildProvenanceVariantEntry({
        stemSpec: meta.stemSpec || null,
        surfaceStem: selectedStem,
    })] : [];
    const provenance = {
        verb: sourceVerb,
        analysisTarget,
        tense,
        isTransitive,
        stemPath: derivationType || null,
        rule: String(meta.rule || ""),
        patternType: String(meta.patternType || ""),
        causativeTrace: meta.causativeTrace || null,
        guidanceRoute: meta.guidanceRoute || null,
        stemSpec: meta.stemSpec || null,
        surfaceStem: selectedStem,
        variants,
        blockedReason: null,
    };
    return attachOutputProvenanceGrammarContract(provenance, {
        metadataKind: "forward-derivation-provenance",
        routeStage: selectedStem ? "record-forward-derivation-provenance" : "blocked",
        supported: Boolean(selectedStem),
        surface: selectedStem,
        sourceVerb,
        analysisTarget,
        tense,
        derivationType,
        isTransitive,
        diagnostics: selectedStem ? [] : [buildOutputProvenanceMissingStemDiagnostic({
            sourceVerb,
            analysisTarget,
            derivationType,
        })],
    });
}
