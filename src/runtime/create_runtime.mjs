import { ESM_PRELOAD_PATHS } from "../bootstrap/runtime_paths.mjs";

import { installScriptRuntimeGlobals } from "../bootstrap/script_runtime.mjs";
import { installAnalysisGlobals } from "../core/analysis/analysis.mjs";
import { installAgreementGlobals } from "../core/agreement/agreement.mjs";
import { installAgreementDisplayGlobals } from "../core/agreement/display.mjs";
import { installComboValidationGlobals } from "../core/agreement/combo_validation.mjs";
import { installAdverbialAdjunctionGlobals } from "../core/clause/adjunction/adjunction.mjs";
import { installAdverbialNuclearGlobals } from "../core/clause/adverbial/adverbial.mjs";
import { installCalendarNameGlobals } from "../core/calendar/calendar.mjs";
import { installClauseGlobals } from "../core/clause/clause.mjs";
import { installComplementClauseGlobals } from "../core/clause/complement/complement.mjs";
import { installConjunctionClauseGlobals } from "../core/clause/conjunction/conjunction.mjs";
import { installAdjectivalModificationGlobals } from "../core/clause/modification/modification.mjs";
import { installComparisonGlobals } from "../core/comparison/comparison.mjs";
import { installConceptsGlobals } from "../core/concepts/concepts.mjs";
import { installDerivationSourceModelGlobals } from "../core/derivation/source_model.mjs";
import { installFrequentativeGlobals } from "../core/derivation/frequentative/frequentative.mjs";
import { installForwardDerivationRuntimeGlobals } from "../core/derivation/forward_runtime.mjs";
import { installNonactiveDerivationGlobals } from "../core/derivation/nonactive.mjs";
import { installGrammarFrameGlobals } from "../core/grammar/frame.mjs";
import { installMorphologySupportGlobals } from "../core/generation/morphology_support.mjs";
import { installGenerationEngineGlobals } from "../core/generation/engine.mjs";
import { installMorphologyEngineGlobals } from "../core/generation/morphology_engine.mjs";
import { installGenerationValencyGlobals } from "../core/generation/valency.mjs";
import { installGenerationRequestGlobals } from "../core/generation/request.mjs";
import { installGenerationRuntimeSupportGlobals } from "../core/generation/runtime_support.mjs";
import { installIrregularGlobals } from "../core/irregulars/irregulars.mjs";
import { installAdjectivalNncGlobals } from "../core/nnc/adjectival/adjectival.mjs";
import { installNncCompoundGlobals } from "../core/nnc/compound/compound.mjs";
import { installPersonalNameNncGlobals } from "../core/nnc/names/names.mjs";
import { installNominalizationBoundaryGlobals } from "../core/nnc/nominalization/nominalization.mjs";
import { installNumeralNncGlobals } from "../core/nnc/numerals/numerals.mjs";
import { installNncGlobals } from "../core/nnc/nnc.mjs";
import { installPlaceGentilicNncGlobals } from "../core/nnc/place_gentilic/place_gentilic.mjs";
import { installRelationalNncGlobals } from "../core/nnc/relational/relational.mjs";
import { installOrthographyGlobals } from "../core/orthography/orthography.mjs";
import { installParticlesGlobals } from "../core/particles/particles.mjs";
import { installOutputSurfaceGlobals } from "../core/output/surface.mjs";
import { installOutputProvenanceGlobals } from "../core/output/provenance.mjs";
import { installParsingGlobals } from "../core/parsing/parsing.mjs";
import { installSentenceGlobals } from "../core/sentence/sentence.mjs";
import { installPhonologyGlobals } from "../core/phonology/phonology.mjs";
import { installPreteritContextGlobals } from "../core/preterit/context.mjs";
import { installPreteritEngineGlobals } from "../core/preterit/engine.mjs";
import { installPreteritApiGlobals } from "../core/preterit/api.mjs";
import { installSearchRuntimeGlobals } from "../core/search/runtime.mjs";
import { installAllomorphyGlobals } from "../core/vnc/allomorphy.mjs";
import { installHonorificPejorativeGlobals } from "../core/vnc/honorific_pejorative/honorific_pejorative.mjs";
import { installPurposiveGlobals } from "../core/vnc/purposive/purposive.mjs";
import { installVncFacadeGlobals } from "../core/vnc/vnc.mjs";
import { installUiComposerGlobals } from "../ui/composer/composer.mjs";
import { installUiExportGlobals } from "../ui/export/export.mjs";
import { installUiI18nGlobals } from "../ui/i18n/i18n.mjs";
import { installUiEventsGlobals } from "../ui/events/events.mjs";
import { installUiPanelsGlobals } from "../ui/panels/panels.mjs";
import { installUiRenderingGlobals } from "../ui/rendering/rendering.mjs";
import { installUiStateGlobals } from "../ui/state.mjs";
import { installLessonRegistryGlobals } from "../lessons/registry.mjs";
import { installAppendixRegistryGlobals } from "../appendices/registry.mjs";

