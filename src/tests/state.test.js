"use strict";

/**
 * Tests for src/ui/state.js — Toggle Lock functions.
 * Covers: isToggleLockEnabled, getToggleLockStateKey,
 *         getToggleStateValue, setToggleStateValue,
 *         clearToggleLockValueState, clearAllToggleStateMaps,
 *         applyDefaultToggleStateOnce.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("state");

    // isToggleLockEnabled — ToggleLockState starts disabled
    s.no("toggle lock off by default", ctx.isToggleLockEnabled());
    s.eq("nawat mode scaffold includes particle", ctx.NAWAT_TENSE_MODE.particula, "particula");
    s.eq("european mode scaffold remains available", ctx.TENSE_MODE_SYSTEM.european, "european");
    const tiPreteritRoute = ctx.getNawatRouteProfile("adjetivo-preterito-tik");
    s.eq("future nawat route maps legacy -tik preterit id", tiPreteritRoute.id, "denominal-vi-ti-preterit");
    s.eq("future nawat route keeps source slot", tiPreteritRoute.sourceSlot, "noun/inc.root");
    s.eq("future nawat route keeps denominal VI verbalizer", tiPreteritRoute.verbalizer, "-ti");
    s.eq("future nawat route maps to nawat verb mode", tiPreteritRoute.nawatMode, "verbo");
    s.eq(
        "future nawat route stays inside nawat verb convention",
        ctx.formatNawatRouteNawatTargetLabel(tiPreteritRoute, false),
        "Nawat: Verbo > pretérito perfecto simple"
    );
    s.eq(
        "future nawat route foregrounds noun to verb conversion",
        ctx.formatNawatRouteConversionLabel(tiPreteritRoute, false),
        "Sustantivo -> Verbo"
    );
    s.no(
        "future nawat breadcrumb target does not point to european convention",
        ctx.formatNawatRouteNawatTargetLabel(tiPreteritRoute, false).includes("Europea")
    );
    const tiPreteritTarget = ctx.resolveNawatRouteTarget("denominal-vi-ti-preterit", {
        sourceVerb: "(pusuni)",
    });
    s.eq("future nawat route verbalizes pusuni with -ti before traveling", tiPreteritTarget.targetVerb, "pusukti");
    s.eq("future nawat route keeps source convention mode", tiPreteritTarget.sourceMode, ctx.TENSE_MODE.verbo);
    s.eq("future nawat route keeps source station", tiPreteritTarget.sourceTenseValue, "presente");
    s.eq("future nawat route targets verb mode", tiPreteritTarget.targetMode, ctx.TENSE_MODE.verbo);
    s.eq("future nawat route targets ordinary verb preterite", tiPreteritTarget.targetTenseValue, "preterito");
    s.eq(
        "future nawat route exposes source breadcrumb stop",
        ctx.formatNawatRouteNawatOriginLabel(tiPreteritRoute, false),
        "Nawat: Verbo > presente"
    );
    const tiRouteStations = ctx.getNawatRouteStationModels("denominal-vi-ti-preterit", {
        sourceVerb: "(pusuni)",
    });
    s.eq(
        "future nawat route exposes clickable station keys",
        tiRouteStations.map((station) => station.key),
        ["source-mode", "source-tense", "stem", "verbalizer", "target-mode", "finite-tense"]
    );
    s.eq(
        "future nawat route lets #1 entrada change by station",
        tiRouteStations.map((station) => station.inputValue),
        ["(pusuni)", "(pusuni)", "pusuk", "(pusukti)", "(pusukti)", "(pusukti)"]
    );
    s.eq(
        "future nawat route separates verb source and noun patientive stem stations",
        tiRouteStations.map((station) => `${station.mode}:${station.tenseValue}`),
        ["verbo:presente", "verbo:presente", "sustantivo:patientivo", "verbo:presente", "verbo:presente", "verbo:preterito"]
    );
    s.eq(
        "future nawat route exposes the active station segment as grammar metadata",
        ctx.formatNawatRouteStationConversionLabel(tiPreteritRoute, "verbalizer", false, {
            stationModels: tiRouteStations,
        }),
        "tronco verbal -> [noun/inc.root]ti"
    );
    s.eq(
        "future nawat route conversion follows surface train trail",
        ctx.formatNawatRouteSurfaceTrailLabel(tiPreteritRoute, {
            sourceVerb: "(pusuni)",
            stationModels: tiRouteStations,
            routeTarget: tiPreteritTarget,
        }),
        "(pusuni) → pusuk → (pusukti) → pusuktik"
    );
    const tiRouteFromTroncoOutputTarget = ctx.resolveNawatRouteTarget("denominal-vi-ti-preterit", {
        sourceVerb: "(pusuni)",
        sourceStem: "pusuchti",
    });
    const tiRouteFromTroncoOutputStations = ctx.getNawatRouteStationModels("denominal-vi-ti-preterit", {
        sourceVerb: "(pusuni)",
        sourceStem: "pusuchti",
        routeTarget: tiRouteFromTroncoOutputTarget,
    });
    s.eq(
        "future nawat route can start conversion from a clicked tronco output",
        ctx.formatNawatRouteSurfaceTrailLabel(tiPreteritRoute, {
            sourceVerb: "(pusuni)",
            sourceStem: "pusuchti",
            stationModels: tiRouteFromTroncoOutputStations,
            routeTarget: tiRouteFromTroncoOutputTarget,
        }),
        "(pusuni) → pusuchti → (pusuchtiti) → pusuchtitik"
    );
    const naPerfectRoute = ctx.getNawatRouteProfile("denominal-vt-na-perfect");
    s.eq("canonical future nawat route resolves legacy tense", naPerfectRoute.legacyTenseValue, "adjetivo-perfecto-naj");
    s.eq("canonical future nawat route keeps denominal VT verbalizer", naPerfectRoute.verbalizer, "-na");
    const naPreteritRoute = ctx.getNawatRouteProfile("denominal-vt-na-preterit");
    const naPreteritTarget = ctx.resolveNawatRouteTarget("denominal-vt-na-preterit", {
        sourceVerb: "(pusuni)",
    });
    const naRouteStations = ctx.getNawatRouteStationModels("denominal-vt-na-preterit", {
        sourceVerb: "(pusuni)",
        routeTarget: naPreteritTarget,
    });
    s.eq(
        "future nawat -na route keeps verbalizer inside transitive input",
        naRouteStations.map((station) => station.inputValue),
        ["(pusuni)", "(pusuni)", "pusuk", "(pusuk)-(na)", "(pusuk)-(na)", "(pusuk)-(na)"]
    );
    s.eq(
        "future nawat -na conversion follows segmented transitive trail",
        ctx.formatNawatRouteSurfaceTrailLabel(naPreteritRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: naPreteritTarget,
            stationModels: naRouteStations,
        }),
        "(pusuni) → pusuk → (pusuk)-(na) → pusuknaj"
    );
    const agentiveMannerRoute = ctx.getNawatRouteProfile("agentive-manner-adverb");
    s.eq(
        "future nawat agentive route stays in nawat noun convention",
        ctx.formatNawatRouteNawatTargetLabel(agentiveMannerRoute, false),
        "Nawat: Sustantivo > agentivo"
    );
    s.eq(
        "future nawat agentive route foregrounds verb to noun conversion",
        ctx.formatNawatRouteConversionLabel(agentiveMannerRoute, false),
        "Verbo -> Sustantivo"
    );
    s.eq(
        "future nawat agentive route keeps the train inside nawat stations",
        ctx.getNawatRouteStationModels("agentive-manner-adverb", { sourceVerb: "(mati)" }).map((station) => station.key),
        ["source-mode", "source-tense", "manner", "target-mode", "finite-tense"]
    );
    const directPreteritRoute = ctx.getNawatRouteProfile("direct-active-preterit");
    s.eq("direct active preterit route resolves legacy tense", directPreteritRoute.legacyTenseValue, "adjetivo-preterito");
    s.ok(
        "all future nawat routes expose spanish-side route labels",
        ctx.getNawatRouteProfiles().every((profile) => ctx.formatNawatRouteProfileLabel(profile, false))
    );
    s.ok(
        "all future nawat routes expose nawat-side route labels",
        ctx.getNawatRouteProfiles().every((profile) => ctx.formatNawatRouteProfileLabel(profile, true))
    );
    s.eq(
        "direct active preterit route has a nawat-side spanish label",
        ctx.formatNawatRouteProfileLabel(directPreteritRoute, false),
        "verbo → pretérito perfecto simple"
    );
    s.eq(
        "direct active preterit route has a nawat label",
        ctx.formatNawatRouteProfileLabel(directPreteritRoute, true),
        "muchiwalis → ipan muchiwki"
    );
    s.eq(
        "direct active preterit route has a nawat-side meta label",
        ctx.formatNawatRouteProfileMetaLabel(directPreteritRoute, false),
        "presente → pretérito perfecto simple"
    );
    s.eq(
        "direct active preterit route is verb to verb",
        ctx.formatNawatRouteConversionLabel(directPreteritRoute, false),
        "Verbo -> Verbo"
    );
    const directPreteritTarget = ctx.resolveNawatRouteTarget(directPreteritRoute, { sourceVerb: "(pusuni)" });
    const directPreteritStations = ctx.getNawatRouteStationModels(directPreteritRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: directPreteritTarget,
    });
    s.eq(
        "direct active preterit route hides redundant source tense and target mode stations",
        directPreteritStations.map((station) => station.key),
        ["source-mode", "finite-tense"]
    );
    s.eq(
        "direct active preterit route lands in ordinary verb preterite",
        ctx.formatNawatRouteSurfaceTrailLabel(directPreteritRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: directPreteritTarget,
            stationModels: directPreteritStations,
        }),
        "(pusuni) → pusunki"
    );
    const directPerfectRoute = ctx.getNawatRouteProfile("direct-active-perfect");
    s.eq(
        "direct active perfect route lands in ordinary verb perfect",
        ctx.formatNawatRouteSurfaceTrailLabel(directPerfectRoute, {
            sourceVerb: "(pusuni)",
        }),
        "(pusuni) → pusuntuk"
    );
    const patientivoNonactiveRoute = ctx.getNawatRouteProfile("patientivo-nonactive-ti");
    s.eq(
        "patientivo nonactive route has a nawat label",
        ctx.formatNawatRouteProfileLabel(patientivoNonactiveRoute, true),
        "muchiwalis → tachiwal te muselia -ti"
    );
    const patientivoNonactiveTarget = ctx.resolveNawatRouteTarget(patientivoNonactiveRoute, { sourceVerb: "(pusuni)" });
    const patientivoNonactiveStations = ctx.getNawatRouteStationModels(patientivoNonactiveRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: patientivoNonactiveTarget,
    });
    s.eq(
        "patientivo nonactive route is verb to noun",
        ctx.formatNawatRouteConversionLabel(patientivoNonactiveRoute, false),
        "Verbo -> Sustantivo"
    );
    s.eq(
        "patientivo nonactive route exposes branch and suffix stations",
        patientivoNonactiveStations.map((station) => station.key),
        ["source-mode", "source-tense", "patientivo-branch", "surface-profile", "target-mode", "finite-tense"]
    );
    s.eq(
        "patientivo nonactive route keeps its branch metadata",
        patientivoNonactiveStations.find((station) => station.key === "patientivo-branch").patientivoSource,
        "nonactive"
    );
    s.eq(
        "patientivo nonactive route lands in patientivo -ti surface",
        ctx.formatNawatRouteSurfaceTrailLabel(patientivoNonactiveRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: patientivoNonactiveTarget,
            stationModels: patientivoNonactiveStations,
        }),
        "(pusuni) → patientivo · pasivo/impersonal → -ti → pusuniti"
    );
    const patientivoPerfectiveRoute = ctx.getNawatRouteProfile("patientivo-perfective-ti");
    s.eq(
        "patientivo perfective route lands in patientivo -ti surface",
        ctx.formatNawatRouteSurfaceTrailLabel(patientivoPerfectiveRoute, {
            sourceVerb: "(pusuni)",
        }),
        "(pusuni) → patientivo · perfectivo → -ti → pusunti"
    );
    const nonactiveHabitualRoute = ctx.getNawatRouteProfile("nonactive-habitual-potential");
    const nonactiveHabitualTarget = ctx.resolveNawatRouteTarget(nonactiveHabitualRoute, { sourceVerb: "(pusuni)" });
    const nonactiveHabitualStations = ctx.getNawatRouteStationModels(nonactiveHabitualRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: nonactiveHabitualTarget,
    });
    s.eq(
        "nonactive habitual route is verb to verb",
        ctx.formatNawatRouteConversionLabel(nonactiveHabitualRoute, false),
        "Verbo -> Verbo"
    );
    s.eq(
        "nonactive habitual route exposes a nonactive switch station",
        nonactiveHabitualStations.map((station) => station.key),
        ["source-mode", "source-tense", "nonactive-switch", "target-mode", "finite-tense"]
    );
    s.eq(
        "nonactive habitual route lands in ordinary verb habitual",
        ctx.formatNawatRouteSurfaceTrailLabel(nonactiveHabitualRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: nonactiveHabitualTarget,
            stationModels: nonactiveHabitualStations,
        }),
        "(pusuni) → no activo → pusuniwani"
    );
    s.eq("legacy helper resolves future nawat route id", ctx.getLegacyTenseForNawatRoute("denominal-vi-ti-perfect"), "adjetivo-perfecto-tik");
    s.eq(
        "future nawat route exposes train-station values",
        ctx.getNawatRouteStationList("denominal-vi-ti-preterit").map((station) => station.value),
        ["[noun/inc.root]", "-ti", "preterit", "-tik"]
    );
    const routeRestore = {
        tenseMode: ctx.getActiveTenseMode(),
        selection: ctx.getCurrentResolvedConjugationSelectionState(),
        combined: ctx.getCombinedMode(),
        sourceScope: ctx.getVerbSourceScope(),
    };
    ctx.setActiveTenseMode(ctx.TENSE_MODE.sustantivo);
    ctx.setActiveNawatRouteProfile("denominal-vt-na-preterit");
    s.eq(
        "embedded nawat route stays anchored in sustantivo mode",
        ctx.getActiveNawatTenseModeForCurrentSelection(),
        ctx.NAWAT_TENSE_MODE.sustantivo || ctx.TENSE_MODE.sustantivo
    );
    ctx.clearActiveNawatRouteProfile();
    ctx.setActiveTenseMode(routeRestore.tenseMode);
    ctx.applyResolvedConjugationSelectionState(routeRestore.selection);
    const activatedNawatRoute = ctx.activateNawatRouteProfile("denominal-vi-ti-preterit", {
        sourceVerb: "(pusuni)",
    });
    s.eq("nawat route activation starts from canonical route id", activatedNawatRoute.id, "denominal-vi-ti-preterit");
    s.eq("nawat route activation stores canonical route state", ctx.getActiveNawatRouteProfile().id, "denominal-vi-ti-preterit");
    s.eq("nawat route activation verbalizes before reaching verb convention", activatedNawatRoute.targetVerb, "pusukti");
    s.eq("nawat route activation goes to verb convention", ctx.getActiveTenseMode(), ctx.TENSE_MODE.verbo);
    s.eq("nawat route activation selects ordinary preterite", ctx.getSelectedTenseTab(), "preterito");
    s.eq("nawat route activation stores finite station", ctx.getActiveNawatRouteProfile().activeStationKey, "finite-tense");
    s.eq("nawat route activation makes target verb available as entrada", ctx.getActiveNawatRouteProfile().activeStationInput, "(pusukti)");
    s.eq("active nawat mode remains verb for denominal route", ctx.getActiveNawatTenseModeForCurrentSelection(), "verbo");
    const returnedNawatRoute = ctx.activateNawatRouteOrigin("denominal-vi-ti-preterit");
    s.eq("nawat route can travel back to source convention", ctx.getActiveTenseMode(), ctx.TENSE_MODE.verbo);
    s.eq("nawat route can travel back to source station", ctx.getSelectedTenseTab(), "presente");
    s.eq("nawat route keeps target verb after traveling back", returnedNawatRoute.targetVerb, "pusukti");
    s.eq("nawat route remains selected after traveling back", ctx.getActiveNawatRouteProfile().id, "denominal-vi-ti-preterit");
    s.eq("nawat route stores source station after traveling back", ctx.getActiveNawatRouteProfile().activeStationKey, "source-mode");
    s.eq("nawat route restores source entrada after traveling back", ctx.getActiveNawatRouteProfile().activeStationInput, "(pusuni)");
    const stemNawatRoute = ctx.activateNawatRouteStation("denominal-vi-ti-preterit", "stem");
    s.eq("nawat route can travel to stem station", stemNawatRoute.activeStationKey, "stem");
    s.eq("nawat route stem station goes to noun convention", ctx.getActiveTenseMode(), ctx.TENSE_MODE.sustantivo);
    s.eq("nawat route stem station selects patientivo", ctx.getSelectedTenseTab(), "patientivo");
    s.eq("nawat route stem station changes entrada to the stem", stemNawatRoute.activeStationInput, "pusuk");
    const verbalizerNawatRoute = ctx.activateNawatRouteStation("denominal-vi-ti-preterit", "verbalizer");
    s.eq("nawat route can travel forward from stem to verb station", ctx.getActiveTenseMode(), ctx.TENSE_MODE.verbo);
    s.eq("nawat route verb station selects present for pusukti", ctx.getSelectedTenseTab(), "presente");
    s.eq("nawat route verb station changes entrada to pusukti", verbalizerNawatRoute.activeStationInput, "(pusukti)");
    const finiteNawatRoute = ctx.activateNawatRouteStation("denominal-vi-ti-preterit", "finite-tense");
    s.eq("nawat route finite surface station stays in verb convention", ctx.getActiveTenseMode(), ctx.TENSE_MODE.verbo);
    s.eq("nawat route finite surface station selects preterite for pusuktik", ctx.getSelectedTenseTab(), "preterito");
    s.eq("nawat route finite surface station keeps pusukti as entrada", finiteNawatRoute.activeStationInput, "(pusukti)");
    const restoredAfterStemForwardRoute = ctx.activateNawatRouteOrigin("denominal-vi-ti-preterit");
    s.eq("nawat route preserves original source after stem-to-verb travel", restoredAfterStemForwardRoute.activeStationInput, "(pusuni)");
    const verbalizerNaNawatRoute = ctx.activateNawatRouteStation("denominal-vt-na-preterit", "verbalizer", {
        sourceVerb: "(pusuni)",
    });
    s.eq("nawat -na route station changes entrada to segmented transitive input", verbalizerNaNawatRoute.activeStationInput, "(pusuk)-(na)");
    s.eq("nawat -na route station renders from segmented transitive input", verbalizerNaNawatRoute.activeStationVerb, "(pusuk)-(na)");
    const activatedAgentiveRoute = ctx.activateNawatRouteProfile("agentive-manner-adverb", {
        sourceVerb: "(mati)",
    });
    s.eq("nawat agentive route does not travel to european adverb mode", ctx.getActiveTenseMode(), ctx.TENSE_MODE.sustantivo);
    s.eq("nawat agentive route maps to nawat agentivo", ctx.getSelectedTenseTab(), "agentivo");
    s.eq("nawat agentive route keeps source verb for noun circuitry", activatedAgentiveRoute.targetVerb, "(mati)");
    s.eq("active nawat mode marks adverb route as sustantivo circuitry", ctx.getActiveNawatTenseModeForCurrentSelection(), "sustantivo");
    const activatedDirectRoute = ctx.activateNawatRouteProfile("direct-active-preterit", {
        sourceVerb: "(pusuni)",
    });
    s.eq("direct preterit route travels inside verb convention", ctx.getActiveTenseMode(), ctx.TENSE_MODE.verbo);
    s.eq("direct preterit route selects ordinary preterite", ctx.getSelectedTenseTab(), "preterito");
    s.eq("direct preterit route keeps source entrada", activatedDirectRoute.activeStationInput, "(pusuni)");
    const activatedPatientivoRoute = ctx.activateNawatRouteProfile("patientivo-nonactive-ti", {
        sourceVerb: "(pusuni)",
    });
    s.eq("patientivo nonactive route travels into noun convention", ctx.getActiveTenseMode(), ctx.TENSE_MODE.sustantivo);
    s.eq("patientivo nonactive route selects patientivo", ctx.getSelectedTenseTab(), "patientivo");
    s.eq("patientivo nonactive route stores branch state", activatedPatientivoRoute.activePatientivoBranch, "nonactive");
    s.eq("patientivo nonactive route switches combined mode", ctx.getCombinedMode(), ctx.COMBINED_MODE.nonactive);
    const activatedPatientivoPerfectiveRoute = ctx.activateNawatRouteProfile("patientivo-perfective-ti", {
        sourceVerb: "(pusuni)",
    });
    s.eq("patientivo perfective route stores branch state", activatedPatientivoPerfectiveRoute.activePatientivoBranch, "perfectivo");
    s.eq("patientivo perfective route switches back to active combined mode", ctx.getCombinedMode(), ctx.COMBINED_MODE.active);
    const activatedNonactiveHabitualRoute = ctx.activateNawatRouteProfile("nonactive-habitual-potential", {
        sourceVerb: "(pusuni)",
    });
    s.eq("nonactive habitual route travels inside verb convention", ctx.getActiveTenseMode(), ctx.TENSE_MODE.verbo);
    s.eq("nonactive habitual route selects ordinary present habitual", ctx.getSelectedTenseTab(), "presente-habitual");
    s.eq("nonactive habitual route stores nonactive target", activatedNonactiveHabitualRoute.targetCombinedMode, ctx.COMBINED_MODE.nonactive);
    s.eq("nonactive habitual route switches combined mode", ctx.getCombinedMode(), ctx.COMBINED_MODE.nonactive);
    ctx.setCombinedMode(routeRestore.combined);
    ctx.setVerbSourceScope(routeRestore.sourceScope, { syncCombinedMode: false });
    ctx.setActiveTenseMode(routeRestore.tenseMode);
    ctx.applyResolvedConjugationSelectionState(routeRestore.selection);

    // getToggleLockStateKey — pure string key normalization
    s.eq("key: empty → empty", ctx.getToggleLockStateKey(""), "");
    s.eq("key: short key (< 3 parts) returned unchanged", ctx.getToggleLockStateKey("nemi|t"), "nemi|t");
    s.eq("key: 3-part key strips tense segment", ctx.getToggleLockStateKey("nemi|present|sg"), "nemi|sg");
    s.eq("key: 4-part key with nonactive strips both tense segments", ctx.getToggleLockStateKey("nemi|nonactive|past|t"), "nemi|t");
    s.eq("key: 3-part key, nonactive at tenseIndex+1 yields stem only", ctx.getToggleLockStateKey("ki|nonactive|t"), "ki");

    // getToggleStateValue — reads from an arbitrary Map
    const m1 = new Map([["a|b", "val1"]]);
    s.eq("getToggleStateValue: existing key returns value", ctx.getToggleStateValue(m1, "a|b"), "val1");
    s.eq("getToggleStateValue: missing key returns undefined", ctx.getToggleStateValue(m1, "missing"), undefined);
    s.eq("getToggleStateValue: missing key with fallback", ctx.getToggleStateValue(m1, "missing", "fb"), "fb");
    s.eq("getToggleStateValue: null map returns fallback", ctx.getToggleStateValue(null, "k", "fb"), "fb");
    s.eq("getToggleStateValue: empty stateKey returns fallback", ctx.getToggleStateValue(m1, "", "fb"), "fb");

    // setToggleStateValue — writes to map, no lock sync
    const m2 = new Map();
    ctx.setToggleStateValue(m2, "x|y", "hello");
    s.eq("setToggleStateValue: value written to map", ctx.getToggleStateValue(m2, "x|y"), "hello");
    ctx.setToggleStateValue(m2, "x|y", "world");
    s.eq("setToggleStateValue: overwrites existing value", ctx.getToggleStateValue(m2, "x|y"), "world");
    ctx.setToggleStateValue(null, "x|y", "ignored"); // should not throw
    s.ok("setToggleStateValue: null map is a no-op (no throw)", true);

    // applyDefaultToggleStateOnce — applies only the first time for a given verbKey+stateKey pair
    const m3 = new Map();
    ctx.applyDefaultToggleStateOnce(m3, "slot|sg", "verbA", "ki");
    s.eq("applyDefaultToggleStateOnce: first call sets value", ctx.getToggleStateValue(m3, "slot|sg"), "ki");
    ctx.applyDefaultToggleStateOnce(m3, "slot|sg", "verbA", "kin");
    s.eq("applyDefaultToggleStateOnce: second call with same verbKey is ignored", ctx.getToggleStateValue(m3, "slot|sg"), "ki");
    ctx.applyDefaultToggleStateOnce(m3, "slot|sg", "verbB", "kin");
    s.eq("applyDefaultToggleStateOnce: different verbKey can overwrite", ctx.getToggleStateValue(m3, "slot|sg"), "kin");

    s.eq(
        "reduplicated distributive keeps existing 1pl prefix",
        ctx.reduplicateConjugationDisplay("tichipaknaj", { prefixChain: "ti" }),
        "tichijchipaknaj"
    );
    s.eq(
        "reduplicated distributive can restore omitted 1pl prefix",
        ctx.reduplicateConjugationDisplay("chipaknaj", {
            prefixChain: "ti",
            applyMissingPrefixChain: true,
        }),
        "tichijchipaknaj"
    );
    const reduplicatedResult = ctx.buildReduplicatedConjugationResult({
        result: "tichipaknaj",
        surfaceForms: ["tichipaknaj"],
    }, { prefixChain: "ti" });
    s.eq("reduplicated result updates display string", reduplicatedResult.result, "tichijchipaknaj");
    s.eq("reduplicated result updates surface forms", reduplicatedResult.surfaceForms, ["tichijchipaknaj"]);

    return s;
}

module.exports = { run };
