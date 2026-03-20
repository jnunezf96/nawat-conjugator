#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { createVmContext } = require("./lib/vm_harness");

const ROOT = path.resolve(__dirname, "..");
const SCRIPT_PATH = path.join(ROOT, "script.js");
const PHONOLOGY_PATH = path.join(ROOT, "data", "static_phonology.json");
const DERIV_RULES_PATH = path.join(ROOT, "data", "static_derivational_rules.json");
const REDUP_PATH = path.join(ROOT, "data", "static_redup.json");
const REPORT_PATH = path.join(ROOT, "reports", "wa_family_superposition_report.json");

const ONSETS = ["p", "t", "k", "kw", "m", "n", "s", "sh", "w", "y", "tz", "ch"];
const FIRST_ONSETS = ["", ...ONSETS];
const PENULT_ONSETS = ["", ...ONSETS];
const PENULT_NUCLEI = ["a", "e", "i", "u"];
const PENULT_CODAS = ["", "j", "l"];
const FIRST_NUCLEUS = "a";
const MAX_SYLLABLES = 3;
const WA_ENDINGS = new Set(["awa", "iwa", "ewa", "uwa"]);

function roundNumber(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round((Number(value) + Number.EPSILON) * factor) / factor;
}

function pairsFromCount(count) {
  const n = Number(count) || 0;
  return n > 1 ? (n * (n - 1)) / 2 : 0;
}

function createContext() {
  return createVmContext({ rootDir: ROOT, scriptPath: SCRIPT_PATH }).context;
}

function bootstrap(context) {
  const phonology = JSON.parse(fs.readFileSync(PHONOLOGY_PATH, "utf8"));
  const derivRules = JSON.parse(fs.readFileSync(DERIV_RULES_PATH, "utf8"));
  const redup = JSON.parse(fs.readFileSync(REDUP_PATH, "utf8"));

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
  return phonology;
}

function classify(context, base) {
  const options = context.getCausativeDerivationOptions(base, base, {
    isTransitive: false,
    canonicalRuleBase: base,
    canonicalFullRuleBase: base,
    allowTypeTwo: false,
  }) || [];
  const typeOne = options.filter((entry) => entry && entry.type === "type-one");
  const trace = options.causativeTrace || typeOne[0]?.causativeTrace || null;
  const winner = trace?.intransitiveI?.winner || null;
  const wiPolicy = trace?.wiWaPolicy || null;

  let coarse = winner?.label || "none";
  if (!winner) {
    const additiveStem = `${base}a`;
    const replaciveStem = `${base.slice(0, -1)}a`;
    const hasAdditive = typeOne.some((entry) => entry.stem === additiveStem);
    const hasReplacive = typeOne.some((entry) => entry.stem === replaciveStem);
    if (hasAdditive && !hasReplacive) {
      coarse = "additive";
    } else if (hasReplacive && !hasAdditive) {
      coarse = "replacive";
    } else if (hasAdditive && hasReplacive) {
      coarse = "additive";
    } else {
      coarse = "none";
    }
  }

  const primaryStem = typeOne[0]?.stem || "";
  const fine = !primaryStem
    ? "none"
    : (primaryStem.endsWith("ua") ? "ua" : (primaryStem.endsWith("wa") ? "wa" : "other"));
  const wiFeatures = wiPolicy?.features || {};
  const sourceClass = String(wiPolicy?.sourceClass || "");

  return {
    coarse,
    fine,
    stem: primaryStem || null,
    rule: typeOne[0]?.rule || null,
    wiPolicySourceClass: sourceClass,
    wiPolicySourceClassCanonical: sourceClass.replace(/^wa_mirror_/, ""),
    wiPolicyStockFamily: wiFeatures.stockFamily || wiPolicy?.stockFamily || "unknown",
    wiPolicyDesuperposeKey: wiPolicy?.desuperposeKey || "",
    wiPolicyDecisionKey: wiPolicy?.decisionKey || "",
    wiPolicyTypeOneTarget: wiPolicy?.typeOneTarget || null,
    wiPolicyPrefixSubcell: wiFeatures.prefixSubcell || "",
    wiPolicyPrefixCoda: wiFeatures.prefixCoda || "",
    wiPolicyFirstOnset: wiFeatures.firstOnset || "",
    wiPolicyIsVjBoundarySubcell: wiFeatures.isVjBoundarySubcell === true,
    wiPolicyRootLength: Number(wiFeatures.wiRootLength || 0),
    wiPolicyRootPreFinal: wiFeatures.wiRootPreFinal || "",
    wiPolicyRootFinal: wiFeatures.wiRootFinal || "",
    wiPolicyRootLastVowel: wiFeatures.wiRootLastVowel || "",
  };
}

