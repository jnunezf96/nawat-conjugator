"use strict";

/**
 * Tests for src/core/agreement/agreement.js
 * Covers: getSubjectPersonInfo, getObjectPersonInfo,
 *         isSamePersonAcrossNumber, isSamePersonReflexive.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("agreement");

    // getSubjectPersonInfo(prefix, suffix) → {person, number}
    s.eq("subject ni/ = 1sg", ctx.getSubjectPersonInfo("ni", ""), { person: 1, number: "sg" });
    s.eq("subject ti/ = 2sg", ctx.getSubjectPersonInfo("ti", ""), { person: 2, number: "sg" });
    s.eq("subject // = 3sg", ctx.getSubjectPersonInfo("", ""), { person: 3, number: "sg" });
    s.eq("subject ti/t = 1pl", ctx.getSubjectPersonInfo("ti", "t"), { person: 1, number: "pl" });
    s.eq("subject shi/ = 2sg imperative", ctx.getSubjectPersonInfo("shi", ""), { person: 2, number: "sg", mode: "imperative" });
    s.eq("subject ti/kan = 1pl imperative", ctx.getSubjectPersonInfo("ti", "kan"), { person: 1, number: "pl", mode: "imperative" });
    s.eq("subject shi/kan = 2pl imperative", ctx.getSubjectPersonInfo("shi", "kan"), { person: 2, number: "pl", mode: "imperative" });
    s.eq("subject /kan = 3pl imperative", ctx.getSubjectPersonInfo("", "kan"), { person: 3, number: "pl", mode: "imperative" });
    s.eq("imperative subject ni/ = 1sg", ctx.getImperativeSubjectPersonInfo("ni", ""), { person: 1, number: "sg", mode: "imperative" });
    s.eq("imperative subject shi/ = 2sg", ctx.getImperativeSubjectPersonInfo("shi", ""), { person: 2, number: "sg", mode: "imperative" });
    s.eq("imperative subject // = 3sg", ctx.getImperativeSubjectPersonInfo("", ""), { person: 3, number: "sg", mode: "imperative" });
    s.eq("imperative subject ti/kan = 1pl", ctx.getImperativeSubjectPersonInfo("ti", "kan"), { person: 1, number: "pl", mode: "imperative" });
    s.eq("imperative subject shi/kan = 2pl", ctx.getImperativeSubjectPersonInfo("shi", "kan"), { person: 2, number: "pl", mode: "imperative" });
    s.eq("imperative subject /kan = 3pl", ctx.getImperativeSubjectPersonInfo("", "kan"), { person: 3, number: "pl", mode: "imperative" });
    s.eq("subject ni/ with imperative context = 1sg imperative", ctx.getSubjectPersonInfo("ni", "", { tense: "imperativo" }), { person: 1, number: "sg", mode: "imperative" });
    s.eq("subject // with imperative context = 3sg imperative", ctx.getSubjectPersonInfo("", "", { mode: "imperative" }), { person: 3, number: "sg", mode: "imperative" });
    s.eq("nonimperative subject ni/ = 1sg", ctx.getNonImperativeSubjectPersonInfo("ni", ""), { person: 1, number: "sg", mode: "nonimperative" });
    s.eq("nonimperative subject ti/ = 2sg", ctx.getNonImperativeSubjectPersonInfo("ti", ""), { person: 2, number: "sg", mode: "nonimperative" });
    s.eq("nonimperative subject // = 3sg", ctx.getNonImperativeSubjectPersonInfo("", ""), { person: 3, number: "sg", mode: "nonimperative" });
    s.eq("nonimperative subject ti/t = 1pl", ctx.getNonImperativeSubjectPersonInfo("ti", "t"), { person: 1, number: "pl", mode: "nonimperative" });
    s.eq("nonimperative subject an/t = 2pl", ctx.getNonImperativeSubjectPersonInfo("an", "t"), { person: 2, number: "pl", mode: "nonimperative" });
    s.eq("nonimperative subject /t = 3pl", ctx.getNonImperativeSubjectPersonInfo("", "t"), { person: 3, number: "pl", mode: "nonimperative" });
    s.eq("subject an/t with nonimperative tense = 2pl", ctx.getSubjectPersonInfo("an", "t", { tense: "presente" }), { person: 2, number: "pl", mode: "nonimperative" });
    s.eq("subject ti/ with nonimperative mode = 2sg", ctx.getSubjectPersonInfo("ti", "", { mode: "non-imperative" }), { person: 2, number: "sg", mode: "nonimperative" });

    // getObjectPersonInfo(prefix) → {person, number} | null
    s.eq("object ki = 3sg", ctx.getObjectPersonInfo("ki"), { person: 3, number: "sg" });
    s.eq("object nech = 1sg", ctx.getObjectPersonInfo("nech"), { person: 1, number: "sg" });
    s.eq("object tech = 1pl", ctx.getObjectPersonInfo("tech"), { person: 1, number: "pl" });
    s.eq("object kin = 3pl", ctx.getObjectPersonInfo("kin"), { person: 3, number: "pl" });
    s.eq("object mits = null (indirect object, not tracked)", ctx.getObjectPersonInfo("mits"), null);

    // isSamePersonAcrossNumber — true when subject and object share person but differ in number
    s.ok("1sg subj + 1pl obj = same person across number", ctx.isSamePersonAcrossNumber("ni", "", "tech"));
    s.ok("imperative 2sg subj + 2pl obj = same person across number", ctx.isSamePersonAcrossNumber("shi", "", "metzin"));
    s.no("1sg subj + 3sg obj = different person", ctx.isSamePersonAcrossNumber("ni", "", "ki"));
    s.no("2sg subj + 1sg obj = different person", ctx.isSamePersonAcrossNumber("ti", "", "nech"));

    // isSamePersonReflexive — subject = object in person+number (3rd person never reflexive here)
    s.ok("1sg subj + 1sg obj = reflexive", ctx.isSamePersonReflexive("ni", "", "nech"));
    s.ok("imperative 2pl subj + 2pl obj = reflexive", ctx.isSamePersonReflexive("shi", "kan", "metzin"));
    s.no("1sg subj + 3sg obj = not reflexive", ctx.isSamePersonReflexive("ni", "", "ki"));
    s.no("3sg subj + 3sg obj = not reflexive (3rd person excluded)", ctx.isSamePersonReflexive("", "", "ki"));

    // getObjectLabel — returns non-empty string for known prefixes
    s.ok("getObjectLabel ki returns non-empty", Boolean(ctx.getObjectLabel("ki")));
    s.ok("getObjectLabel kin returns non-empty", Boolean(ctx.getObjectLabel("kin")));
    s.ok("getObjectLabel nech returns non-empty", Boolean(ctx.getObjectLabel("nech")));
    s.ok("getObjectLabel empty prefix returns intransitive label", Boolean(ctx.getObjectLabel("")));

    // getObjectLabelShort — strips parenthetical suffix notations
    const longLabel = ctx.getObjectLabel("ki");
    const shortLabel = ctx.getObjectLabelShort("ki");
    s.ok("getObjectLabelShort result length <= full label length", shortLabel.length <= longLabel.length);
    s.no("getObjectLabelShort contains no parenthetical", shortLabel.includes("("));

    // getObjectComboLabel — Nawat hardcoded pronoun forms
    s.eq("getObjectComboLabel nech/Nawat = naja", ctx.getObjectComboLabel("nech", true), "naja");
    s.eq("getObjectComboLabel metz/Nawat = taja", ctx.getObjectComboLabel("metz", true), "taja");
    s.eq("getObjectComboLabel ki/Nawat = yaja", ctx.getObjectComboLabel("ki", true), "yaja");
    s.eq("getObjectComboLabel tech/Nawat = tejemet", ctx.getObjectComboLabel("tech", true), "tejemet");
    s.eq("getObjectComboLabel kin/Nawat = yejemet", ctx.getObjectComboLabel("kin", true), "yejemet");
    // Spanish mode delegates to getObjectLabelShort
    s.eq("getObjectComboLabel ki/Spanish = getObjectLabelShort(ki)", ctx.getObjectComboLabel("ki", false), ctx.getObjectLabelShort("ki", false));
    s.eq(
        "masked conjugation display uses a diagnostic message instead of an empty dash",
        ctx.getConjugationNoOutputDisplay({
            shouldMaskRow: true,
            isErrorRow: true,
            diagnosticIds: [ctx.CONJUGATION_DIAGNOSTIC_IDS.invalidCombo],
        }),
        "Combinacion incompatible."
    );
    s.eq(
        "missing conjugation display has a stable fallback",
        ctx.getConjugationNoOutputDisplay({ hasRenderableResult: false }),
        "Sin salida para esta configuracion."
    );
    s.eq(
        "conjugation evaluation reads LCM frame and contract diagnostics",
        (() => {
            const diagnostic = {
                id: "ANDREWS_ROUTE_NOT_LICENSED",
                message: "Andrews route blocked before generation.",
                severity: "error",
            };
            const grammarFrame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "diagnostic-only",
                    andrewsRefs: ["Andrews Lesson 53"],
                    supported: false,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "comparison",
                    routeStage: "classify-boundary",
                    generationAllowed: false,
                    blockingDiagnostics: [diagnostic],
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    outputKind: "comparison-candidate-classification",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "diagnostic-only",
                    diagnostics: [diagnostic],
                }),
            });
            const evaluation = ctx.buildConjugationEvaluationRecord({
                result: {
                    frames: grammarFrame,
                    contractDiagnostics: [diagnostic],
                },
            });
            const row = { dataset: {} };
            ctx.applyConjugationEvaluationPresentation({
                row,
                value: null,
                evaluation,
            });
            return {
                label: ctx.getConjugationNoOutputDisplay(evaluation),
                diagnosticIds: evaluation.diagnosticIds,
                routeFamily: row.dataset.lcmRouteFamily,
                routeStage: row.dataset.lcmRouteStage,
                generationAllowed: row.dataset.lcmGenerationAllowed,
                evidenceStatus: row.dataset.lcmEvidenceStatus,
            };
        })(),
        {
            label: "Andrews route blocked before generation.",
            diagnosticIds: ["ANDREWS_ROUTE_NOT_LICENSED"],
            routeFamily: "comparison",
            routeStage: "classify-boundary",
            generationAllowed: "false",
            evidenceStatus: "diagnostic-only",
        }
    );
    s.eq(
        "conjugation evaluation promotes framed failed layer over generic no-output",
        (() => {
            const grammarFrame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "blocked",
                    andrewsRefs: ["Andrews Lesson 4"],
                    supported: false,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "generate-word",
                    routeStage: "morphology-application",
                    generationAllowed: false,
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    outputKind: "generate-word",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "blocked",
                    diagnostics: [],
                }),
            });
            const evaluation = ctx.buildConjugationEvaluationRecord({
                result: {
                    error: true,
	                    diagnostics: [{
	                        id: "generate-word-route-blocked",
	                        severity: "error",
	                        message: "La generacion no produjo una forma.",
	                        failedLayer: "output",
	                        contractLayer: "resultFrame",
	                    }],
                    frames: grammarFrame,
                },
            });
            return {
                label: ctx.getConjugationNoOutputDisplay(evaluation),
                diagnosticIds: evaluation.diagnosticIds,
                firstFailedLayer: evaluation.diagnostics[0]?.failedLayer || "",
                firstContractLayer: evaluation.diagnostics[0]?.contractLayer || "",
                secondMessage: evaluation.diagnostics[1]?.message || "",
            };
        })(),
        {
            label: "Ruta bloqueada antes de generar por la evidencia Andrews del contrato.",
            diagnosticIds: ["ANDREWS_ROUTE_NOT_LICENSED", "generate-word-route-blocked"],
            firstFailedLayer: "authority",
            firstContractLayer: "authorityFrame",
            secondMessage: "La generacion no produjo una forma.",
        }
    );
    s.eq(
        "conjugation presentation infers LCM failed layer from blocked frame status",
        (() => {
            const plainDiagnostic = {
                id: "plain-route-blocked",
                severity: "error",
                message: "Route blocked without explicit layer.",
            };
            const grammarFrame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "blocked",
                    andrewsRefs: ["Andrews Lesson 4"],
                    supported: true,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "vnc",
                    routeStage: "classify-route",
                    generationAllowed: false,
                    blockingDiagnostics: [plainDiagnostic],
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    outputKind: "vnc",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "blocked",
                    diagnostics: [plainDiagnostic],
                }),
            });
            const evaluation = ctx.buildConjugationEvaluationRecord({
                result: {
                    frames: grammarFrame,
                    diagnostics: [plainDiagnostic],
                },
            });
            const row = { dataset: {} };
            ctx.applyConjugationEvaluationPresentation({
                row,
                value: null,
                evaluation,
            });
            return {
                diagnosticId: row.dataset.lcmDiagnosticId,
                failedLayer: row.dataset.lcmFailedLayer,
                contractLayer: row.dataset.lcmContractLayer,
            };
        })(),
        {
            diagnosticId: "plain-route-blocked",
            failedLayer: "route",
            contractLayer: "routeContract",
        }
    );
    s.eq(
        "conjugation evaluation treats contract surface as renderable",
        (() => {
            const result = ctx.buildOutputWordResult({ subjectPrefix: "ni", verb: "nemi" });
            const evaluation = ctx.buildConjugationEvaluationRecord({ result });
            return {
                resultField: result.result || "",
                surface: result.surface,
                hasRenderableResult: evaluation.hasRenderableResult,
                hasVisibleResult: evaluation.hasVisibleResult,
                availabilityState: evaluation.availabilityState,
            };
        })(),
        {
            resultField: "",
            surface: "ninemi",
            hasRenderableResult: true,
            hasVisibleResult: true,
            availabilityState: ctx.CONJUGATION_AVAILABILITY_STATE.viable,
        }
    );
    s.eq(
        "conjugation evaluation treats LCM result-frame surface forms as renderable",
        (() => {
            const grammarFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-visible-a / frame-visible-b"],
                    outputKind: "vnc",
                    generationRoute: "vnc",
                }),
            });
            const result = {
                result: "stale-visible-result",
                surface: "top-visible-surface",
                surfaceForms: ["stale-visible-a / stale-visible-b"],
                frames: grammarFrame,
            };
            const evaluation = ctx.buildConjugationEvaluationRecord({ result });
            return {
                forms: ctx.getConjugationRenderableSurfaceForms(result),
                surface: ctx.getConjugationRenderableSurface(result),
                hasRenderableResult: evaluation.hasRenderableResult,
                hasVisibleResult: evaluation.hasVisibleResult,
                availabilityState: evaluation.availabilityState,
            };
        })(),
        {
            forms: ["frame-visible-a", "frame-visible-b"],
            surface: "frame-visible-a / frame-visible-b",
            hasRenderableResult: true,
            hasVisibleResult: true,
            availabilityState: ctx.CONJUGATION_AVAILABILITY_STATE.viable,
        }
    );
    s.eq(
        "conjugation renderable surface reader stops at empty LCM result frames before legacy surfaces",
        (() => {
            const result = {
                result: "stale-visible-result",
                surface: "top-visible-surface",
                surfaceForms: ["stale-visible-a / stale-visible-b"],
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surface: "",
                        surfaceForms: [],
                        outputKind: "blocked-vnc",
                    }),
                }),
            };
            return {
                forms: ctx.getConjugationRenderableSurfaceForms(result),
                surface: ctx.getConjugationRenderableSurface(result),
            };
        })(),
        {
            forms: [],
            surface: "",
        }
    );
    s.eq(
        "presentation falls back to contract surface when legacy formatted value is blank",
        (() => {
            const classes = new Set();
            const value = {
                textContent: "",
                dataset: {},
                classList: {
                    add: (...names) => names.forEach((name) => classes.add(name)),
                    remove: (...names) => names.forEach((name) => classes.delete(name)),
                    contains: (name) => classes.has(name),
                },
            };
            const result = ctx.buildOutputWordResult({ subjectPrefix: "ni", verb: "nemi" });
            const evaluation = ctx.buildConjugationEvaluationRecord({ result });
            ctx.applyConjugationEvaluationPresentation({
                value,
                evaluation,
                formattedValue: "",
            });
            return {
                textContent: value.textContent,
                noOutputClass: classes.has("conjugation-value--no-output"),
                availabilityState: value.dataset.availabilityState,
            };
        })(),
        {
            textContent: "ninemi",
            noOutputClass: false,
            availabilityState: ctx.CONJUGATION_AVAILABILITY_STATE.viable,
        }
    );
    s.eq(
        "mask state prefers LCM route diagnostics over generic result error",
        (() => {
            const diagnostic = {
                id: "ANDREWS_ROUTE_NOT_LICENSED",
                message: "Andrews route blocked before generation.",
                severity: "error",
            };
            const grammarFrame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "diagnostic-only",
                    andrewsRefs: ["Andrews Lesson 40"],
                    supported: false,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "adjectival-nnc-function",
                    routeStage: "classify-route",
                    generationAllowed: false,
                    blockingDiagnostics: [diagnostic],
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    outputKind: "adjectival-nnc-function",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "blocked",
                    diagnostics: [diagnostic],
                }),
            });
            const result = {
                error: true,
                frames: grammarFrame,
                contractDiagnostics: [diagnostic],
            };
            const maskState = ctx.getConjugationMaskState({
                result,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
                enforceInvalidCombo: false,
            });
            const evaluation = ctx.buildConjugationEvaluationRecord({ result, maskState });
            return {
                maskDiagnosticIds: maskState.diagnosticIds,
                evaluationDiagnosticIds: evaluation.diagnosticIds,
                label: ctx.getConjugationNoOutputDisplay(evaluation),
            };
        })(),
        {
            maskDiagnosticIds: ["ANDREWS_ROUTE_NOT_LICENSED"],
            evaluationDiagnosticIds: ["ANDREWS_ROUTE_NOT_LICENSED"],
            label: "Andrews route blocked before generation.",
        }
    );
    s.eq(
        "verb-derived nominal builder context exposes non-enumerable LCM frame",
        (() => {
            const rawVerb = "(miki)";
            const result = ctx.buildVerbDerivedNominalBuilderContext({
                kind: ctx.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
                rawVerb,
                verbMeta: ctx.parseVerbInput(rawVerb),
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            });
            return {
                error: result.error,
                ok: result.ok,
                surface: result.surface,
                frameAlias: result.frames === result.grammarFrame,
                grammarFrameEnumerable: Object.prototype.propertyIsEnumerable.call(result, "grammarFrame"),
                routeFamily: result.grammarFrame.routeContract.routeFamily,
                routeStage: result.grammarFrame.routeContract.routeStage,
                unitKind: result.grammarFrame.unitFrame.unitKind,
                generationAllowed: result.grammarFrame.routeContract.generationAllowed,
                evidenceStatus: result.grammarFrame.authorityFrame.evidenceStatus,
                sourceInput: result.grammarFrame.resultFrame.sourceInput,
            };
        })(),
        {
            error: false,
            ok: true,
            surface: "",
            frameAlias: true,
            grammarFrameEnumerable: false,
            routeFamily: "verb-derived-nominal-builder-context",
            routeStage: "build-context",
            unitKind: "agreement-builder-context",
            generationAllowed: true,
            evidenceStatus: "context-built",
            sourceInput: "(miki)",
        }
    );
    s.eq(
        "verb-derived nominal builder context blocked gates carry diagnostics",
        (() => {
            const rawVerb = "(miki)";
            const result = ctx.buildVerbDerivedNominalBuilderContext({
                kind: ctx.VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
                rawVerb,
                verbMeta: ctx.parseVerbInput(rawVerb),
                subjectPrefix: "ni",
                subjectSuffix: "",
                objectPrefix: "",
                requireNonanimateSubject: true,
            });
            return {
                error: result.error,
                ok: result.ok,
                routeStage: result.grammarFrame.routeContract.routeStage,
                generationAllowed: result.grammarFrame.routeContract.generationAllowed,
                diagnosticStatus: result.grammarFrame.diagnosticFrame.status,
                diagnosticId: result.grammarFrame.diagnosticFrame.diagnostics[0]?.id || "",
                diagnosticMessage: result.grammarFrame.diagnosticFrame.diagnostics[0]?.message || "",
                diagnosticFailedLayer: result.grammarFrame.diagnosticFrame.diagnostics[0]?.failedLayer || "",
                diagnosticContractLayer: result.grammarFrame.diagnosticFrame.diagnostics[0]?.contractLayer || "",
                diagnosticRouteFamily: result.grammarFrame.diagnosticFrame.diagnostics[0]?.routeFamily || "",
                diagnosticRouteStage: result.grammarFrame.diagnosticFrame.diagnostics[0]?.routeStage || "",
                diagnosticsEnumerable: Object.prototype.propertyIsEnumerable.call(result, "diagnostics"),
            };
        })(),
        {
            error: true,
            ok: false,
            routeStage: "subject-gate",
            generationAllowed: false,
            diagnosticStatus: "blocked",
            diagnosticId: "verb-derived-nominal-context-nonanimate-subject-required",
            diagnosticMessage: "Esta ruta nominal requiere sujeto no animado.",
            diagnosticFailedLayer: "agreement",
            diagnosticContractLayer: "participantFrame",
            diagnosticRouteFamily: "verb-derived-nominal-builder-context",
            diagnosticRouteStage: "subject-gate",
            diagnosticsEnumerable: false,
        }
    );
    s.eq(
        "blank formatted conjugation display normalizes to no output",
        ctx.normalizeConjugationDisplayText("—"),
        ""
    );

    return s;
}

module.exports = { run };
