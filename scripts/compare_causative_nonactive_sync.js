#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

function readJson(root, relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));
}

function buildVmContext() {
  const noop = () => {};
  return {
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
}

function main() {
  const root = path.resolve(__dirname, "..");
  const scriptPath = path.join(root, "script.js");
  const basicCsvPath = path.join(root, "data", "basic data.csv");

  const code = fs.readFileSync(scriptPath, "utf8");
  const basicCsvText = fs.readFileSync(basicCsvPath, "utf8");

  const context = buildVmContext();
  vm.createContext(context);
  vm.runInContext(code, context, { filename: "script.js" });

  // Static loaders needed for parse + nonactive/causative rules.
  context.applyStaticPhonology?.(readJson(root, "data/static_phonology.json"));
  context.applyStaticConstants?.(readJson(root, "data/static_constants.json"));
  context.applyStaticRules?.(readJson(root, "data/static_rules.json"));
  context.applyStaticRedup?.(readJson(root, "data/static_redup.json"));
  context.applyStaticSuppletives?.(readJson(root, "data/static_suppletives.json"));
  context.applyStaticSuppletivePaths?.(readJson(root, "data/static_suppletive_paths.json"));
  context.applyStaticOptions?.(readJson(root, "data/static_options.json"));
  context.applyStaticDerivationalRules?.(readJson(root, "data/static_derivational_rules.json"));
  context.applyStaticValenceNeutral?.(readJson(root, "data/static_valence_neutral.json"));
  context.applyStaticMisc?.(readJson(root, "data/static_misc.json"));

  const canonicalMap = context.buildCanonicalVerbMapFromCSV(basicCsvText);
  // Ensure applyNonactiveDerivation's causative sync sees the same map.
  context.__canonicalMap = canonicalMap;
  vm.runInContext("BASIC_DATA_CANONICAL_MAP = __canonicalMap;", context);
  // For comparisons we want the full set of nonactive options (not a user-selected suffix).
  vm.runInContext("if (typeof setSelectedNonactiveSuffix === 'function') setSelectedNonactiveSuffix(null);", context);

  const rows = context.parseCSVRows(basicCsvText);
  const entries = [];
  rows.forEach((row, index) => {
    const cell = row && row[0] ? String(row[0]).trim() : "";
    if (!cell) return;
    const lower = cell.toLowerCase();
    if (index === 0 && (lower === "verb" || lower === "lx")) return;
    const token = context.parseVerbEntryToken(cell);
    if (!token || !token.base) return;
    entries.push(token);
  });

  const uniqueKey = (base, isTransitive) => `${isTransitive ? "-" : ""}${base}`.toLowerCase();
  const seen = new Set();
  const cases = [];

  const normalizeStemSet = (items) => {
    const set = new Set();
    (items || []).forEach((item) => {
      if (typeof item === "string" && item) {
        set.add(item);
      }
    });
    return Array.from(set).sort();
  };

  const computeDirectNonactiveSet = (parsed) => {
    const result = context.applyNonactiveDerivation({
      isNonactive: true,
      verb: parsed.verb,
      analysisVerb: parsed.analysisVerb,
      objectPrefix: "",
      parsedVerb: parsed,
      directionalPrefix: parsed.directionalPrefix || "",
      derivationType: "direct",
      causativeAllStems: null,
      isYawi: parsed.isYawi,
      suppletiveStemSet: null,
    });
    const stems = [];
    if (result && typeof result.verb === "string" && result.verb) {
      stems.push(result.verb);
    }
    if (Array.isArray(result?.nonactiveAllStems) && result.nonactiveAllStems.length) {
      stems.push(...result.nonactiveAllStems);
    }
    return normalizeStemSet(stems);
  };

  const computeCausativeStems = (parsed) => {
    const result = context.applyCausativeDerivation({
      isCausative: true,
      verb: parsed.verb,
      analysisVerb: parsed.analysisVerb,
      objectPrefix: "",
      parsedVerb: parsed,
      directionalPrefix: parsed.directionalPrefix || "",
      isYawi: parsed.isYawi,
      suppletiveStemSet: null,
    });
    const stems = Array.isArray(result?.causativeAllStems) ? result.causativeAllStems : null;
    return stems && stems.length ? stems : [];
  };

  const computeCausativeNonactiveSetForStem = (parsedSource, causativeAllStems, causStem) => {
    const result = context.applyNonactiveDerivation({
      isNonactive: true,
      verb: causStem,
      analysisVerb: causStem,
      objectPrefix: "",
      parsedVerb: parsedSource,
      directionalPrefix: parsedSource.directionalPrefix || "",
      derivationType: "causative",
      causativeAllStems,
      isYawi: false,
      suppletiveStemSet: null,
    });
    const stems = [];
    if (result && typeof result.verb === "string" && result.verb) {
      stems.push(result.verb);
    }
    if (Array.isArray(result?.nonactiveAllStems) && result.nonactiveAllStems.length) {
      stems.push(...result.nonactiveAllStems);
    }
    return normalizeStemSet(stems);
  };

  entries.forEach((entry) => {
    const base = entry.base;
    [false, true].forEach((isTransitive) => {
      if (isTransitive && !entry.transitive) return;
      if (!isTransitive && !entry.intransitive) return;
      const key = uniqueKey(base, isTransitive);
      if (seen.has(key)) return;
      seen.add(key);
      const raw = isTransitive ? `-${base}` : base;
      let parsedSource = null;
      let parsedSourceCausative = null;
      try {
        parsedSource = context.parseVerbInput(raw);
        parsedSourceCausative = context.getParsedVerbForTab("compare", raw, { derivationType: "causative" });
      } catch {
        parsedSource = null;
        parsedSourceCausative = null;
      }
      if (!parsedSource || !parsedSourceCausative) return;
      const causativeStems = computeCausativeStems(parsedSourceCausative);
      if (!causativeStems.length) return;

      causativeStems.forEach((causStem) => {
        const match = canonicalMap.get(String(causStem || "").toLowerCase());
        if (!match) return;
        const parsedMatch = match.transitiveParsed || match.intransitiveParsed;
        if (!parsedMatch) return;
        const expectedNonactiveSet = computeDirectNonactiveSet(parsedMatch);
        const actualNonactiveSet = computeCausativeNonactiveSetForStem(parsedSourceCausative, [causStem], causStem);
        const actualMergedNonactiveSet = computeCausativeNonactiveSetForStem(parsedSourceCausative, causativeStems, causStem);
        const ok = expectedNonactiveSet.length === actualNonactiveSet.length
          && expectedNonactiveSet.every((value, index) => value === actualNonactiveSet[index]);
        cases.push({
          source: raw,
          causativeStem: causStem,
          matchedDirect: (match.transitiveParsed ? `-${match.base}` : match.base),
          expectedNonactiveSet,
          actualNonactiveSet,
          actualMergedNonactiveSet,
          ok,
        });
      });
    });
  });

  const mismatches = cases.filter((c) => !c.ok);
  const summary = {
    totalPairs: cases.length,
    mismatches: mismatches.length,
    sample: cases.slice(0, 20),
  };

  const outPath = path.join(root, "tmp_causative_nonactive_sync_report.json");
  fs.writeFileSync(outPath, JSON.stringify({ summary, mismatches }, null, 2));

  console.log(JSON.stringify(summary, null, 2));
  if (mismatches.length) {
    console.log(`Wrote mismatches to ${outPath}`);
    process.exitCode = 1;
  } else {
    console.log(`All synced. Report: ${outPath}`);
  }
}

main();
