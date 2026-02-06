#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const contextPath = path.join(root, "pret_universal_context.js");
const enginePath = path.join(root, "pret_universal_engine.js");
const scriptPath = path.join(root, "script.js");
const defaultCsv = path.join(root, "data", "basic data.csv");
const defaultOut = path.join(root, "tmp_canonical_parse.json");

const inputCsv = process.argv[2] ? path.resolve(process.argv[2]) : defaultCsv;
const outputJson = process.argv[3] ? path.resolve(process.argv[3]) : defaultOut;

if (!fs.existsSync(scriptPath)) {
  console.error(`script.js not found at ${scriptPath}`);
  process.exit(2);
}
if (!fs.existsSync(contextPath)) {
  console.error(`pret_universal_context.js not found at ${contextPath}`);
  process.exit(2);
}
if (!fs.existsSync(enginePath)) {
  console.error(`pret_universal_engine.js not found at ${enginePath}`);
  process.exit(2);
}
if (!fs.existsSync(inputCsv)) {
  console.error(`CSV not found at ${inputCsv}`);
  process.exit(2);
}

const contextCode = fs.readFileSync(contextPath, "utf8");
const engineCode = fs.readFileSync(enginePath, "utf8");
const code = fs.readFileSync(scriptPath, "utf8");
const noop = () => {};
const context = {
  console,
  window: {},
  document: {
    addEventListener: noop,
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({
      appendChild: noop,
      setAttribute: noop,
      classList: { add: noop, remove: noop, toggle: noop },
      dataset: {},
      style: {},
    }),
    body: {},
    documentElement: { classList: { add: noop, remove: noop, toggle: noop } },
  },
  navigator: { userAgent: "" },
  localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
  sessionStorage: { getItem: () => null, setItem: noop, removeItem: noop },
  location: { search: "" },
  setTimeout,
  clearTimeout,
  URLSearchParams,
};

vm.createContext(context);
vm.runInContext(contextCode, context, { filename: path.basename(contextPath) });
vm.runInContext(engineCode, context, { filename: path.basename(enginePath) });
vm.runInContext(code, context, { filename: path.basename(scriptPath) });

const applyStaticPhonology = context.applyStaticPhonology;
const applyStaticConstants = context.applyStaticConstants;
const applyStaticRules = context.applyStaticRules;
const applyStaticRedup = context.applyStaticRedup;
if (applyStaticPhonology) {
  const phonology = JSON.parse(fs.readFileSync(path.join(root, "data/static_phonology.json"), "utf8"));
  applyStaticPhonology(phonology);
}
if (applyStaticConstants) {
  const constants = JSON.parse(fs.readFileSync(path.join(root, "data/static_constants.json"), "utf8"));
  applyStaticConstants(constants);
}
if (applyStaticRules) {
  const staticRules = JSON.parse(fs.readFileSync(path.join(root, "data/static_rules.json"), "utf8"));
  applyStaticRules(staticRules);
}
if (applyStaticRedup) {
  const redup = JSON.parse(fs.readFileSync(path.join(root, "data/static_redup.json"), "utf8"));
  applyStaticRedup(redup);
}

const parseVerbInput = context.parseVerbInput;
if (!parseVerbInput) {
  console.error("parseVerbInput missing from script.js");
  process.exit(2);
}

const parseCsvLine = (line) => {
  const cells = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === "\"") {
      if (inQuotes && line[i + 1] === "\"") {
        current += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === "," && !inQuotes) {
      cells.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  cells.push(current);
  return cells;
};

const text = fs.readFileSync(inputCsv, "utf8");
const entries = [];
text.split(/\r?\n/).forEach((line, index) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  const cells = parseCsvLine(trimmed);
  if (!cells.length) return;
  const firstCell = (cells[0] || "").trim();
  if (!firstCell) return;
  const normalized = firstCell.toLowerCase().replace(/^\//, "");
  if (index === 0 && (normalized === "lx" || normalized === "verb")) {
    return;
  }
  const parsed = parseVerbInput(firstCell);
  entries.push({
    input: firstCell,
    canonical: parsed?.canonical || null,
  });
});

const output = {
  version: 1,
  source: inputCsv,
  generatedAt: new Date().toISOString(),
  entries,
};

fs.writeFileSync(outputJson, JSON.stringify(output, null, 2));
console.log(`Wrote ${entries.length} entries to ${outputJson}`);