function generateWaFamilyRows(context, validForms) {
  const rows = [];
  const seen = new Set();
  for (const firstOnset of FIRST_ONSETS) {
    for (const penultOnset of PENULT_ONSETS) {
      for (const penultNucleus of PENULT_NUCLEI) {
        for (const penultCoda of PENULT_CODAS) {
          const form = `${firstOnset}${FIRST_NUCLEUS}${penultOnset}${penultNucleus}${penultCoda}wa`;
          if (seen.has(form)) {
            continue;
          }
          seen.add(form);
          const syllables = context.getSyllables(form, { analysis: true, assumeFinalV: true }) || [];
          if (!syllables.length || syllables.length !== 3 || syllables.length > MAX_SYLLABLES) {
            continue;
          }
          if (!syllables.every((syllable) => validForms.has(syllable.form))) {
            continue;
          }
          const ending = form.slice(-3);
          if (!WA_ENDINGS.has(ending)) {
            continue;
          }
          rows.push({
            form,
            ending,
            ...classify(context, form),
          });
        }
      }
    }
  }
  return rows;
}

function countBy(rows, selector) {
  const counts = {};
  rows.forEach((row) => {
    const key = String(selector(row) || "");
    counts[key] = (counts[key] || 0) + 1;
  });
  return counts;
}

function buildGrouping(rows, getKey, getOutcome) {
  const grouped = new Map();
  rows.forEach((row) => {
    const key = String(getKey(row) || "");
    if (!grouped.has(key)) {
      grouped.set(key, { total: 0, outcomes: {}, samples: [] });
    }
    const bucket = grouped.get(key);
    const outcome = String(getOutcome(row) || "none");
    bucket.total += 1;
    bucket.outcomes[outcome] = (bucket.outcomes[outcome] || 0) + 1;
    if (bucket.samples.length < 8) {
      bucket.samples.push({
        form: row.form,
        outcome,
        sourceClass: row.wiPolicySourceClass,
        stockFamily: row.wiPolicyStockFamily,
      });
    }
  });
  return grouped;
}

function buildKeyQuality(rows, getKey, getOutcome) {
  const grouped = buildGrouping(rows, getKey, getOutcome);
  const entries = [...grouped.entries()].map(([key, bucket]) => {
    const nonzero = Object.entries(bucket.outcomes).filter(([, count]) => count > 0);
    const top = nonzero.slice().sort((a, b) => b[1] - a[1])[0] || ["none", 0];
    const purity = bucket.total ? top[1] / bucket.total : 0;
    return {
      key,
      total: bucket.total,
      counts: bucket.outcomes,
      mixed: nonzero.length > 1,
      purity: roundNumber(purity, 4),
      samples: bucket.samples,
    };
  });
  const mixed = entries
    .filter((entry) => entry.mixed)
    .sort((a, b) => {
      if (a.purity !== b.purity) {
        return a.purity - b.purity;
      }
      return b.total - a.total;
    });
  return {
    uniqueKeys: entries.length,
    mixedKeys: mixed.length,
    mixedKeyRate: roundNumber(mixed.length / Math.max(1, entries.length), 4),
    mixedExamples: mixed.slice(0, 20),
  };
}

