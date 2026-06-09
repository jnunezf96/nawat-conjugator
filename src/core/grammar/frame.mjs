// Native wrapper generated from src/core/grammar/frame.js.

export function createGrammarFrameApi(targetObject = globalThis) {
    var GRAMMAR_FRAME_VERSION = 1;
    var GRAMMAR_FRAME_KEYS = Object.freeze(["authorityFrame", "unitFrame", "orthographyFrame", "morphBoundaryFrame", "stemFrame", "nuclearClauseFrame", "participantFrame", "inflectionFrame", "routeContract", "astFrame", "resultFrame", "diagnosticFrame"]);
    var GRAMMAR_FRAME_LAYER_ORDER = Object.freeze(["authority-evidence", "unit-kind", "orthography", "morph-boundary", "stem-core", "nuclear-clause", "participants-state-valence", "inflection-route-source", "route-or-ast", "output-provenance", "diagnostics-curriculum"]);
    var GRAMMAR_NO_OUTPUT_SURFACE_MARKERS = Object.freeze(["—"]);
    function normalizeGrammarFrameObject(value = null) {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        return null;
      }
      return {
        ...value
      };
    }
    function normalizeGrammarFrameArray(value = []) {
      if (!Array.isArray(value)) {
        return [];
      }
      return value.filter(entry => entry !== null && entry !== undefined);
    }
    function normalizeGrammarSurfaceValue(value = "") {
      const surface = String(value || "").trim();
      return GRAMMAR_NO_OUTPUT_SURFACE_MARKERS.includes(surface) ? "" : surface;
    }
    function normalizeGrammarSurfaceForms(value = []) {
      return normalizeGrammarFrameArray(value).map(entry => normalizeGrammarSurfaceValue(entry)).filter(Boolean);
    }
    function buildGrammarAuthorityFrame({
      grammarAuthority = "Andrews",
      spellingAuthority = "Nawat/Pipil evidence",
      sourceEvidence = null,
      evidenceStatus = "",
      andrewsRefs = [],
      nawatEvidenceRefs = [],
      supported = null
    } = {}) {
      return {
        grammarAuthority: String(grammarAuthority || "Andrews"),
        spellingAuthority: String(spellingAuthority || "Nawat/Pipil evidence"),
        sourceEvidence: normalizeGrammarFrameObject(sourceEvidence),
        evidenceStatus: String(evidenceStatus || ""),
        andrewsRefs: normalizeGrammarFrameArray(andrewsRefs).map(entry => String(entry || "")).filter(Boolean),
        nawatEvidenceRefs: normalizeGrammarFrameArray(nawatEvidenceRefs).map(entry => String(entry || "")).filter(Boolean),
        supported: supported === null ? null : supported === true
      };
    }
    function buildGrammarRouteContractFrame({
      routeFamily = "",
      routeStage = "",
      sourceContract = null,
      targetContract = null,
      generationAllowed = null,
      blockingDiagnostics = []
    } = {}) {
      return {
        routeFamily: String(routeFamily || ""),
        routeStage: String(routeStage || ""),
        sourceContract: normalizeGrammarFrameObject(sourceContract),
        targetContract: normalizeGrammarFrameObject(targetContract),
        generationAllowed: generationAllowed === null ? null : generationAllowed === true,
        blockingDiagnostics: normalizeGrammarFrameArray(blockingDiagnostics)
      };
    }
    function buildGrammarResultFrame({
      ok = null,
      surface = "",
      surfaceForms = [],
      outputKind = "",
      generationRoute = "",
      sourceInput = "",
      provenance = null,
      continuation = null
    } = {}) {
      const normalizedSurface = normalizeGrammarSurfaceValue(surface);
      return {
        ok: ok === null ? null : ok === true,
        surface: normalizedSurface,
        surfaceForms: normalizeGrammarSurfaceForms(surfaceForms),
        outputKind: String(outputKind || ""),
        generationRoute: String(generationRoute || ""),
        sourceInput: String(sourceInput || ""),
        provenance: normalizeGrammarFrameObject(provenance),
        continuation: normalizeGrammarFrameObject(continuation)
      };
    }
    function buildGrammarDiagnosticFrame({
      diagnostics = [],
      status = "",
      blockers = []
    } = {}) {
      return {
        status: String(status || ""),
        diagnostics: normalizeGrammarFrameArray(diagnostics),
        blockers: normalizeGrammarFrameArray(blockers)
      };
    }
    function buildGrammarFrame(overrides = {}) {
      const source = overrides && typeof overrides === "object" ? overrides : {};
      const frame = {
        version: GRAMMAR_FRAME_VERSION,
        layerOrder: [...GRAMMAR_FRAME_LAYER_ORDER]
      };
      GRAMMAR_FRAME_KEYS.forEach(key => {
        frame[key] = normalizeGrammarFrameObject(source[key]);
      });
      return frame;
    }
    function splitGrammarResultContractSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeGrammarSurfaceValue(entry)).filter(Boolean);
    }
    function getGrammarResultContractSurfaceForms({
      output = null,
      frameResult = null
    } = {}) {
      const hasResultFrame = Boolean(frameResult);
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return forms.flatMap(entry => splitGrammarResultContractSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(output?.surfaceForms)) {
        forms.push(...output.surfaceForms);
      }
      if (output?.surface) {
        forms.push(output.surface);
      }
      if (!hasResultFrame && output?.result) {
        forms.push(output.result);
      }
      return forms.flatMap(entry => splitGrammarResultContractSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getGrammarMetadataContractFrame(record = null, options = {}) {
      const optionFrame = options?.grammarFrame && typeof options.grammarFrame === "object" ? options.grammarFrame : options?.frames && typeof options.frames === "object" ? options.frames : null;
      const recordFrame = record?.grammarFrame && typeof record.grammarFrame === "object" ? record.grammarFrame : record?.frames && typeof record.frames === "object" ? record.frames : null;
      return optionFrame || recordFrame || null;
    }
    function getGrammarMetadataContractResultFrame(record = null, options = {}) {
      const grammarFrame = getGrammarMetadataContractFrame(record, options);
      return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
    }
    function getGrammarMetadataContractSurfaceForms(record = null, options = {}) {
      const node = record && typeof record === "object" ? record : {};
      const resultFrame = getGrammarMetadataContractResultFrame(node, options);
      const hasResultFrame = Boolean(resultFrame);
      const forms = [];
      if (Array.isArray(resultFrame?.surfaceForms)) {
        forms.push(...resultFrame.surfaceForms);
      }
      if (resultFrame?.surface) {
        forms.push(resultFrame.surface);
      }
      if (hasResultFrame) {
        return forms.flatMap(entry => splitGrammarResultContractSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(options?.surfaceForms)) {
        forms.push(...options.surfaceForms);
      }
      if (options?.surface) {
        forms.push(options.surface);
      }
      if (!hasResultFrame && Array.isArray(node.surfaceForms)) {
        forms.push(...node.surfaceForms);
      }
      if (!hasResultFrame && Array.isArray(node.output?.surfaceForms)) {
        forms.push(...node.output.surfaceForms);
      }
      if (node.surface) {
        forms.push(node.surface);
      }
      if (node.output?.surface) {
        forms.push(node.output.surface);
      }
      const normalizedForms = forms.flatMap(entry => splitGrammarResultContractSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      if (normalizedForms.length) {
        return normalizedForms;
      }
      return hasResultFrame ? [] : splitGrammarResultContractSurfaceText(node.result || "");
    }
    function buildGrammarResultContract({
      result = null,
      grammarFrame = null
    } = {}) {
      const output = result && typeof result === "object" ? result : {};
      const frames = grammarFrame && typeof grammarFrame === "object" ? grammarFrame : output.grammarFrame && typeof output.grammarFrame === "object" ? output.grammarFrame : output.frames && typeof output.frames === "object" ? output.frames : null;
      const frameResult = frames?.resultFrame && typeof frames.resultFrame === "object" ? frames.resultFrame : null;
      const surfaceForms = getGrammarResultContractSurfaceForms({
        output,
        frameResult
      });
      const surface = normalizeGrammarSurfaceValue(surfaceForms[0] || frameResult?.surface || (!frameResult ? output.surface || output.result : "") || "");
      const frameOk = frameResult && typeof frameResult.ok === "boolean" ? frameResult.ok : null;
      const ok = frameOk === null ? Boolean(surface || surfaceForms.length) && output.error !== true && output.supported !== false : frameOk;
      const diagnostics = [...(Array.isArray(output.diagnostics) ? output.diagnostics : []), ...(Array.isArray(frames?.diagnosticFrame?.diagnostics) ? frames.diagnosticFrame.diagnostics : [])].filter((entry, index, list) => {
        if (!entry || typeof entry !== "object") {
          return false;
        }
        const key = `${entry.id || entry.code || ""}|${entry.severity || ""}|${entry.message || ""}`;
        return list.findIndex(candidate => candidate && typeof candidate === "object" && `${candidate.id || candidate.code || ""}|${candidate.severity || ""}|${candidate.message || ""}` === key) === index;
      });
      return {
        ok,
        surface,
        surfaceForms,
        frames,
        diagnostics
      };
    }
    function normalizeGrammarDiagnosticContractEntry(entry = null) {
      if (!entry) {
        return null;
      }
      if (typeof entry === "string") {
        const id = entry.trim();
        return id ? {
          id,
          severity: "diagnostic",
          message: ""
        } : null;
      }
      if (typeof entry !== "object") {
        return null;
      }
      const id = String(entry.id || entry.code || "").trim();
      const message = String(entry.message || "").trim();
      if (!id && !message) {
        return null;
      }
      return {
        ...entry,
        id: id || message,
        severity: String(entry.severity || "diagnostic"),
        message
      };
    }
    function normalizeGrammarDiagnosticContractEntries(entries = []) {
      const normalized = normalizeGrammarFrameArray(entries).map(entry => normalizeGrammarDiagnosticContractEntry(entry)).filter(Boolean);
      return normalized.filter((entry, index, list) => {
        const key = `${entry.id || ""}|${entry.severity || ""}|${entry.message || ""}`;
        return list.findIndex(candidate => `${candidate.id || ""}|${candidate.severity || ""}|${candidate.message || ""}` === key) === index;
      });
    }
    function buildGrammarAstContractFrame(ast = null, options = {}) {
      if (typeof buildGrammarFrame !== "function") {
        return null;
      }
      const node = ast && typeof ast === "object" ? ast : {};
      const diagnostics = normalizeGrammarDiagnosticContractEntries(node.diagnostics);
      const surface = String(node.surface || "").trim();
      const supported = node.supported === true;
      const structuralSource = String(options.structuralSource || node.structuralSource || "").trim();
      const lessonRefs = normalizeGrammarFrameArray(options.andrewsRefs || node.andrewsRefs).map(entry => String(entry || "").trim()).filter(Boolean);
      const lessons = normalizeGrammarFrameArray(options.lessons || node.lessons || (node.lesson ? [node.lesson] : [])).map(entry => String(entry || "").trim()).filter(Boolean);
      const resolvedRefs = lessonRefs.length ? lessonRefs : structuralSource ? [structuralSource] : lessons.map(lesson => `Andrews Lesson ${lesson}`);
      const astKind = String(options.astKind || node.kind || "composition-ast");
      const authorityFrame = typeof buildGrammarAuthorityFrame === "function" ? buildGrammarAuthorityFrame({
        evidenceStatus: supported ? "composition-ast" : diagnostics.length ? "blocked" : "pending",
        andrewsRefs: resolvedRefs,
        supported
      }) : null;
      const routeContract = typeof buildGrammarRouteContractFrame === "function" ? buildGrammarRouteContractFrame({
        routeFamily: astKind,
        routeStage: "compose-ast",
        sourceContract: {
          unitKind: String(options.unitKind || "clause-unit"),
          targetAuthority: String(node.targetAuthority || ""),
          evidenceSource: String(node.evidenceSource || "")
        },
        targetContract: {
          astKind,
          newWordGenerationAllowed: node.newWordGenerationAllowed === true,
          generationAllowed: node.generationAllowed === true
        },
        generationAllowed: false,
        blockingDiagnostics: supported ? [] : diagnostics
      }) : null;
      const resultFrame = typeof buildGrammarResultFrame === "function" ? buildGrammarResultFrame({
        ok: supported,
        surface,
        surfaceForms: surface ? [surface] : [],
        outputKind: astKind,
        generationRoute: "composition-ast",
        sourceInput: String(options.sourceInput || "")
      }) : null;
      const diagnosticFrame = typeof buildGrammarDiagnosticFrame === "function" ? buildGrammarDiagnosticFrame({
        status: supported ? "composed" : diagnostics.length ? "blocked" : "pending",
        diagnostics,
        blockers: supported ? [] : diagnostics
      }) : null;
      return buildGrammarFrame({
        authorityFrame,
        unitFrame: {
          unitKind: String(options.unitKind || "clause-unit"),
          outputKind: astKind,
          generationRoute: "composition-ast"
        },
        orthographyFrame: {
          surface,
          surfaceForms: surface ? [surface] : [],
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true
        },
        morphBoundaryFrame: null,
        stemFrame: null,
        nuclearClauseFrame: null,
        participantFrame: null,
        inflectionFrame: null,
        routeContract,
        astFrame: node,
        resultFrame,
        diagnosticFrame
      });
    }
    function attachGrammarAstContract(ast = null, options = {}) {
      const node = ast && typeof ast === "object" ? ast : {};
      const grammarFrame = buildGrammarAstContractFrame(node, options);
      const resultContract = buildGrammarResultContract({
        result: {
          ...node,
          diagnostics: normalizeGrammarDiagnosticContractEntries(node.diagnostics)
        },
        grammarFrame
      });
      return {
        ...node,
        grammarFrame,
        ok: resultContract.ok,
        surface: resultContract.surface,
        frames: resultContract.frames,
        contractDiagnostics: resultContract.diagnostics
      };
    }
    function buildGrammarMetadataContractFrame(record = null, options = {}) {
      const node = record && typeof record === "object" ? record : {};
      const diagnostics = normalizeGrammarDiagnosticContractEntries([...(Array.isArray(node.diagnostics) ? node.diagnostics : []), ...(Array.isArray(options.diagnostics) ? options.diagnostics : [])]);
      const supported = options.supported !== undefined ? options.supported === true : node.supported === true || node.confirmed === true;
      const generationAllowed = options.generationAllowed !== undefined ? options.generationAllowed === true : node.generationAllowed === true;
      const structuralSource = String(options.structuralSource || node.structuralSource || "").trim();
      const lessonRefs = normalizeGrammarFrameArray(options.andrewsRefs || node.andrewsRefs).map(entry => String(entry || "").trim()).filter(Boolean);
      const lessons = normalizeGrammarFrameArray(options.lessons || node.lessons || (node.lesson ? [node.lesson] : [])).map(entry => String(entry || "").trim()).filter(Boolean);
      const appendices = normalizeGrammarFrameArray(options.appendices || node.appendices || (node.appendix ? [node.appendix] : [])).map(entry => String(entry || "").trim()).filter(Boolean);
      const resolvedRefs = lessonRefs.length ? lessonRefs : [...(structuralSource ? [structuralSource] : lessons.map(lesson => `Andrews Lesson ${lesson}`)), ...appendices.map(appendix => `Andrews Appendix ${appendix}`)];
      const surfaceForms = getGrammarMetadataContractSurfaceForms(node, options);
      const surface = normalizeGrammarSurfaceValue(surfaceForms[0] || "");
      const metadataKind = String(options.metadataKind || node.kind || "metadata").trim();
      const unitKind = String(options.unitKind || node.unitKind || "diagnostic-unit").trim();
      const routeStage = String(options.routeStage || (generationAllowed ? "execute" : "classify-boundary")).trim();
      const routeFamily = String(options.routeFamily || metadataKind).trim();
      const sourceInput = String(options.sourceInput || node.candidate || node.sourceName || node.nameSource || node.source?.raw || node.source || node.target || "").trim();
      const authorityFrame = buildGrammarAuthorityFrame({
        sourceEvidence: {
          kind: metadataKind,
          targetAuthority: String(node.targetAuthority || options.targetAuthority || ""),
          evidenceSource: String(node.evidenceSource || options.evidenceSource || ""),
          confirmedExamples: normalizeGrammarFrameArray(node.confirmedExamples)
        },
        evidenceStatus: String(options.evidenceStatus || node.status || (supported ? "metadata-supported" : "diagnostic-only")),
        andrewsRefs: resolvedRefs,
        nawatEvidenceRefs: normalizeGrammarFrameArray(options.nawatEvidenceRefs || node.nawatEvidenceRefs),
        supported
      });
      const routeContract = buildGrammarRouteContractFrame({
        routeFamily,
        routeStage,
        sourceContract: normalizeGrammarFrameObject(options.sourceContract) || {
          unitKind,
          metadataKind,
          sourceInput,
          evidenceSource: String(node.evidenceSource || "")
        },
        targetContract: normalizeGrammarFrameObject(options.targetContract) || {
          metadataKind,
          generationAllowed,
          newWordGenerationAllowed: generationAllowed,
          targetAuthority: String(node.targetAuthority || options.targetAuthority || "")
        },
        generationAllowed,
        blockingDiagnostics: generationAllowed ? [] : diagnostics
      });
      const resultFrame = buildGrammarResultFrame({
        ok: supported,
        surface,
        surfaceForms,
        outputKind: metadataKind,
        generationRoute: routeStage,
        sourceInput,
        provenance: normalizeGrammarFrameObject(options.provenance),
        continuation: normalizeGrammarFrameObject(options.continuation)
      });
      const diagnosticFrame = buildGrammarDiagnosticFrame({
        status: String(options.diagnosticStatus || node.status || (supported ? "classified" : "diagnostic-only")),
        diagnostics,
        blockers: generationAllowed ? [] : diagnostics
      });
      return buildGrammarFrame({
        authorityFrame,
        unitFrame: normalizeGrammarFrameObject(options.unitFrame) || {
          unitKind,
          outputKind: metadataKind,
          generationRoute: routeStage
        },
        orthographyFrame: normalizeGrammarFrameObject(options.orthographyFrame) || {
          surface,
          surfaceForms,
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true
        },
        morphBoundaryFrame: Object.prototype.hasOwnProperty.call(options, "morphBoundaryFrame") ? normalizeGrammarFrameObject(options.morphBoundaryFrame) : normalizeGrammarFrameObject(node.boundary || (metadataKind.includes("boundary") ? node : null)),
        stemFrame: normalizeGrammarFrameObject(options.stemFrame),
        nuclearClauseFrame: normalizeGrammarFrameObject(options.nuclearClauseFrame),
        participantFrame: normalizeGrammarFrameObject(options.participantFrame),
        inflectionFrame: normalizeGrammarFrameObject(options.inflectionFrame),
        routeContract,
        astFrame: normalizeGrammarFrameObject(options.astFrame),
        resultFrame,
        diagnosticFrame
      });
    }
    function attachGrammarMetadataContract(record = null, options = {}) {
      const node = record && typeof record === "object" ? record : {};
      const grammarFrame = buildGrammarMetadataContractFrame(node, options);
      const resultContract = buildGrammarResultContract({
        result: {
          ...node,
          diagnostics: normalizeGrammarDiagnosticContractEntries(node.diagnostics)
        },
        grammarFrame
      });
      const enumerable = options.enumerable === true;
      const output = {
        ...node
      };
      Object.defineProperties(output, {
        grammarFrame: {
          configurable: true,
          enumerable,
          writable: true,
          value: grammarFrame
        },
        ok: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.ok
        },
        surface: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.surface
        },
        frames: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.frames
        },
        contractDiagnostics: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.diagnostics
        }
      });
      return output;
    }

    const api = {};
    Object.defineProperty(api, "GRAMMAR_FRAME_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return GRAMMAR_FRAME_VERSION; },
        set(value) { GRAMMAR_FRAME_VERSION = value; },
    });
    Object.defineProperty(api, "GRAMMAR_FRAME_KEYS", {
        configurable: true,
        enumerable: true,
        get() { return GRAMMAR_FRAME_KEYS; },
        set(value) { GRAMMAR_FRAME_KEYS = value; },
    });
    Object.defineProperty(api, "GRAMMAR_FRAME_LAYER_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return GRAMMAR_FRAME_LAYER_ORDER; },
        set(value) { GRAMMAR_FRAME_LAYER_ORDER = value; },
    });
    Object.defineProperty(api, "GRAMMAR_NO_OUTPUT_SURFACE_MARKERS", {
        configurable: true,
        enumerable: true,
        get() { return GRAMMAR_NO_OUTPUT_SURFACE_MARKERS; },
        set(value) { GRAMMAR_NO_OUTPUT_SURFACE_MARKERS = value; },
    });
    api.normalizeGrammarFrameObject = normalizeGrammarFrameObject;
    api.normalizeGrammarFrameArray = normalizeGrammarFrameArray;
    api.normalizeGrammarSurfaceValue = normalizeGrammarSurfaceValue;
    api.normalizeGrammarSurfaceForms = normalizeGrammarSurfaceForms;
    api.buildGrammarAuthorityFrame = buildGrammarAuthorityFrame;
    api.buildGrammarRouteContractFrame = buildGrammarRouteContractFrame;
    api.buildGrammarResultFrame = buildGrammarResultFrame;
    api.buildGrammarDiagnosticFrame = buildGrammarDiagnosticFrame;
    api.buildGrammarFrame = buildGrammarFrame;
    api.splitGrammarResultContractSurfaceText = splitGrammarResultContractSurfaceText;
    api.getGrammarResultContractSurfaceForms = getGrammarResultContractSurfaceForms;
    api.getGrammarMetadataContractFrame = getGrammarMetadataContractFrame;
    api.getGrammarMetadataContractResultFrame = getGrammarMetadataContractResultFrame;
    api.getGrammarMetadataContractSurfaceForms = getGrammarMetadataContractSurfaceForms;
    api.buildGrammarResultContract = buildGrammarResultContract;
    api.normalizeGrammarDiagnosticContractEntry = normalizeGrammarDiagnosticContractEntry;
    api.normalizeGrammarDiagnosticContractEntries = normalizeGrammarDiagnosticContractEntries;
    api.buildGrammarAstContractFrame = buildGrammarAstContractFrame;
    api.attachGrammarAstContract = attachGrammarAstContract;
    api.buildGrammarMetadataContractFrame = buildGrammarMetadataContractFrame;
    api.attachGrammarMetadataContract = attachGrammarMetadataContract;
    return api;
}

export function installGrammarFrameGlobals(targetObject = globalThis) {
    const api = createGrammarFrameApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
