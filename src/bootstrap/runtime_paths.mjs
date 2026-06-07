export const STATIC_RUNTIME_PATHS = Object.freeze({
    STATIC_LABELS_PATH: "data/static_labels.json",
    STATIC_OPTIONS_PATH: "data/static_options.json",
    STATIC_GROUPS_PATH: "data/static_groups.json",
    STATIC_ORDERS_PATH: "data/static_orders.json",
    STATIC_RULES_PATH: "data/static_rules.json",
    STATIC_PHONOLOGY_PATH: "data/static_phonology.json",
    STATIC_MODES_PATH: "data/static_modes.json",
    STATIC_NNC_PATH: "data/static_nnc.json",
    STATIC_MISC_PATH: "data/static_misc.json",
    STATIC_SUPPLETIVES_PATH: "data/static_suppletives.json",
    STATIC_REDUP_PATH: "data/static_redup.json",
    STATIC_SUPPLETIVE_PATHS_PATH: "data/static_suppletive_paths.json",
    STATIC_CONSTANTS_PATH: "data/static_constants.json",
    STATIC_DIRECTIONAL_RULES_PATH: "data/static_directional_rules.json",
    STATIC_ALLOMORPHY_RULES_PATH: "data/static_allomorphy_rules.json",
    STATIC_PARSE_TESTS_PATH: "data/static_parse_tests.json",
    STATIC_DERIVATIONAL_RULES_PATH: "data/static_derivational_rules.json",
    STATIC_VALENCE_NEUTRAL_PATH: "data/static_valence_neutral.json",
});

export const LEGACY_HTML_SHELL_PATH = "index.html";