function buildPairwiseMetrics(rows, getKey, getOutcome) {
  const grouped = buildGrouping(rows, getKey, getOutcome);
  const outcomeCounts = countBy(rows, getOutcome);
  const totalPairs = pairsFromCount(rows.length);
  let trueUnity = 0;
  let falseUnity = 0;
  const falseUnityExamples = [];

  grouped.forEach((bucket, key) => {
    const counts = Object.values(bucket.outcomes);
    const groupPairs = pairsFromCount(bucket.total);
    const samePairs = counts.reduce((sum, count) => sum + pairsFromCount(count), 0);
    trueUnity += samePairs;
    const mixedPairs = groupPairs - samePairs;
    falseUnity += mixedPairs;
    if (mixedPairs > 0 && falseUnityExamples.length < 12) {
      const sampleA = bucket.samples[0] || null;
      const sampleB = bucket.samples.find((entry) => entry.outcome !== sampleA?.outcome) || null;
      if (sampleA && sampleB) {
        falseUnityExamples.push({
          key,
          a: sampleA,
          b: sampleB,
        });
      }
    }
  });

  const sameOutcomePairsGlobal = Object.values(outcomeCounts)
    .reduce((sum, count) => sum + pairsFromCount(count), 0);
  const falseSeparation = sameOutcomePairsGlobal - trueUnity;
  const trueSeparation = totalPairs - trueUnity - falseUnity - falseSeparation;

  return {
    totalPairs,
    trueUnity,
    falseUnity,
    trueSeparation,
    falseSeparation,
    trueUnityRate: totalPairs ? roundNumber(trueUnity / totalPairs, 4) : 0,
    falseUnityRate: totalPairs ? roundNumber(falseUnity / totalPairs, 4) : 0,
    trueSeparationRate: totalPairs ? roundNumber(trueSeparation / totalPairs, 4) : 0,
    falseSeparationRate: totalPairs ? roundNumber(falseSeparation / totalPairs, 4) : 0,
    falseUnityExamples,
  };
}

function buildFeatureSubsetKey(row, featureNames) {
  return featureNames.map((featureName) => {
    const value = row[featureName];
    if (typeof value === "boolean") {
      return value ? "1" : "0";
    }
    if (value === "" || value === null || value === undefined) {
      return "_";
    }
    return String(value);
  }).join("|");
}

function runFamilyFeatureMinimizer(rows, getOutcome) {
  const featurePool = [
    "wiPolicySourceClassCanonical",
    "wiPolicyTypeOneTarget",
    "wiPolicyPrefixSubcell",
    "wiPolicyPrefixCoda",
    "wiPolicyFirstOnset",
    "wiPolicyIsVjBoundarySubcell",
    "wiPolicyRootLength",
    "wiPolicyRootPreFinal",
    "wiPolicyRootFinal",
    "wiPolicyRootLastVowel",
  ];

  const groupedFamilies = new Map();
  rows.forEach((row) => {
    const family = row.wiPolicyStockFamily || "unknown";
    if (!groupedFamilies.has(family)) {
      groupedFamilies.set(family, []);
    }
    groupedFamilies.get(family).push(row);
  });

  const families = {};
  groupedFamilies.forEach((familyRows, family) => {
    const subsets = [];
    const maxMask = 1 << featurePool.length;
    for (let mask = 1; mask < maxMask; mask += 1) {
      const features = [];
      for (let i = 0; i < featurePool.length; i += 1) {
        if ((mask & (1 << i)) !== 0) {
          features.push(featurePool[i]);
        }
      }
      const metrics = buildPairwiseMetrics(
        familyRows,
        (row) => buildFeatureSubsetKey(row, features),
        getOutcome
      );
      subsets.push({
        features,
        featureCount: features.length,
        uniqueKeys: buildKeyQuality(
          familyRows,
          (row) => buildFeatureSubsetKey(row, features),
          getOutcome
        ).uniqueKeys,
        falseUnity: metrics.falseUnity,
        falseUnityRate: metrics.falseUnityRate,
      });
    }

    const zeroFalseUnity = subsets
      .filter((entry) => entry.falseUnity === 0)
      .sort((a, b) => {
        if (a.uniqueKeys !== b.uniqueKeys) {
          return a.uniqueKeys - b.uniqueKeys;
        }
        return a.featureCount - b.featureCount;
      });
    const fallback = subsets
      .slice()
      .sort((a, b) => {
        if (a.falseUnity !== b.falseUnity) {
          return a.falseUnity - b.falseUnity;
        }
        if (a.uniqueKeys !== b.uniqueKeys) {
          return a.uniqueKeys - b.uniqueKeys;
        }
        return a.featureCount - b.featureCount;
      });

    families[family] = {
      rows: familyRows.length,
      baselineDesuperpose: buildPairwiseMetrics(
        familyRows,
        (row) => row.wiPolicyDesuperposeKey || "",
        getOutcome
      ),
      baselineDecision: buildPairwiseMetrics(
        familyRows,
        (row) => row.wiPolicyDecisionKey || row.wiPolicyDesuperposeKey || "",
        getOutcome
      ),
      bestZeroFalseUnity: zeroFalseUnity[0] || null,
      bestFallback: fallback[0] || null,
      topZeroFalseUnity: zeroFalseUnity.slice(0, 8),
    };
  });

  return {
    featurePool,
    families,
  };
}

