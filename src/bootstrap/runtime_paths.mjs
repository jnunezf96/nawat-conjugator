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

// Runtime modules have one fail-closed manifest in src/runtime/create_runtime.mjs.
// This file owns only the data paths that are shared by browser and Node runtimes.
export function cloneStaticRuntimePaths() {
    return { ...STATIC_RUNTIME_PATHS };
}
