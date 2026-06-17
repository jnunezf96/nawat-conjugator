import { ESM_PRELOAD_PATHS } from "./runtime_paths.mjs";

import { installScriptRuntimeGlobals } from "./script_runtime.mjs";
import { installAgreementGlobals } from "../core/agreement/agreement.mjs";
import { installAgreementDisplayGlobals } from "../core/agreement/display.mjs";
import { installComboValidationGlobals } from "../core/agreement/combo_validation.mjs";
import { installForwardDerivationRuntimeGlobals } from "../core/derivation/forward_runtime.mjs";
import { installNonactiveDerivationGlobals } from "../core/derivation/nonactive.mjs";
import { installDerivationSourceModelGlobals } from "../core/derivation/source_model.mjs";
import { installMorphologySupportGlobals } from "../core/generation/morphology_support.mjs";
import { installGenerationEngineGlobals } from "../core/generation/engine.mjs";
import { installMorphologyEngineGlobals } from "../core/generation/morphology_engine.mjs";
import { installGenerationValencyGlobals } from "../core/generation/valency.mjs";
import { installGenerationRequestGlobals } from "../core/generation/request.mjs";
import { installGenerationRuntimeSupportGlobals } from "../core/generation/runtime_support.mjs";
import { installIrregularGlobals } from "../core/irregulars/irregulars.mjs";
import { installNncGlobals } from "../core/nnc/nnc.mjs";
import { installOutputSurfaceGlobals } from "../core/output/surface.mjs";
import { installParsingGlobals } from "../core/parsing/parsing.mjs";
import { installPhonologyGlobals } from "../core/phonology/phonology.mjs";
import { installOutputProvenanceGlobals } from "../core/output/provenance.mjs";
import { installPreteritContextGlobals } from "../core/preterit/context.mjs";
import { installPreteritEngineGlobals } from "../core/preterit/engine.mjs";
import { installPreteritApiGlobals } from "../core/preterit/api.mjs";
import { installSearchRuntimeGlobals } from "../core/search/runtime.mjs";
import { installAllomorphyGlobals } from "../core/vnc/allomorphy.mjs";
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

const PRELOAD_INSTALLERS_BY_PATH = new Map([
    ["script_runtime.mjs", installScriptRuntimeGlobals],
    ["src/core/agreement/agreement.mjs", installAgreementGlobals],
    ["src/core/agreement/display.mjs", installAgreementDisplayGlobals],
    ["src/core/agreement/combo_validation.mjs", installComboValidationGlobals],
    ["src/core/derivation/source_model.mjs", installDerivationSourceModelGlobals],
    ["src/core/derivation/forward_runtime.mjs", installForwardDerivationRuntimeGlobals],
    ["src/core/derivation/nonactive.mjs", installNonactiveDerivationGlobals],
    ["src/core/irregulars/irregulars.mjs", installIrregularGlobals],
    ["src/core/phonology/phonology.mjs", installPhonologyGlobals],
    ["src/core/generation/morphology_support.mjs", installMorphologySupportGlobals],
    ["src/core/generation/engine.mjs", installGenerationEngineGlobals],
    ["src/core/generation/morphology_engine.mjs", installMorphologyEngineGlobals],
    ["src/core/generation/valency.mjs", installGenerationValencyGlobals],
    ["src/core/generation/request.mjs", installGenerationRequestGlobals],
    ["src/core/generation/runtime_support.mjs", installGenerationRuntimeSupportGlobals],
    ["src/core/nnc/nnc.mjs", installNncGlobals],
    ["src/core/output/surface.mjs", installOutputSurfaceGlobals],
    ["src/core/output/provenance.mjs", installOutputProvenanceGlobals],
    ["src/core/parsing/parsing.mjs", installParsingGlobals],
    ["src/core/preterit/context.mjs", installPreteritContextGlobals],
    ["src/core/preterit/engine.mjs", installPreteritEngineGlobals],
    ["src/core/preterit/api.mjs", installPreteritApiGlobals],
    ["src/core/search/runtime.mjs", installSearchRuntimeGlobals],
    ["src/core/vnc/allomorphy.mjs", installAllomorphyGlobals],
    ["src/core/vnc/vnc.mjs", installVncFacadeGlobals],
    ["src/ui/composer/composer.mjs", installUiComposerGlobals],
    ["src/ui/i18n/i18n.mjs", installUiI18nGlobals],
    ["src/ui/export/export.mjs", installUiExportGlobals],
    ["src/ui/events/events.mjs", installUiEventsGlobals],
    ["src/ui/panels/panels.mjs", installUiPanelsGlobals],
    ["src/ui/rendering/rendering.mjs", installUiRenderingGlobals],
    ["src/ui/state.mjs", installUiStateGlobals],
    ["src/lessons/registry.mjs", installLessonRegistryGlobals],
    ["src/appendices/registry.mjs", installAppendixRegistryGlobals],
]);

export function getEsmPreloadSkipSet() {
    return new Set(ESM_PRELOAD_PATHS.map((entry) => entry.scriptPath));
}

export async function preloadRuntimeModules({
    targetObject = globalThis,
    mirrorTargets = [],
} = {}) {
    const loaded = [];
    for (const entry of ESM_PRELOAD_PATHS) {
        const installer = PRELOAD_INSTALLERS_BY_PATH.get(entry.esmModulePath);
        if (typeof installer !== "function") {
            continue;
        }
        await installer(targetObject);
        for (const mirrorTarget of mirrorTargets) {
            await installer(mirrorTarget);
        }
        loaded.push({ ...entry });
    }
    targetObject.__NAWAT_ESM_PRELOADS__ = loaded;
    mirrorTargets.forEach((mirrorTarget) => {
        if (mirrorTarget && typeof mirrorTarget === "object") {
            mirrorTarget.__NAWAT_ESM_PRELOADS__ = loaded;
        }
    });
    return loaded;
}

export async function preloadBrowserRuntimeModules(globalObject = globalThis) {
    return preloadRuntimeModules({
        targetObject: globalObject,
        mirrorTargets: (
            globalObject.window
            && typeof globalObject.window === "object"
            && globalObject.window !== globalObject
        ) ? [globalObject.window] : [],
    });
}