function run() {
  const context = createContext();
  const phonology = bootstrap(context);
  const validForms = new Set(Array.isArray(phonology.syllableForms) ? phonology.syllableForms : []);
  const rows = generateWaFamilyRows(context, validForms);
  const coarseOutcome = (row) => row.coarse || "none";
  const fineOutcome = (row) => row.fine || "none";
  const desuperposeKey = (row) => row.wiPolicyDesuperposeKey || "";
  const decisionKey = (row) => row.wiPolicyDecisionKey || row.wiPolicyDesuperposeKey || "";

  const report = {
    generatedAt: new Date().toISOString(),
    pipeline: "wa-family intransitive > causative (type-one)",
    scope: {
      forms: "...awa/...iwa/...ewa/...uwa",
      candidateRows: rows.length,
      maxSyllables: MAX_SYLLABLES,
    },
    distributions: {
      endings: countBy(rows, (row) => row.ending),
      stockFamilies: countBy(rows, (row) => row.wiPolicyStockFamily || "unknown"),
      sourceClasses: countBy(rows, (row) => row.wiPolicySourceClass || "unknown"),
      coarseOutcomes: countBy(rows, coarseOutcome),
      fineOutcomes: countBy(rows, fineOutcome),
    },
    desuperpose: {
      coarse: {
        keyQuality: buildKeyQuality(rows, desuperposeKey, coarseOutcome),
        pairwise: buildPairwiseMetrics(rows, desuperposeKey, coarseOutcome),
      },
      fine: {
        keyQuality: buildKeyQuality(rows, desuperposeKey, fineOutcome),
        pairwise: buildPairwiseMetrics(rows, desuperposeKey, fineOutcome),
      },
    },
    decision: {
      coarse: {
        keyQuality: buildKeyQuality(rows, decisionKey, coarseOutcome),
        pairwise: buildPairwiseMetrics(rows, decisionKey, coarseOutcome),
      },
      fine: {
        keyQuality: buildKeyQuality(rows, decisionKey, fineOutcome),
        pairwise: buildPairwiseMetrics(rows, decisionKey, fineOutcome),
      },
    },
    minimizer: {
      fineByFamily: runFamilyFeatureMinimizer(rows, fineOutcome),
    },
  };

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

  const compact = {
    reportPath: REPORT_PATH,
    candidateRows: report.scope.candidateRows,
    endings: report.distributions.endings,
    stockFamilies: report.distributions.stockFamilies,
    desuperposeFineFalseUnity: report.desuperpose.fine.pairwise.falseUnity,
    decisionFineFalseUnity: report.decision.fine.pairwise.falseUnity,
    desuperposeFineFalseSeparation: report.desuperpose.fine.pairwise.falseSeparation,
    decisionFineFalseSeparation: report.decision.fine.pairwise.falseSeparation,
  };
  process.stdout.write(`${JSON.stringify(compact, null, 2)}\n`);
}

try {
  run();
} catch (error) {
  const message = error && error.stack ? error.stack : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