export const ESM_PRELOAD_PATHS = Object.freeze([
    Object.freeze({
        legacyScriptPath: "src/core/concepts/concepts.js",
        esmModulePath: "src/core/concepts/concepts.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/particles/particles.js",
        esmModulePath: "src/core/particles/particles.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/sentence/sentence.js",
        esmModulePath: "src/core/sentence/sentence.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/orthography/orthography.js",
        esmModulePath: "src/core/orthography/orthography.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/clause/clause.js",
        esmModulePath: "src/core/clause/clause.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/clause/modification/modification.js",
        esmModulePath: "src/core/clause/modification/modification.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/clause/adverbial/adverbial.js",
        esmModulePath: "src/core/clause/adverbial/adverbial.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/clause/adjunction/adjunction.js",
        esmModulePath: "src/core/clause/adjunction/adjunction.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/clause/complement/complement.js",
        esmModulePath: "src/core/clause/complement/complement.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/clause/conjunction/conjunction.js",
        esmModulePath: "src/core/clause/conjunction/conjunction.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/comparison/comparison.js",
        esmModulePath: "src/core/comparison/comparison.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/calendar/calendar.js",
        esmModulePath: "src/core/calendar/calendar.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/analysis/analysis.js",
        esmModulePath: "src/core/analysis/analysis.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/agreement/agreement.js",
        esmModulePath: "src/core/agreement/agreement.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/phonology/phonology.js",
        esmModulePath: "src/core/phonology/phonology.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/agreement/display.js",
        esmModulePath: "src/core/agreement/display.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/agreement/combo_validation.js",
        esmModulePath: "src/core/agreement/combo_validation.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/irregulars/irregulars.js",
        esmModulePath: "src/core/irregulars/irregulars.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/nnc/nnc.js",
        esmModulePath: "src/core/nnc/nnc.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/nnc/compound/compound.js",
        esmModulePath: "src/core/nnc/compound/compound.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/nnc/adjectival/adjectival.js",
        esmModulePath: "src/core/nnc/adjectival/adjectival.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/nnc/nominalization/nominalization.js",
        esmModulePath: "src/core/nnc/nominalization/nominalization.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/nnc/numerals/numerals.js",
        esmModulePath: "src/core/nnc/numerals/numerals.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/nnc/relational/relational.js",
        esmModulePath: "src/core/nnc/relational/relational.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/nnc/place_gentilic/place_gentilic.js",
        esmModulePath: "src/core/nnc/place_gentilic/place_gentilic.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/nnc/names/names.js",
        esmModulePath: "src/core/nnc/names/names.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/output/surface.js",
        esmModulePath: "src/core/output/surface.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/output/provenance.js",
        esmModulePath: "src/core/output/provenance.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/parsing/parsing.js",
        esmModulePath: "src/core/parsing/parsing.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/preterit/context.js",
        esmModulePath: "src/core/preterit/context.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/preterit/engine.js",
        esmModulePath: "src/core/preterit/engine.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/preterit/api.js",
        esmModulePath: "src/core/preterit/api.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/search/runtime.js",
        esmModulePath: "src/core/search/runtime.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/derivation/source_model.js",
        esmModulePath: "src/core/derivation/source_model.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/derivation/forward_runtime.js",
        esmModulePath: "src/core/derivation/forward_runtime.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/derivation/nonactive.js",
        esmModulePath: "src/core/derivation/nonactive.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/derivation/frequentative/frequentative.js",
        esmModulePath: "src/core/derivation/frequentative/frequentative.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/generation/morphology_support.js",
        esmModulePath: "src/core/generation/morphology_support.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/generation/engine.js",
        esmModulePath: "src/core/generation/engine.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/generation/morphology_engine.js",
        esmModulePath: "src/core/generation/morphology_engine.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/generation/valency.js",
        esmModulePath: "src/core/generation/valency.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/generation/request.js",
        esmModulePath: "src/core/generation/request.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/generation/runtime_support.js",
        esmModulePath: "src/core/generation/runtime_support.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/vnc/allomorphy.js",
        esmModulePath: "src/core/vnc/allomorphy.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/vnc/purposive/purposive.js",
        esmModulePath: "src/core/vnc/purposive/purposive.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/vnc/honorific_pejorative/honorific_pejorative.js",
        esmModulePath: "src/core/vnc/honorific_pejorative/honorific_pejorative.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/core/vnc/vnc.js",
        esmModulePath: "src/core/vnc/vnc.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/ui/composer/composer.js",
        esmModulePath: "src/ui/composer/composer.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/ui/i18n/i18n.js",
        esmModulePath: "src/ui/i18n/i18n.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/ui/export/export.js",
        esmModulePath: "src/ui/export/export.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/ui/events.js",
        esmModulePath: "src/ui/events/events.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/ui/panels/panels.js",
        esmModulePath: "src/ui/panels/panels.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/ui/rendering/rendering.js",
        esmModulePath: "src/ui/rendering/rendering.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/ui/state.js",
        esmModulePath: "src/ui/state.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "script.js",
        esmModulePath: "script_runtime.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/lessons/registry.js",
        esmModulePath: "src/lessons/registry.mjs",
    }),
    Object.freeze({
        legacyScriptPath: "src/appendices/registry.js",
        esmModulePath: "src/appendices/registry.mjs",
    }),
]);

