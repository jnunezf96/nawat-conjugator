#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { createVmContext } = require("./lib/vm_harness");

const ROOT = path.resolve(__dirname, "..");

const scriptPath = path.join(ROOT, "script.js");
const constantsPath = path.join(ROOT, "data", "static_constants.json");
const phonologyPath = path.join(ROOT, "data", "static_phonology.json");
const derivRulesPath = path.join(ROOT, "data", "static_derivational_rules.json");
const redupPath = path.join(ROOT, "data", "static_redup.json");

try {
  const { context } = createVmContext({ rootDir: ROOT, scriptPath });

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

  if (typeof context.runIntransitiveICausativeRegressionTests !== "function") {
    throw new Error("runIntransitiveICausativeRegressionTests is not available");
  }

  const summary = context.runIntransitiveICausativeRegressionTests({ throwOnFailure: true });
  process.stdout.write(`${JSON.stringify({
    total: summary.total,
    passed: summary.passed,
    failed: summary.failed,
  }, null, 2)}\n`);
  process.exit(0);
} catch (error) {
  const message = error && error.stack ? error.stack : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