const INSTALLER_BY_ESM_MODULE_PATH = new Map([
    ["src/core/concepts/concepts.mjs", installConceptsGlobals],
    ["src/core/particles/particles.mjs", installParticlesGlobals],
    ["src/core/sentence/sentence.mjs", installSentenceGlobals],
    ["src/core/grammar/frame.mjs", installGrammarFrameGlobals],
    ["src/core/agreement/agreement.mjs", installAgreementGlobals],
    ["src/core/orthography/orthography.mjs", installOrthographyGlobals],
    ["src/core/clause/clause.mjs", installClauseGlobals],
    ["src/core/clause/modification/modification.mjs", installAdjectivalModificationGlobals],
    ["src/core/clause/adverbial/adverbial.mjs", installAdverbialNuclearGlobals],
    ["src/core/clause/adjunction/adjunction.mjs", installAdverbialAdjunctionGlobals],
    ["src/core/clause/complement/complement.mjs", installComplementClauseGlobals],
    ["src/core/clause/conjunction/conjunction.mjs", installConjunctionClauseGlobals],
    ["src/core/comparison/comparison.mjs", installComparisonGlobals],
    ["src/core/calendar/calendar.mjs", installCalendarNameGlobals],
    ["src/core/analysis/analysis.mjs", installAnalysisGlobals],
    ["src/core/phonology/phonology.mjs", installPhonologyGlobals],
    ["src/core/agreement/display.mjs", installAgreementDisplayGlobals],
    ["src/core/agreement/combo_validation.mjs", installComboValidationGlobals],
    ["src/core/irregulars/irregulars.mjs", installIrregularGlobals],
    ["src/core/nnc/nnc.mjs", installNncGlobals],
    ["src/core/nnc/compound/compound.mjs", installNncCompoundGlobals],
    ["src/core/nnc/adjectival/adjectival.mjs", installAdjectivalNncGlobals],
    ["src/core/nnc/nominalization/nominalization.mjs", installNominalizationBoundaryGlobals],
    ["src/core/nnc/numerals/numerals.mjs", installNumeralNncGlobals],
    ["src/core/nnc/relational/relational.mjs", installRelationalNncGlobals],
    ["src/core/nnc/place_gentilic/place_gentilic.mjs", installPlaceGentilicNncGlobals],
    ["src/core/nnc/names/names.mjs", installPersonalNameNncGlobals],
    ["src/core/output/surface.mjs", installOutputSurfaceGlobals],
    ["src/core/output/provenance.mjs", installOutputProvenanceGlobals],
    ["src/core/parsing/parsing.mjs", installParsingGlobals],
    ["src/core/preterit/context.mjs", installPreteritContextGlobals],
    ["src/core/preterit/engine.mjs", installPreteritEngineGlobals],
    ["src/core/preterit/api.mjs", installPreteritApiGlobals],
    ["src/core/search/runtime.mjs", installSearchRuntimeGlobals],
    ["src/core/derivation/source_model.mjs", installDerivationSourceModelGlobals],
    ["src/core/derivation/forward_runtime.mjs", installForwardDerivationRuntimeGlobals],
    ["src/core/derivation/nonactive.mjs", installNonactiveDerivationGlobals],
    ["src/core/derivation/frequentative/frequentative.mjs", installFrequentativeGlobals],
    ["src/core/generation/morphology_support.mjs", installMorphologySupportGlobals],
    ["src/core/generation/engine.mjs", installGenerationEngineGlobals],
    ["src/core/generation/morphology_engine.mjs", installMorphologyEngineGlobals],
    ["src/core/generation/valency.mjs", installGenerationValencyGlobals],
    ["src/core/generation/request.mjs", installGenerationRequestGlobals],
    ["src/core/generation/runtime_support.mjs", installGenerationRuntimeSupportGlobals],
    ["src/core/vnc/allomorphy.mjs", installAllomorphyGlobals],
    ["src/core/vnc/purposive/purposive.mjs", installPurposiveGlobals],
    ["src/core/vnc/honorific_pejorative/honorific_pejorative.mjs", installHonorificPejorativeGlobals],
    ["src/core/vnc/vnc.mjs", installVncFacadeGlobals],
    ["src/ui/composer/composer.mjs", installUiComposerGlobals],
    ["src/ui/i18n/i18n.mjs", installUiI18nGlobals],
    ["src/ui/export/export.mjs", installUiExportGlobals],
    ["src/ui/events/events.mjs", installUiEventsGlobals],
    ["src/ui/panels/panels.mjs", installUiPanelsGlobals],
    ["src/ui/rendering/rendering.mjs", installUiRenderingGlobals],
    ["src/ui/state.mjs", installUiStateGlobals],
    ["script_runtime.mjs", installScriptRuntimeGlobals],
    ["src/lessons/registry.mjs", installLessonRegistryGlobals],
    ["src/appendices/registry.mjs", installAppendixRegistryGlobals],
]);

