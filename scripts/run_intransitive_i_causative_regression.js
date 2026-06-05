#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { createVmContext } = require("./lib/vm_harness");

const ROOT = path.resolve(__dirname, "..");

function loadJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), "utf8"));
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
  applyIfExists(context, "applyStaticMisc", loadJson("data/static_misc.json"));
  applyIfExists(context, "applyStaticSuppletives", loadJson("data/static_suppletives.json"));
  applyIfExists(context, "applyStaticRedup", loadJson("data/static_redup.json"));
  applyIfExists(context, "applyStaticSuppletivePaths", loadJson("data/static_suppletive_paths.json"));
}

function uniqueSorted(values) {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

function collectStems(options, type) {
  return uniqueSorted(
    options
      .filter((entry) => entry && entry.type === type)
      .map((entry) => entry.stem)
  );
}

const REGRESSION_CASES = [
  { verb: "ilpi", typeOneStems: ["ilpia"], typeTwoStems: ["ilpitia"] },
  { verb: "aki", typeOneStems: ["akia"], typeTwoStems: [] },
  { verb: "pajti", typeOneStems: ["pajtia"], typeTwoStems: [] },
  { verb: "mani", typeOneStems: ["mana"], typeTwoStems: ["manitia"] },
  { verb: "kwepi", typeOneStems: ["kwepa"], typeTwoStems: ["kweptia"] },
  { verb: "sawi", typeOneStems: ["sawa", "sua"], typeTwoStems: ["sawitia", "sawtia"] },
  { verb: "sewi", typeOneStems: ["sewa"], typeTwoStems: ["sewitia", "sewtia"] },
  { verb: "tzakwi", typeOneStems: ["tzakwa"], typeTwoStems: ["tzakwiltia", "tzakwitia"] },
  { verb: "nemi", typeOneStems: [], typeTwoStems: ["nemitia", "nemtia"] },
  { verb: "naki", typeOneStems: [], typeTwoStems: ["naktia"] },
  { verb: "tzajtzi", typeOneStems: [], typeTwoStems: ["tzajtzitia"] },
  { verb: "wetzi", typeOneStems: [], typeTwoStems: ["wechtia", "wetzitia"] },
];

function equalArrays(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function runRegression(context) {
  if (typeof context.getCausativeDerivationOptions !== "function") {
    throw new Error("getCausativeDerivationOptions is not available");
  }

  const failures = [];
  const rows = [];

  REGRESSION_CASES.forEach((testCase) => {
    const options = context.getCausativeDerivationOptions(testCase.verb, testCase.verb, {
      isTransitive: false,
      canonicalRuleBase: testCase.verb,
      canonicalFullRuleBase: testCase.verb,
    }) || [];
    const typeOneStems = collectStems(options, "type-one");
    const typeTwoStems = collectStems(options, "type-two");
    const row = {
      verb: testCase.verb,
      expectedTypeOneStems: testCase.typeOneStems,
      actualTypeOneStems: typeOneStems,
      expectedTypeTwoStems: testCase.typeTwoStems,
      actualTypeTwoStems: typeTwoStems,
    };
    rows.push(row);

    if (
      !equalArrays(typeOneStems, testCase.typeOneStems)
      || !equalArrays(typeTwoStems, testCase.typeTwoStems)
    ) {
      failures.push(row);
    }
  });

  return {
    total: rows.length,
    passed: rows.length - failures.length,
    failed: failures.length,
    failures,
  };
}

try {
  const { context } = createVmContext({ rootDir: ROOT });
  applyStaticData(context);

  const summary = runRegression(context);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  process.exit(summary.failed ? 1 : 0);
} catch (error) {
  const message = error && error.stack ? error.stack : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
