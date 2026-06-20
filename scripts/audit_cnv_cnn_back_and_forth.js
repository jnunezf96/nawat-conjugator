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

function buildAuditOutputMatchings(context, audit) {
    const outputMatchings = [
        ...buildVisibleContinuationOutputMatchings(context),
        ...buildEnginePathOutputMatchings(audit),
        ...buildRouteRecordOutputMatchings(audit),
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
    console.log(JSON.stringify({
        ...audit,
        auditOutputMatchings,
    }, null, 2));
}

if (require.main === module) {
    main();
}
