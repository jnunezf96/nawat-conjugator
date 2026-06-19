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

function main() {
    const { context } = createVmContext({ rootDir: ROOT });
    applyStaticData(context);
    if (typeof context.buildAndrewsCnvCnnBackAndForthAudit !== "function") {
        throw new Error("buildAndrewsCnvCnnBackAndForthAudit is not available in the runtime.");
    }
    const audit = context.buildAndrewsCnvCnnBackAndForthAudit();
    console.log(JSON.stringify(audit, null, 2));
}

if (require.main === module) {
    main();
}
