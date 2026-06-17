"use strict";

/**
 * Tests for src/core/agreement/agreement.js
 * Covers: getPers1Pers2Info, getObj1PersonInfo,
 *         isPers1Obj1SamePersonAcrossNumber, isPers1Obj1Reflexivo.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("agreement");

    // getPers1Pers2Info(pers1, pers2) -> {person, number}
    s.eq("pers1-pers2 ni/Ø = 1sg", ctx.getPers1Pers2Info("ni", ""), { person: 1, number: "sg" });
    s.eq("pers1-pers2 ti/Ø = 2sg", ctx.getPers1Pers2Info("ti", ""), { person: 2, number: "sg" });
    s.eq("pers1-pers2 Ø/Ø = 3sg", ctx.getPers1Pers2Info("", ""), { person: 3, number: "sg" });
    s.eq("pers1-pers2 ti/t = 1pl", ctx.getPers1Pers2Info("ti", "t"), { person: 1, number: "pl" });
    s.eq("pers1-pers2 shi/Ø = 2sg imperative", ctx.getPers1Pers2Info("shi", ""), { person: 2, number: "sg", mode: "imperative" });
    s.eq("pers1-pers2 ti/kan = 1pl imperative", ctx.getPers1Pers2Info("ti", "kan"), { person: 1, number: "pl", mode: "imperative" });
    s.eq("pers1-pers2 shi/kan = 2pl imperative", ctx.getPers1Pers2Info("shi", "kan"), { person: 2, number: "pl", mode: "imperative" });
    s.eq("pers1-pers2 Ø/kan = 3pl imperative", ctx.getPers1Pers2Info("", "kan"), { person: 3, number: "pl", mode: "imperative" });
    s.eq("imperative pers1-pers2 ni/Ø = 1sg", ctx.getImperativePers1Pers2Info("ni", ""), { person: 1, number: "sg", mode: "imperative" });
    s.eq("imperative pers1-pers2 shi/Ø = 2sg", ctx.getImperativePers1Pers2Info("shi", ""), { person: 2, number: "sg", mode: "imperative" });
    s.eq("imperative pers1-pers2 Ø/Ø = 3sg", ctx.getImperativePers1Pers2Info("", ""), { person: 3, number: "sg", mode: "imperative" });
    s.eq("imperative pers1-pers2 ti/kan = 1pl", ctx.getImperativePers1Pers2Info("ti", "kan"), { person: 1, number: "pl", mode: "imperative" });
    s.eq("imperative pers1-pers2 shi/kan = 2pl", ctx.getImperativePers1Pers2Info("shi", "kan"), { person: 2, number: "pl", mode: "imperative" });
    s.eq("imperative pers1-pers2 Ø/kan = 3pl", ctx.getImperativePers1Pers2Info("", "kan"), { person: 3, number: "pl", mode: "imperative" });
    s.eq("pers1-pers2 ni/Ø with imperative context = 1sg imperative", ctx.getPers1Pers2Info("ni", "", { tense: "imperativo" }), { person: 1, number: "sg", mode: "imperative" });
    s.eq("pers1-pers2 Ø/Ø with imperative context = 3sg imperative", ctx.getPers1Pers2Info("", "", { mode: "imperative" }), { person: 3, number: "sg", mode: "imperative" });
    s.eq("nonimperative pers1-pers2 ni/Ø = 1sg", ctx.getNonImperativePers1Pers2Info("ni", ""), { person: 1, number: "sg", mode: "nonimperative" });
    s.eq("nonimperative pers1-pers2 ti/Ø = 2sg", ctx.getNonImperativePers1Pers2Info("ti", ""), { person: 2, number: "sg", mode: "nonimperative" });
    s.eq("nonimperative pers1-pers2 Ø/Ø = 3sg", ctx.getNonImperativePers1Pers2Info("", ""), { person: 3, number: "sg", mode: "nonimperative" });
    s.eq("nonimperative pers1-pers2 ti/t = 1pl", ctx.getNonImperativePers1Pers2Info("ti", "t"), { person: 1, number: "pl", mode: "nonimperative" });
    s.eq("nonimperative pers1-pers2 an/t = 2pl", ctx.getNonImperativePers1Pers2Info("an", "t"), { person: 2, number: "pl", mode: "nonimperative" });
    s.eq("nonimperative pers1-pers2 Ø/t = 3pl", ctx.getNonImperativePers1Pers2Info("", "t"), { person: 3, number: "pl", mode: "nonimperative" });
    s.eq("pers1-pers2 an/t with nonimperative tense = 2pl", ctx.getPers1Pers2Info("an", "t", { tense: "presente" }), { person: 2, number: "pl", mode: "nonimperative" });
    s.eq("pers1-pers2 ti/Ø with nonimperative mode = 2sg", ctx.getPers1Pers2Info("ti", "", { mode: "non-imperative" }), { person: 2, number: "sg", mode: "nonimperative" });

    // getObj1PersonInfo(obj1) -> {person, number} | null
    s.eq("obj1 ki = 3sg", ctx.getObj1PersonInfo("ki"), { person: 3, number: "sg" });
    s.eq("obj1 nech = 1sg", ctx.getObj1PersonInfo("nech"), { person: 1, number: "sg" });
    s.eq("obj1 tech = 1pl", ctx.getObj1PersonInfo("tech"), { person: 1, number: "pl" });
    s.eq("obj1 kin = 3pl", ctx.getObj1PersonInfo("kin"), { person: 3, number: "pl" });
    s.eq("obj1 mits = null (secondary object, not tracked)", ctx.getObj1PersonInfo("mits"), null);

    // isPers1Obj1SamePersonAcrossNumber: true when pers1-pers2 and obj1 share person but differ in number.
    s.ok("1sg pers1-pers2 + 1pl obj1 = same person across number", ctx.isPers1Obj1SamePersonAcrossNumber("ni", "", "tech"));
    s.ok("imperative 2sg pers1-pers2 + 2pl obj1 = same person across number", ctx.isPers1Obj1SamePersonAcrossNumber("shi", "", "metzin"));
    s.no("1sg pers1-pers2 + 3sg obj1 = different person", ctx.isPers1Obj1SamePersonAcrossNumber("ni", "", "ki"));
    s.no("2sg pers1-pers2 + 1sg obj1 = different person", ctx.isPers1Obj1SamePersonAcrossNumber("ti", "", "nech"));

    // isPers1Obj1Reflexivo: pers1-pers2 = obj1 in person+number (3rd person never reflexive here).
    s.ok("1sg pers1-pers2 + 1sg obj1 = reflexive", ctx.isPers1Obj1Reflexivo("ni", "", "nech"));
    s.ok("imperative 2pl pers1-pers2 + 2pl obj1 = reflexive", ctx.isPers1Obj1Reflexivo("shi", "kan", "metzin"));
    s.no("1sg pers1-pers2 + 3sg obj1 = not reflexive", ctx.isPers1Obj1Reflexivo("ni", "", "ki"));
    s.no("3sg pers1-pers2 + 3sg obj1 = not reflexive (3rd person excluded)", ctx.isPers1Obj1Reflexivo("", "", "ki"));

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
    const lesson23Objects = ctx.buildLesson23VerbObjectsPursuitFrame();
    s.eq(
        "Lesson 23 object pursuit frame keeps Andrews object architecture partial",
        {
            stepNumber: lesson23Objects.stepNumber,
            aimStatus: lesson23Objects.aimStatus,
            pdfRefs: lesson23Objects.pdfRefs,
            categories: lesson23Objects.subsectionInventory.map((entry) => entry.category),
            transitiveIsCoverTerm: lesson23Objects.objectKindFrame.transitiveIsCoverTerm,
            objectStemTypes: lesson23Objects.objectKindFrame.objectStemTypes,
            discontinuousUnit: lesson23Objects.objectKindFrame.objectAndSuffixAreDiscontinuousUnit,
            maxValencePositions: lesson23Objects.multipleValenceFrame.maxValencePositions,
            historySources: lesson23Objects.multipleValenceFrame.histories.map((entry) => entry.source),
            directivePathCounts: lesson23Objects.multipleValenceFrame.histories[1].path.map((entry) => entry.objectCount),
            allPositionsObligatory: lesson23Objects.valenceRuleFrame.everyPositionAndSubpositionObligatory,
            specificProjectiveIncompatible: lesson23Objects.valenceRuleFrame.specificProjectiveObjectPronounsMutuallyIncompatible,
            formula: lesson23Objects.formulaFrame.representativeFormula,
            currentUiFormula: lesson23Objects.formulaFrame.currentUiFormulaShorthand,
            shuntlineReflexive: lesson23Objects.formulaFrame.shuntlineReflexive,
            sequencePriorities: lesson23Objects.objectSequenceFrame.priorityRules,
            threeObjectCombinationCount: lesson23Objects.objectSequenceFrame.andrewsThreeObjectCombinations.length,
            objectBridge: lesson23Objects.objectSequenceFrame.nawatOrthographyBridge.map((entry) => [entry.andrews, entry.nawat]),
            functionGap: lesson23Objects.currentEngineBoundary.objectFunctionAmbiguityNotFullyExposed,
            silentGap: lesson23Objects.currentEngineBoundary.silentMorphTableIncomplete,
            closestPass: lesson23Objects.closestPass,
            remainingGapCount: lesson23Objects.remainingGaps.length,
        },
        {
            stepNumber: 23,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 23.1",
                "Andrews Lesson 23.2",
                "Andrews Lesson 23.3",
                "Andrews Lesson 23.4",
                "Andrews Lesson 23.5",
            ],
            categories: [
                "verb-object-kinds",
                "multiple-valence-positions",
                "valence-position-rules",
                "multiple-valence-formula",
                "object-sequence-priorities",
            ],
            transitiveIsCoverTerm: true,
            objectStemTypes: ["directive", "causative", "applicative"],
            discontinuousUnit: true,
            maxValencePositions: 3,
            historySources: ["intransitive", "directive"],
            directivePathCounts: [1, 2, 3],
            allPositionsObligatory: true,
            specificProjectiveIncompatible: true,
            formula: "#pers1-pers2+va+va+va(DBASE-CAUS-APPLIC)tns+num1-num2#",
            currentUiFormula: "#pers1-pers2(base)tiempo+num1-num2#",
            shuntlineReflexive: "ne",
            sequencePriorities: [
                "specific-projective-before-reflexive",
                "specific-projective-before-nonspecific-projective",
                "reflexive-before-nonspecific-projective",
                "human-before-nonhuman",
            ],
            threeObjectCombinationCount: 13,
            objectBridge: [["tla", "ta"], ["m-o", "mu"], ["c/qu/qui", "ki/k"]],
            functionGap: true,
            silentGap: true,
            closestPass: false,
            remainingGapCount: 5,
        }
    );
    s.eq(
        "Lesson 23 object pursuit frame exposes non-enumerable LCM audit metadata",
        {
            hasFrame: Boolean(lesson23Objects.grammarFrame),
            routeFamily: lesson23Objects.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson23Objects.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson23Objects.grammarFrame?.routeContract?.generationAllowed,
            ok: lesson23Objects.ok,
            formulaLabel: lesson23Objects.grammarFrame?.nuclearClauseFrame?.formulaLabel || "",
            maxValencePositions: lesson23Objects.grammarFrame?.participantFrame?.maxValencePositions,
            silentMorphStillOccupiesPosition: lesson23Objects.grammarFrame?.participantFrame?.silentMorphStillOccupiesPosition,
            objectBridge: lesson23Objects.grammarFrame?.orthographyFrame?.objectBridge || null,
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson23Objects, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "agreement-valence",
            routeStage: "audit-lesson-23",
            generationAllowed: false,
            ok: true,
            formulaLabel: "CNV transitiva de valencia multiple",
            maxValencePositions: 3,
            silentMorphStillOccupiesPosition: true,
            objectBridge: [
                { andrews: "tla", nawat: "ta" },
                { andrews: "m-o", nawat: "mu" },
                { andrews: "c/qu/qui", nawat: "ki/k" },
            ],
            enumerableGrammarFrame: false,
        }
    );
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
                    routeFamily: "nuclear-clause-surface",
                    routeStage: "morphology-application",
                    generationAllowed: false,
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    outputKind: "nuclear-clause-surface",
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
	                        id: "nuclear-clause-surface-route-blocked",
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
            diagnosticIds: ["ANDREWS_ROUTE_NOT_LICENSED", "nuclear-clause-surface-route-blocked"],
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
            const result = ctx.buildOutputWordResult({ pers1: "ni", tronco: "nemi" });
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
        "conjugation renderable surface reader stops at empty LCM result frames before stale surfaces",
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
        "presentation falls back to contract surface when stale formatted value is blank",
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
            const result = ctx.buildOutputWordResult({ pers1: "ni", tronco: "nemi" });
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