export const LEGACY_BROWSER_SCRIPT_PATHS = Object.freeze([
    "src/core/concepts/concepts.js",
    "src/core/particles/particles.js",
    "src/core/sentence/sentence.js",
    "src/core/orthography/orthography.js",
    "src/core/clause/clause.js",
    "src/core/clause/modification/modification.js",
    "src/core/clause/adverbial/adverbial.js",
    "src/core/clause/adjunction/adjunction.js",
    "src/core/clause/complement/complement.js",
    "src/core/clause/conjunction/conjunction.js",
    "src/core/comparison/comparison.js",
    "src/core/calendar/calendar.js",
    "src/core/analysis/analysis.js",
    "src/core/phonology/phonology.js",
    "src/core/agreement/agreement.js",
    "src/core/agreement/display.js",
    "src/core/agreement/combo_validation.js",
    "src/core/search/runtime.js",
    "src/core/irregulars/irregulars.js",
    "src/core/output/surface.js",
    "src/core/output/provenance.js",
    "src/core/generation/morphology_support.js",
    "src/core/parsing/parsing.js",
    "src/core/vnc/allomorphy.js",
    "src/core/vnc/purposive/purposive.js",
    "src/core/vnc/honorific_pejorative/honorific_pejorative.js",
    "src/core/derivation/source_model.js",
    "src/core/derivation/forward_runtime.js",
    "src/core/derivation/nonactive.js",
    "src/core/derivation/frequentative/frequentative.js",
    "src/core/generation/valency.js",
    "src/core/generation/request.js",
    "src/core/generation/morphology_engine.js",
    "src/core/generation/runtime_support.js",
    "src/core/generation/engine.js",
    "src/core/nnc/nnc.js",
    "src/core/nnc/compound/compound.js",
    "src/core/nnc/adjectival/adjectival.js",
    "src/core/nnc/nominalization/nominalization.js",
    "src/core/nnc/numerals/numerals.js",
    "src/core/nnc/relational/relational.js",
    "src/core/nnc/place_gentilic/place_gentilic.js",
    "src/core/nnc/names/names.js",
    "src/core/vnc/vnc.js",
    "src/core/preterit/context.js",
    "src/core/preterit/engine.js",
    "src/core/preterit/api.js",
    "src/ui/i18n/i18n.js",
    "src/ui/panels/panels.js",
    "src/ui/export/export.js",
    "src/ui/state.js",
    "src/ui/rendering/rendering.js",
    "src/ui/composer/composer.js",
    "script.js",
    "src/lessons/registry.js",
    "src/appendices/registry.js",
    "src/ui/events.js",
]);

export const LEGACY_VM_SCRIPT_PATHS = Object.freeze([
    "src/core/concepts/concepts.js",
    "src/core/particles/particles.js",
    "src/core/sentence/sentence.js",
    "src/core/orthography/orthography.js",
    "src/core/clause/clause.js",
    "src/core/clause/modification/modification.js",
    "src/core/clause/adverbial/adverbial.js",
    "src/core/clause/adjunction/adjunction.js",
    "src/core/clause/complement/complement.js",
    "src/core/clause/conjunction/conjunction.js",
    "src/core/comparison/comparison.js",
    "src/core/calendar/calendar.js",
    "src/core/analysis/analysis.js",
    "src/core/phonology/phonology.js",
    "src/core/agreement/agreement.js",
    "src/core/agreement/display.js",
    "src/core/agreement/combo_validation.js",
    "src/core/search/runtime.js",
    "src/core/irregulars/irregulars.js",
    "src/core/output/surface.js",
    "src/core/output/provenance.js",
    "src/core/generation/morphology_support.js",
    "src/core/parsing/parsing.js",
    "src/core/vnc/allomorphy.js",
    "src/core/vnc/purposive/purposive.js",
    "src/core/vnc/honorific_pejorative/honorific_pejorative.js",
    "src/core/derivation/source_model.js",
    "src/core/derivation/forward_runtime.js",
    "src/core/derivation/nonactive.js",
    "src/core/derivation/frequentative/frequentative.js",
    "src/core/generation/valency.js",
    "src/core/generation/request.js",
    "src/core/generation/morphology_engine.js",
    "src/core/generation/runtime_support.js",
    "src/core/generation/engine.js",
    "src/core/nnc/nnc.js",
    "src/core/nnc/compound/compound.js",
    "src/core/nnc/adjectival/adjectival.js",
    "src/core/nnc/nominalization/nominalization.js",
    "src/core/nnc/numerals/numerals.js",
    "src/core/nnc/relational/relational.js",
    "src/core/nnc/place_gentilic/place_gentilic.js",
    "src/core/nnc/names/names.js",
    "src/core/vnc/vnc.js",
    "src/core/preterit/context.js",
    "src/core/preterit/engine.js",
    "src/core/preterit/api.js",
    "src/ui/state.js",
    "src/ui/composer/composer.js",
]);

export function cloneStaticRuntimePaths() {
    return { ...STATIC_RUNTIME_PATHS };
}