function cloneDescriptorMap(object, keys) {
    const descriptors = {};
    keys.forEach((key) => {
        const descriptor = Object.getOwnPropertyDescriptor(object, key);
        if (descriptor) {
            descriptors[key] = descriptor;
        }
    });
    return descriptors;
}

function defineDescriptors(targetObject, descriptors) {
    if (!targetObject || typeof targetObject !== "object") {
        return;
    }
    Object.defineProperties(targetObject, descriptors);
}

function buildRuntimeBase({
    globalObject = globalThis,
    windowObject = globalObject?.window || globalObject,
    documentObject = globalObject?.document || windowObject?.document || null,
    runtimeConfig = null,
    extraGlobals = {},
} = {}) {
    const runtimeObject = {
        console: globalObject?.console || console,
        window: windowObject,
        document: documentObject,
        localStorage: globalObject?.localStorage || windowObject?.localStorage,
        navigator: globalObject?.navigator || windowObject?.navigator,
        fetch: globalObject?.fetch,
        URL: globalObject?.URL,
        Blob: globalObject?.Blob,
        Event: globalObject?.Event,
        CustomEvent: globalObject?.CustomEvent,
        DOMParser: globalObject?.DOMParser,
        setTimeout: globalObject?.setTimeout || setTimeout,
        clearTimeout: globalObject?.clearTimeout || clearTimeout,
        setInterval: globalObject?.setInterval || setInterval,
        clearInterval: globalObject?.clearInterval || clearInterval,
        requestAnimationFrame: globalObject?.requestAnimationFrame,
        cancelAnimationFrame: globalObject?.cancelAnimationFrame,
        performance: globalObject?.performance,
        ...extraGlobals,
    };
    runtimeObject.globalThis = runtimeObject;
    if (runtimeConfig) {
        runtimeObject.__NAWAT_RUNTIME_CONFIG__ = runtimeConfig;
        runtimeObject.__NAWAT_RUNTIME_PATHS__ = runtimeConfig.paths;
    }
    return runtimeObject;
}

export async function createRuntimeInstance(options = {}) {
    const runtimeObject = buildRuntimeBase(options);
    const initialKeys = new Set(Reflect.ownKeys(runtimeObject));
    const loadedModules = [];
    for (const entry of ESM_PRELOAD_PATHS) {
        const installer = INSTALLER_BY_ESM_MODULE_PATH.get(entry.esmModulePath);
        if (typeof installer !== "function") {
            continue;
        }
        await installer(runtimeObject);
        loadedModules.push({ ...entry });
    }
    const exposedKeys = Reflect.ownKeys(runtimeObject).filter((key) => !initialKeys.has(key));
    const exposedDescriptors = cloneDescriptorMap(runtimeObject, exposedKeys);
    runtimeObject.__NAWAT_ESM_PRELOADS__ = loadedModules;
    return {
        runtimeObject,
        exposedDescriptors,
        loadedModules,
    };
}

export function attachRuntimeBindings(targetObject, runtimeInstance) {
    if (!targetObject || typeof targetObject !== "object" || !runtimeInstance) {
        return targetObject;
    }
    defineDescriptors(targetObject, runtimeInstance.exposedDescriptors || {});
    if (runtimeInstance.runtimeObject?.__NAWAT_RUNTIME_CONFIG__) {
        targetObject.__NAWAT_RUNTIME_CONFIG__ = runtimeInstance.runtimeObject.__NAWAT_RUNTIME_CONFIG__;
        targetObject.__NAWAT_RUNTIME_PATHS__ = runtimeInstance.runtimeObject.__NAWAT_RUNTIME_PATHS__;
    }
    targetObject.__NAWAT_ESM_PRELOADS__ = runtimeInstance.loadedModules || [];
    return targetObject;
}
