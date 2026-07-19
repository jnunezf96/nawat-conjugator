#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { createModuleRuntime } = require("./lib/module_runtime");

const ROOT = path.resolve(__dirname, "..");

const constantsPath = path.join(ROOT, "data", "static_constants.json");
const phonologyPath = path.join(ROOT, "data", "static_phonology.json");
const derivRulesPath = path.join(ROOT, "data", "static_derivational_rules.json");
const redupPath = path.join(ROOT, "data", "static_redup.json");

const WIWA_SUFFIXES = ["awi", "iwi", "uwi", "ewi", "awa", "iwa", "uwa", "ewa", "wi", "wa"];

function toSplitForm(base = "") {
  const normalized = String(base || "").toLowerCase().trim();
  for (const suffix of WIWA_SUFFIXES) {
    if (normalized.endsWith(suffix) && normalized.length > suffix.length) {
      return `${normalized.slice(0, -suffix.length)}/${suffix}`;
    }
  }
  return "";
}

function uniqueSorted(values = []) {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

function collectTypeOutputs(optionsList = [], typeLabel = "") {
  const rows = Array.isArray(optionsList) ? optionsList : [];
  return uniqueSorted(
    rows
      .filter((entry) => entry && entry.type === typeLabel)
      .map((entry) => `${entry.stem || ""}${entry.suffix || ""}`)
  );
}

function getCandidateVerbs(derivRules = {}) {
  const regressionSet = derivRules?.config?.causative?.intransitiveEndsWithI?.regressionSet || {};
  const wiBlockVerbs = derivRules?.config?.causative?.destockal?.wiStockFormative?.blockVerbs || [];
  const seedVerbs = [
    "ijtawi",
    "ijsiwi",
    "ijsawi",
    "kwetawi",
    "patziwi",
    "petziwi",
    "pachiwi",
    "pushawi",
    "tushawi",
    "ijtakawi",
    "istakawi",
    "tanawi",
    "tulunawi",
    "kwiltunawi",
    "tepitunawi",
    "wejkatanawi",
    "achkatanawi",
    "tekipanawi",
    "nepaniwi",
    "tepunawi",
    "tekwinawi",
    "chichinawi",
    "chinawi",
    "ijchinawi",
    "sinawi",
    "seniwi",
    "tesunawi",
    "yekawi",
    "tapuwi",
    "temuwi",
    "sepuwi",
  ];
  const merged = uniqueSorted([
    ...(Array.isArray(regressionSet.additive) ? regressionSet.additive : []),
    ...(Array.isArray(regressionSet.replacive) ? regressionSet.replacive : []),
    ...(Array.isArray(regressionSet.none) ? regressionSet.none : []),
    ...(Array.isArray(wiBlockVerbs) ? wiBlockVerbs : []),
    ...seedVerbs,
  ]);
  return merged.filter((verb) => WIWA_SUFFIXES.some((suffix) => verb.endsWith(suffix)) && toSplitForm(verb));
}

async function main() {
  const { context } = await createModuleRuntime({ rootDir: ROOT });

  const constants = JSON.parse(fs.readFileSync(constantsPath, "utf8"));
  const phonology = JSON.parse(fs.readFileSync(phonologyPath, "utf8"));
  const derivRules = JSON.parse(fs.readFileSync(derivRulesPath, "utf8"));
  const redup = JSON.parse(fs.readFileSync(redupPath, "utf8"));

  if (typeof context.applyStaticConstants === "function") {
    context.applyStaticConstants(constants);
  }
  if (typeof context.applyStaticPhonology === "function") {
    context.applyStaticPhonology(phonology);
  }
  if (typeof context.applyStaticDerivationalRules === "function") {
    context.applyStaticDerivationalRules(derivRules);
  }
  if (typeof context.applyStaticValenceNeutral === "function") {
    context.applyStaticValenceNeutral({});
  }
  if (typeof context.applyStaticRedup === "function") {
    context.applyStaticRedup(redup);
  }

  if (typeof context.getCausativeDerivationOptions !== "function") {
    throw new Error("getCausativeDerivationOptions is not available");
  }

  const verbs = getCandidateVerbs(derivRules);
  const mismatches = [];
  const rows = [];

  verbs.forEach((fusedBase) => {
    const splitBase = toSplitForm(fusedBase);
    if (!splitBase) {
      return;
    }
    const fusedOptions = context.getCausativeDerivationOptions(fusedBase, fusedBase, {
      isTransitive: false,
      canonicalRuleBase: fusedBase,
      canonicalFullRuleBase: fusedBase,
    }) || [];
    const splitOptions = context.getCausativeDerivationOptions(splitBase, splitBase, {
      isTransitive: false,
      canonicalRuleBase: splitBase,
      canonicalFullRuleBase: splitBase,
    }) || [];
    const fusedTypeOne = collectTypeOutputs(fusedOptions, "type-one");
    const fusedTypeTwo = collectTypeOutputs(fusedOptions, "type-two");
    const splitTypeOne = collectTypeOutputs(splitOptions, "type-one");
    const splitTypeTwo = collectTypeOutputs(splitOptions, "type-two");
    const typeOneMatch = JSON.stringify(fusedTypeOne) === JSON.stringify(splitTypeOne);
    const typeTwoMatch = JSON.stringify(fusedTypeTwo) === JSON.stringify(splitTypeTwo);
    const pass = typeOneMatch && typeTwoMatch;
    const row = {
      fused: fusedBase,
      split: splitBase,
      pass,
      fusedTypeOne,
      splitTypeOne,
      fusedTypeTwo,
      splitTypeTwo,
    };
    rows.push(row);
    if (!pass) {
      mismatches.push(row);
    }
  });

  const summary = {
    total: rows.length,
    passed: rows.length - mismatches.length,
    failed: mismatches.length,
    mismatches,
  };

  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  process.exitCode = mismatches.length ? 1 : 0;
}

main().catch((error) => {
  const message = error && error.stack ? error.stack : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
