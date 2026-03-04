#!/usr/bin/env node

const fs = require("fs");
const vm = require("vm");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SCRIPT_PATH = path.join(ROOT, "script.js");
const PHONOLOGY_PATH = path.join(ROOT, "data", "static_phonology.json");
const DERIV_RULES_PATH = path.join(ROOT, "data", "static_derivational_rules.json");
const REDUP_PATH = path.join(ROOT, "data", "static_redup.json");
const REPORT_PATH = path.join(ROOT, "reports", "intransitive_i_causative_3d_matrix_report.json");

// Onset inventory excludes coda-only segments (e.g., l, j).
const ONSETS = ["p", "t", "k", "kw", "m", "n", "s", "sh", "w", "y", "tz", "ch"];
const FIRST_ONSETS = ["", ...ONSETS];
const PENULT_ONSETS = ["", ...ONSETS];
const FINAL_ONSETS = ["", ...ONSETS];
const PENULT_NUCLEI = ["a", "e", "i", "u"];
const PENULT_CODAS = ["", "j", "l"];
const FIRST_NUCLEUS = "a";
const MAX_SYLLABLES = 3;
const STATIC_PHONOLOGY = JSON.parse(fs.readFileSync(PHONOLOGY_PATH, "utf8"));
const VALID_SYLLABLE_FORMS = new Set(Array.isArray(STATIC_PHONOLOGY.syllableForms)
  ? STATIC_PHONOLOGY.syllableForms
  : []);
const LABELS = ["additive", "replacive", "none"];
const FEATURE_KEYS = [
  "firstOnset",
  "penultOnset",
  "penultNucleus",
  "penultCoda",
  "finalOnset",
  "firstManner",
  "finalManner",
  "firstPlace",
  "finalPlace",
  "penultShape",
  "mannerPair",
  "placePair",
];
const STRUCTURAL_FEATURES = [
  "firstOnset",
  "penultOnset",
  "penultNucleus",
  "penultCoda",
  "finalOnset",
];

const noop = () => {};
const fakeClassList = {
  add: noop,
  remove: noop,
  toggle: noop,
  contains: () => false,
};

const fakeElement = new Proxy(
  {
    value: "",
    checked: false,
    style: {},
    dataset: {},
    classList: fakeClassList,
    addEventListener: noop,
    removeEventListener: noop,
    appendChild: noop,
    removeChild: noop,
    setAttribute: noop,
    getAttribute: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    closest: () => null,
    focus: noop,
    blur: noop,
    click: noop,
    textContent: "",
    innerHTML: "",
  },
  {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      return noop;
    },
  }
);

function createContext() {
  const document = {
    body: fakeElement,
    documentElement: fakeElement,
    addEventListener: noop,
    removeEventListener: noop,
    getElementById: () => fakeElement,
    querySelector: () => fakeElement,
    querySelectorAll: () => [],
    createElement: () => fakeElement,
  };

  const windowObject = {
    document,
    addEventListener: noop,
    removeEventListener: noop,
    matchMedia: () => ({
      matches: false,
      addEventListener: noop,
      removeEventListener: noop,
    }),
    requestAnimationFrame: (callback) => setTimeout(callback, 0),
    cancelAnimationFrame: noop,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    localStorage: {
      getItem: () => null,
      setItem: noop,
      removeItem: noop,
    },
    visualViewport: {
      scale: 1,
      addEventListener: noop,
      removeEventListener: noop,
    },
    devicePixelRatio: 1,
    scrollBy: noop,
  };

  const context = {
    console,
    window: windowObject,
    document,
    localStorage: windowObject.localStorage,
    navigator: { userAgent: "node" },
    URL: {
      createObjectURL: () => "",
      revokeObjectURL: noop,
    },
    Blob: function Blob() {},
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    fetch: undefined,
  };
  context.globalThis = context;
  windowObject.window = windowObject;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(SCRIPT_PATH, "utf8"), context, { filename: SCRIPT_PATH });
  return context;
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createLabelCounts() {
  return { additive: 0, replacive: 0, none: 0, other: 0 };
}

function incrementLabelCount(counts, label, delta = 1) {
  if (Object.prototype.hasOwnProperty.call(counts, label)) {
    counts[label] += delta;
  } else {
    counts.other += delta;
  }
}

function getDominantLabel(counts) {
  const ranked = [...LABELS]
    .map((label) => ({ label, count: counts[label] || 0 }))
    .sort((a, b) => b.count - a.count);
  const top = ranked[0] || { label: "none", count: 0 };
  const total = LABELS.reduce((sum, label) => sum + (counts[label] || 0), 0);
  return {
    label: top.label,
    count: top.count,
    confidence: total ? top.count / total : 0,
    total,
  };
}

function shannonEntropyFromCounts(counts) {
  const total = LABELS.reduce((sum, label) => sum + (counts[label] || 0), 0);
  if (!total) {
    return 0;
  }
  return LABELS.reduce((entropy, label) => {
    const p = (counts[label] || 0) / total;
    if (p <= 0) {
      return entropy;
    }
    return entropy - (p * Math.log2(p));
  }, 0);
}

function roundNumber(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round((Number(value) + Number.EPSILON) * factor) / factor;
}

function bootstrap(context, derivRulesOverride = null) {
  const phonology = JSON.parse(fs.readFileSync(PHONOLOGY_PATH, "utf8"));
  const derivRules = derivRulesOverride || JSON.parse(fs.readFileSync(DERIV_RULES_PATH, "utf8"));
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
}

function getSegmentFeatures(segment = "") {
  const map = {
    p: { place: "labial", manner: "stop", sonority: 1 },
    m: { place: "labial", manner: "nasal", sonority: 3 },
    w: { place: "labial", manner: "glide", sonority: 5 },
    t: { place: "coronal", manner: "stop", sonority: 1 },
    s: { place: "coronal", manner: "fricative", sonority: 2 },
    n: { place: "coronal", manner: "nasal", sonority: 3 },
    l: { place: "coronal", manner: "lateral", sonority: 4 },
    tz: { place: "coronal", manner: "affricate", sonority: 1 },
    sh: { place: "coronal", manner: "fricative", sonority: 2 },
    ch: { place: "coronal", manner: "affricate", sonority: 1 },
    y: { place: "palatal", manner: "glide", sonority: 5 },
    j: { place: "palatal", manner: "glide", sonority: 5 },
    k: { place: "dorsal", manner: "stop", sonority: 1 },
    kw: { place: "dorsal", manner: "stop", sonority: 1 },
  };
  if (!segment) {
    return { place: "none", manner: "none", sonority: 0 };
  }
  return map[segment] || { place: "other", manner: "other", sonority: 3 };
}

function classifyIntransitiveICausative(context, base) {
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

  let label = winner?.label || "none";
  if (!winner) {
    const additiveStem = `${base}a`;
    const replaciveStem = `${base.slice(0, -1)}a`;
    const hasAdditive = typeOne.some((entry) => entry.stem === additiveStem);
    const hasReplacive = typeOne.some((entry) => entry.stem === replaciveStem);
    if (hasAdditive && !hasReplacive) {
      label = "additive";
    } else if (hasReplacive && !hasAdditive) {
      label = "replacive";
    } else if (hasAdditive && hasReplacive) {
      label = "additive";
    } else {
      label = "none";
    }
  }
  const typeOneStems = typeOne.map((entry) => entry.stem);
  const primaryTypeOneStem = typeOneStems[0] || "";
  let typeOneOutcome = "none";
  if (primaryTypeOneStem) {
    if (primaryTypeOneStem.endsWith("ua")) {
      typeOneOutcome = "ua";
    } else if (primaryTypeOneStem.endsWith("wa")) {
      typeOneOutcome = "wa";
    } else {
      typeOneOutcome = "other";
    }
  }

  return {
    base,
    label,
    source: winner?.source || "no-trace",
    winner,
    typeOneStems,
    typeOneOutcome,
    wiPolicy: wiPolicy
      ? {
        sourceClass: wiPolicy.sourceClass || "",
        stockFamily: wiPolicy.features?.stockFamily || wiPolicy.stockFamily || "",
        desuperposeKey: wiPolicy.desuperposeKey || "",
        typeOneTarget: wiPolicy.typeOneTarget || null,
      }
      : null,
  };
}

function generateCandidates(context) {
  const candidates = [];
  const seenForms = new Set();
  for (const firstOnset of FIRST_ONSETS) {
    for (const penultOnset of PENULT_ONSETS) {
      for (const penultNucleus of PENULT_NUCLEI) {
        for (const penultCoda of PENULT_CODAS) {
          for (const finalOnset of FINAL_ONSETS) {
            const syllable1 = `${firstOnset}${FIRST_NUCLEUS}`;
            const syllable2 = `${penultOnset}${penultNucleus}${penultCoda}`;
            const syllable3 = `${finalOnset}i`;
            const form = `${syllable1}${syllable2}${syllable3}`;
            const syllables = context.getSyllables(form, { analysis: true, assumeFinalV: true }) || [];
            if (!syllables.length || syllables.length > MAX_SYLLABLES) {
              continue;
            }
            if (!syllables.every((syllable) => VALID_SYLLABLE_FORMS.has(syllable.form))) {
              continue;
            }
            if (syllables.length !== 3) {
              continue;
            }
            if (seenForms.has(form)) {
              continue;
            }
            seenForms.add(form);
            const first = syllables[0] || {};
            const penult = syllables[1] || {};
            const final = syllables[2] || {};
            const resolvedFirstOnset = first.onset || "";
            const resolvedPenultNucleus = penult.nucleus || "";
            const resolvedPenultCoda = penult.coda || "";
            const resolvedFinalOnset = final.onset || "";
            const firstProfile = getSegmentFeatures(resolvedFirstOnset);
            const finalProfile = getSegmentFeatures(resolvedFinalOnset);
            candidates.push({
              form,
              firstOnset: resolvedFirstOnset,
              penultOnset: penult.onset || "",
              penultNucleus: resolvedPenultNucleus,
              penultCoda: resolvedPenultCoda,
              finalOnset: resolvedFinalOnset,
              penultShape: resolvedPenultCoda
                ? `${resolvedPenultNucleus}+${resolvedPenultCoda}`
                : resolvedPenultNucleus,
              firstManner: firstProfile.manner,
              finalManner: finalProfile.manner,
              firstPlace: firstProfile.place,
              finalPlace: finalProfile.place,
              mannerPair: `${finalProfile.manner}:${firstProfile.manner}`,
              placePair: `${finalProfile.place}:${firstProfile.place}`,
            });
          }
        }
      }
    }
  }
  return candidates;
}

function incrementCount(bucket, label) {
  bucket.total += 1;
  if (label === "additive" || label === "replacive" || label === "none") {
    bucket[label] += 1;
  } else {
    bucket.other += 1;
  }
}

function ensureCell(matrix, axis1, axis2, axis3) {
  if (!matrix[axis1]) {
    matrix[axis1] = {};
  }
  if (!matrix[axis1][axis2]) {
    matrix[axis1][axis2] = {};
  }
  if (!matrix[axis1][axis2][axis3]) {
    matrix[axis1][axis2][axis3] = { total: 0, additive: 0, replacive: 0, none: 0, other: 0 };
  }
  return matrix[axis1][axis2][axis3];
}

function safeDominant(cell) {
  const pairs = [
    ["additive", cell.additive],
    ["replacive", cell.replacive],
    ["none", cell.none],
    ["other", cell.other],
  ];
  pairs.sort((a, b) => b[1] - a[1]);
  const dominant = pairs[0];
  const ratio = cell.total ? dominant[1] / cell.total : 0;
  return { label: dominant[0], ratio };
}

function buildMatrixAndAgents(candidates, baselineByForm, matrixOnlyByForm) {
  const labelCounts = createLabelCounts();
  const sourceCounts = {};
  const matrix3d = {};
  const rows = [];

  const agents = {
    fallbackScout: {
      count: 0,
      samples: [],
    },
    disagreementScout: {
      count: 0,
      samples: [],
    },
    confidenceScout: {
      count: 0,
      samples: [],
    },
    entropyScout: {
      count: 0,
      hotCells: [],
    },
  };

  const groupedForEntropy = {};

  candidates.forEach((candidate) => {
    const baseline = baselineByForm.get(candidate.form);
    if (!baseline) {
      return;
    }
    const label = baseline.label;
    incrementLabelCount(labelCounts, label, 1);

    sourceCounts[baseline.source] = (sourceCounts[baseline.source] || 0) + 1;
    rows.push({
      ...candidate,
      label,
      source: baseline.source,
      winner: baseline.winner || null,
      confidence: baseline.winner?.confidence || null,
      typeOneOutcome: baseline.typeOneOutcome || "none",
      wiPolicySourceClass: baseline.wiPolicy?.sourceClass || "",
      wiPolicyStockFamily: baseline.wiPolicy?.stockFamily || "",
      wiPolicyDesuperposeKey: baseline.wiPolicy?.desuperposeKey || "",
      wiPolicyTypeOneTarget: baseline.wiPolicy?.typeOneTarget || null,
    });

    const cell = ensureCell(matrix3d, candidate.firstManner, candidate.penultShape, candidate.finalManner);
    incrementCount(cell, label);

    const entropyKey = `${candidate.firstManner} | ${candidate.penultShape} | ${candidate.finalManner}`;
    if (!groupedForEntropy[entropyKey]) {
      groupedForEntropy[entropyKey] = { total: 0, additive: 0, replacive: 0, none: 0, other: 0 };
    }
    incrementCount(groupedForEntropy[entropyKey], label);

    if (baseline.source === "sonority-place-formula-fallback") {
      agents.fallbackScout.count += 1;
      if (agents.fallbackScout.samples.length < 25) {
        agents.fallbackScout.samples.push({
          form: candidate.form,
          label,
          firstOnset: candidate.firstOnset || "(zero)",
          penultShape: candidate.penultShape,
          finalOnset: candidate.finalOnset || "(zero)",
        });
      }
    }

    if (baseline.source === "pair-bias-config" && baseline.winner?.confidence) {
      const { topScore = 0, margin = 0, minTopScore = 0, minMargin = 0 } = baseline.winner.confidence;
      const isLowConfidence = topScore < (minTopScore + 0.7) || margin < (minMargin + 0.35);
      if (isLowConfidence) {
        agents.confidenceScout.count += 1;
        if (agents.confidenceScout.samples.length < 25) {
          agents.confidenceScout.samples.push({
            form: candidate.form,
            label,
            topScore,
            margin,
            minTopScore,
            minMargin,
            pair: baseline.winner.pair || null,
          });
        }
      }
    }

    const matrixOnly = matrixOnlyByForm.get(candidate.form);
    if (matrixOnly && matrixOnly.label !== baseline.label) {
      agents.disagreementScout.count += 1;
      if (agents.disagreementScout.samples.length < 30) {
        agents.disagreementScout.samples.push({
          form: candidate.form,
          baseline: { label: baseline.label, source: baseline.source },
          matrixOnly: { label: matrixOnly.label, source: matrixOnly.source },
          firstOnset: candidate.firstOnset || "(zero)",
          penultShape: candidate.penultShape,
          finalOnset: candidate.finalOnset || "(zero)",
        });
      }
    }
  });

  const hotCells = Object.entries(groupedForEntropy)
    .map(([key, counts]) => {
      const dominant = safeDominant(counts);
      return {
        key,
        total: counts.total,
        dominantLabel: dominant.label,
        dominantRatio: Number(dominant.ratio.toFixed(4)),
        additive: counts.additive,
        replacive: counts.replacive,
        none: counts.none,
        other: counts.other,
      };
    })
    .filter((entry) => entry.total >= 18 && entry.dominantRatio < 0.64)
    .sort((a, b) => {
      if (a.dominantRatio !== b.dominantRatio) {
        return a.dominantRatio - b.dominantRatio;
      }
      return b.total - a.total;
    });

  agents.entropyScout.count = hotCells.length;
  agents.entropyScout.hotCells = hotCells.slice(0, 30);

  return {
    labelCounts,
    sourceCounts,
    matrix3d,
    agents,
    rows,
  };
}

function getBaseLabelRates(rows) {
  const counts = createLabelCounts();
  rows.forEach((row) => incrementLabelCount(counts, row.label, 1));
  const total = rows.length || 1;
  const rates = {};
  LABELS.forEach((label) => {
    rates[label] = (counts[label] || 0) / total;
  });
  return { counts, rates, total: rows.length };
}

function runSingleFeaturePatternScout(rows, baseLabelRates) {
  const minSupport = 48;
  const perFeature = {};
  const strongRules = [];
  const ambiguousHotspots = [];

  FEATURE_KEYS.forEach((featureKey) => {
    const valueMap = new Map();
    rows.forEach((row) => {
      const rawValue = row[featureKey];
      const value = rawValue === "" ? "(zero)" : String(rawValue);
      if (!valueMap.has(value)) {
        valueMap.set(value, { total: 0, counts: createLabelCounts() });
      }
      const stat = valueMap.get(value);
      stat.total += 1;
      incrementLabelCount(stat.counts, row.label, 1);
    });

    const entries = [...valueMap.entries()].map(([value, stat]) => {
      const dominant = getDominantLabel(stat.counts);
      const entropy = shannonEntropyFromCounts(stat.counts);
      const baseRate = baseLabelRates[dominant.label] || 0;
      const lift = baseRate > 0 ? dominant.confidence / baseRate : 0;
      return {
        feature: featureKey,
        value,
        total: stat.total,
        dominantLabel: dominant.label,
        dominantConfidence: roundNumber(dominant.confidence, 4),
        lift: roundNumber(lift, 4),
        entropy: roundNumber(entropy, 4),
        additive: stat.counts.additive,
        replacive: stat.counts.replacive,
        none: stat.counts.none,
      };
    });

    const eligible = entries.filter((entry) => entry.total >= minSupport);
    perFeature[featureKey] = {
      topPredictors: eligible
        .slice()
        .sort((a, b) => {
          if (b.dominantConfidence !== a.dominantConfidence) {
            return b.dominantConfidence - a.dominantConfidence;
          }
          if (b.lift !== a.lift) {
            return b.lift - a.lift;
          }
          return b.total - a.total;
        })
        .slice(0, 12),
      ambiguous: eligible
        .slice()
        .filter((entry) => entry.dominantConfidence <= 0.58)
        .sort((a, b) => {
          if (a.dominantConfidence !== b.dominantConfidence) {
            return a.dominantConfidence - b.dominantConfidence;
          }
          return b.total - a.total;
        })
        .slice(0, 12),
    };

    eligible.forEach((entry) => {
      if (entry.dominantConfidence >= 0.8) {
        strongRules.push(entry);
      }
      if (entry.dominantConfidence <= 0.58) {
        ambiguousHotspots.push(entry);
      }
    });
  });

  strongRules.sort((a, b) => {
    if (b.dominantConfidence !== a.dominantConfidence) {
      return b.dominantConfidence - a.dominantConfidence;
    }
    if (b.lift !== a.lift) {
      return b.lift - a.lift;
    }
    return b.total - a.total;
  });

  ambiguousHotspots.sort((a, b) => {
    if (a.dominantConfidence !== b.dominantConfidence) {
      return a.dominantConfidence - b.dominantConfidence;
    }
    return b.total - a.total;
  });

  return {
    minSupport,
    strongRuleCount: strongRules.length,
    ambiguousHotspotCount: ambiguousHotspots.length,
    strongRules: strongRules.slice(0, 40),
    ambiguousHotspots: ambiguousHotspots.slice(0, 40),
    perFeature,
  };
}

function runPairRulePatternScout(rows, baseLabelRates) {
  const minSupport = 40;
  const pairFeatures = [
    "firstOnset",
    "penultOnset",
    "penultNucleus",
    "penultCoda",
    "finalOnset",
    "firstManner",
    "finalManner",
    "penultShape",
  ];
  const pairDefs = [];
  for (let i = 0; i < pairFeatures.length; i += 1) {
    for (let j = i + 1; j < pairFeatures.length; j += 1) {
      pairDefs.push([pairFeatures[i], pairFeatures[j]]);
    }
  }

  const pairMaps = pairDefs.map(() => new Map());
  rows.forEach((row) => {
    pairDefs.forEach(([aKey, bKey], idx) => {
      const aVal = row[aKey] === "" ? "(zero)" : String(row[aKey]);
      const bVal = row[bKey] === "" ? "(zero)" : String(row[bKey]);
      const key = `${aVal}::${bVal}`;
      const map = pairMaps[idx];
      if (!map.has(key)) {
        map.set(key, {
          aKey,
          bKey,
          aVal,
          bVal,
          total: 0,
          counts: createLabelCounts(),
        });
      }
      const stat = map.get(key);
      stat.total += 1;
      incrementLabelCount(stat.counts, row.label, 1);
    });
  });

  const topByPair = {};
  const allRules = [];
  pairMaps.forEach((map, idx) => {
    const [aKey, bKey] = pairDefs[idx];
    const rules = [...map.values()]
      .filter((stat) => stat.total >= minSupport)
      .map((stat) => {
        const dominant = getDominantLabel(stat.counts);
        const baseRate = baseLabelRates[dominant.label] || 0;
        const confidence = dominant.confidence;
        const lift = baseRate > 0 ? confidence / baseRate : 0;
        const score = (confidence * 0.65) + (Math.min(lift, 3) * 0.25) + (Math.log10(stat.total + 1) * 0.1);
        return {
          condition: `${aKey}=${stat.aVal} & ${bKey}=${stat.bVal}`,
          featureA: aKey,
          valueA: stat.aVal,
          featureB: bKey,
          valueB: stat.bVal,
          total: stat.total,
          dominantLabel: dominant.label,
          confidence: roundNumber(confidence, 4),
          lift: roundNumber(lift, 4),
          score: roundNumber(score, 4),
          additive: stat.counts.additive,
          replacive: stat.counts.replacive,
          none: stat.counts.none,
        };
      })
      .filter((rule) => rule.confidence >= 0.72)
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return b.total - a.total;
      });

    topByPair[`${aKey}+${bKey}`] = rules.slice(0, 8);
    allRules.push(...rules);
  });

  allRules.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.total - a.total;
  });

  return {
    minSupport,
    ruleCount: allRules.length,
    topRules: allRules.slice(0, 50),
    topByPair,
  };
}

function runBoundaryPatternScout(rows) {
  const targetFeatures = STRUCTURAL_FEATURES;
  const transitions = [];

  targetFeatures.forEach((targetFeature) => {
    const groupingFeatures = STRUCTURAL_FEATURES.filter((feature) => feature !== targetFeature);
    const groups = new Map();
    rows.forEach((row) => {
      const groupKey = groupingFeatures
        .map((feature) => `${feature}=${row[feature] === "" ? "(zero)" : row[feature]}`)
        .join("|");
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey).push(row);
    });

    const transitionMap = new Map();
    groups.forEach((groupRows) => {
      const byTargetValue = new Map();
      groupRows.forEach((row) => {
        const value = row[targetFeature] === "" ? "(zero)" : String(row[targetFeature]);
        byTargetValue.set(value, row);
      });
      const entries = [...byTargetValue.entries()];
      for (let i = 0; i < entries.length; i += 1) {
        for (let j = i + 1; j < entries.length; j += 1) {
          const [valueA, rowA] = entries[i];
          const [valueB, rowB] = entries[j];
          if (rowA.label === rowB.label) {
            continue;
          }
          const valuePair = [valueA, valueB].sort();
          const labelPair = [rowA.label, rowB.label].sort();
          const key = `${targetFeature}|${valuePair[0]}|${valuePair[1]}|${labelPair[0]}|${labelPair[1]}`;
          if (!transitionMap.has(key)) {
            transitionMap.set(key, {
              feature: targetFeature,
              valueA: valuePair[0],
              valueB: valuePair[1],
              labelA: labelPair[0],
              labelB: labelPair[1],
              count: 0,
              samples: [],
            });
          }
          const transition = transitionMap.get(key);
          transition.count += 1;
          if (transition.samples.length < 4) {
            transition.samples.push({
              formA: rowA.form,
              labelA: rowA.label,
              formB: rowB.form,
              labelB: rowB.label,
            });
          }
        }
      }
    });
    transitions.push(...transitionMap.values());
  });

  transitions.sort((a, b) => b.count - a.count);
  return {
    transitionCount: transitions.length,
    topTransitions: transitions.slice(0, 60),
  };
}

function runPatternAgents(rows) {
  const base = getBaseLabelRates(rows);
  const singleFeatureScout = runSingleFeaturePatternScout(rows, base.rates);
  const pairRuleScout = runPairRulePatternScout(rows, base.rates);
  const boundaryScout = runBoundaryPatternScout(rows);
  return {
    dataset: {
      totalRows: base.total,
      baseLabelCounts: base.counts,
      baseLabelRates: {
        additive: roundNumber(base.rates.additive, 4),
        replacive: roundNumber(base.rates.replacive, 4),
        none: roundNumber(base.rates.none, 4),
      },
    },
    singleFeatureScout,
    pairRuleScout,
    boundaryScout,
  };
}

function buildPairwiseUnityMetrics(rows, getKey, getOutcome) {
  let trueUnity = 0;
  let falseUnity = 0;
  let trueSeparation = 0;
  let falseSeparation = 0;
  const falseUnityExamples = [];
  const falseSeparationExamples = [];

  for (let i = 0; i < rows.length; i += 1) {
    const rowA = rows[i];
    const keyA = getKey(rowA);
    const outcomeA = getOutcome(rowA);
    for (let j = i + 1; j < rows.length; j += 1) {
      const rowB = rows[j];
      const keyB = getKey(rowB);
      const outcomeB = getOutcome(rowB);
      const sameKey = keyA === keyB;
      const sameOutcome = outcomeA === outcomeB;
      if (sameKey && sameOutcome) {
        trueUnity += 1;
      } else if (sameKey && !sameOutcome) {
        falseUnity += 1;
        if (falseUnityExamples.length < 12) {
          falseUnityExamples.push({
            key: keyA,
            a: { form: rowA.form, outcome: outcomeA, sourceClass: rowA.wiPolicySourceClass || "" },
            b: { form: rowB.form, outcome: outcomeB, sourceClass: rowB.wiPolicySourceClass || "" },
          });
        }
      } else if (!sameKey && sameOutcome) {
        falseSeparation += 1;
        if (falseSeparationExamples.length < 12) {
          falseSeparationExamples.push({
            outcome: outcomeA,
            a: { form: rowA.form, key: keyA },
            b: { form: rowB.form, key: keyB },
          });
        }
      } else {
        trueSeparation += 1;
      }
    }
  }

  const totalPairs = Math.max(0, (rows.length * (rows.length - 1)) / 2);
  const safeRate = (value) => (totalPairs ? roundNumber(value / totalPairs, 4) : 0);
  return {
    totalPairs,
    trueUnity,
    falseUnity,
    trueSeparation,
    falseSeparation,
    trueUnityRate: safeRate(trueUnity),
    falseUnityRate: safeRate(falseUnity),
    trueSeparationRate: safeRate(trueSeparation),
    falseSeparationRate: safeRate(falseSeparation),
    falseUnityExamples,
    falseSeparationExamples,
  };
}

function buildKeyPurityMetrics(rows, getKey, getOutcome) {
  const byKey = new Map();
  rows.forEach((row) => {
    const key = String(getKey(row) || "");
    const outcome = String(getOutcome(row) || "unknown");
    if (!byKey.has(key)) {
      byKey.set(key, {
        total: 0,
        outcomeCounts: {},
        samples: [],
      });
    }
    const bucket = byKey.get(key);
    bucket.total += 1;
    bucket.outcomeCounts[outcome] = (bucket.outcomeCounts[outcome] || 0) + 1;
    if (bucket.samples.length < 8) {
      bucket.samples.push({
        form: row.form,
        outcome,
        sourceClass: row.wiPolicySourceClass || "",
      });
    }
  });

  const entries = [...byKey.entries()].map(([key, bucket]) => {
    const sortedOutcomes = Object.entries(bucket.outcomeCounts)
      .sort((a, b) => b[1] - a[1]);
    const mixed = sortedOutcomes.length > 1;
    const topCount = sortedOutcomes[0]?.[1] || 0;
    const purity = bucket.total ? topCount / bucket.total : 0;
    return {
      key,
      total: bucket.total,
      outcomeCounts: bucket.outcomeCounts,
      mixed,
      purity: roundNumber(purity, 4),
      samples: bucket.samples,
    };
  });

  const mixedEntries = entries.filter((entry) => entry.mixed);
  const pureEntries = entries.filter((entry) => !entry.mixed);
  mixedEntries.sort((a, b) => {
    if (a.purity !== b.purity) {
      return a.purity - b.purity;
    }
    return b.total - a.total;
  });

  return {
    uniqueKeys: entries.length,
    pureKeys: pureEntries.length,
    mixedKeys: mixedEntries.length,
    mixedKeyRate: roundNumber(mixedEntries.length / Math.max(1, entries.length), 4),
    mixedKeyExamples: mixedEntries.slice(0, 20),
  };
}

function countBy(rows, selector) {
  const counts = {};
  rows.forEach((row) => {
    const value = String(selector(row) || "");
    counts[value] = (counts[value] || 0) + 1;
  });
  return counts;
}

function runWiPolicySuperpositionAudit(rows) {
  const scopedRows = rows.filter((row) => (
    (row.form.endsWith("awi") || row.form.endsWith("iwi"))
    && row.wiPolicyDesuperposeKey
  ));
  const coarseOutcome = (row) => row.label || "none";
  const fineOutcome = (row) => row.typeOneOutcome || "none";
  const keySelector = (row) => row.wiPolicyDesuperposeKey || "";

  return {
    scope: {
      rowCount: scopedRows.length,
      forms: "...awi/...iwi",
      keyField: "wiPolicyDesuperposeKey",
    },
    families: countBy(scopedRows, (row) => row.wiPolicyStockFamily || "unknown"),
    coarse: {
      outcomes: countBy(scopedRows, coarseOutcome),
      keyQuality: buildKeyPurityMetrics(scopedRows, keySelector, coarseOutcome),
      pairwise: buildPairwiseUnityMetrics(scopedRows, keySelector, coarseOutcome),
    },
    fine: {
      outcomes: countBy(scopedRows, fineOutcome),
      keyQuality: buildKeyPurityMetrics(scopedRows, keySelector, fineOutcome),
      pairwise: buildPairwiseUnityMetrics(scopedRows, keySelector, fineOutcome),
    },
  };
}

function run() {
  const context = createContext();
  const derivRules = JSON.parse(fs.readFileSync(DERIV_RULES_PATH, "utf8"));
  bootstrap(context, derivRules);

  const candidates = generateCandidates(context);
  const baselineByForm = new Map();
  candidates.forEach((candidate) => {
    baselineByForm.set(candidate.form, classifyIntransitiveICausative(context, candidate.form));
  });

  const matrixOnlyRules = deepClone(derivRules);
  if (
    matrixOnlyRules
    && matrixOnlyRules.config
    && matrixOnlyRules.config.causative
    && matrixOnlyRules.config.causative.intransitiveEndsWithI
    && matrixOnlyRules.config.causative.intransitiveEndsWithI.pairBias
  ) {
    matrixOnlyRules.config.causative.intransitiveEndsWithI.pairBias.enabled = false;
  }
  bootstrap(context, matrixOnlyRules);

  const matrixOnlyByForm = new Map();
  candidates.forEach((candidate) => {
    matrixOnlyByForm.set(candidate.form, classifyIntransitiveICausative(context, candidate.form));
  });

  const summary = buildMatrixAndAgents(candidates, baselineByForm, matrixOnlyByForm);
  const patternAgents = runPatternAgents(summary.rows);
  const superpositionAudit = runWiPolicySuperpositionAudit(summary.rows);
  const unpatternedUnion = new Set();

  summary.agents.fallbackScout.samples.forEach((sample) => unpatternedUnion.add(sample.form));
  summary.agents.confidenceScout.samples.forEach((sample) => unpatternedUnion.add(sample.form));
  summary.agents.disagreementScout.samples.forEach((sample) => unpatternedUnion.add(sample.form));
  patternAgents.boundaryScout.topTransitions.forEach((transition) => {
    transition.samples.forEach((sample) => {
      unpatternedUnion.add(sample.formA);
      unpatternedUnion.add(sample.formB);
    });
  });

  const report = {
    generatedAt: new Date().toISOString(),
    pipeline: "intransitive-i > causative (type-one)",
    matrixDefinition: {
      axes: {
        axis1: "firstOnsetManner",
        axis2: "penultimateNucleus+penultimateCoda",
        axis3: "finalOnsetManner",
      },
      constraints: {
        syllableCountMax: MAX_SYLLABLES,
        generatedForMatrixAt: 3,
        requireValidSyllableForms: true,
        template: "S1 + S2 + S3 where S3 ends with i",
        S1: "First onset set x fixed nucleus a",
        S2: "Penultimate onset set x nucleus in a/e/i/u x coda in none/j/l",
        S3: "Final onset set x nucleus i",
      },
      inventories: {
        firstOnsets: FIRST_ONSETS,
        penultimateOnsets: PENULT_ONSETS,
        penultimateNuclei: PENULT_NUCLEI,
        penultimateCodas: PENULT_CODAS,
        finalOnsets: FINAL_ONSETS,
      },
    },
    totals: {
      candidatesGenerated: candidates.length,
      additive: summary.labelCounts.additive,
      replacive: summary.labelCounts.replacive,
      none: summary.labelCounts.none,
      other: summary.labelCounts.other,
      sourceCounts: summary.sourceCounts,
      unpatternedSampleUnionSize: unpatternedUnion.size,
    },
    agents: summary.agents,
    patternAgents,
    superpositionAudit,
    matrix3d: summary.matrix3d,
  };

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

  const compact = {
    reportPath: REPORT_PATH,
    candidatesGenerated: report.totals.candidatesGenerated,
    labels: {
      additive: report.totals.additive,
      replacive: report.totals.replacive,
      none: report.totals.none,
      other: report.totals.other,
    },
    sources: report.totals.sourceCounts,
    agents: {
      fallbackScout: report.agents.fallbackScout.count,
      disagreementScout: report.agents.disagreementScout.count,
      confidenceScout: report.agents.confidenceScout.count,
      entropyScout: report.agents.entropyScout.count,
    },
    patternAgents: {
      singleFeatureStrongRules: report.patternAgents.singleFeatureScout.strongRuleCount,
      singleFeatureAmbiguousHotspots: report.patternAgents.singleFeatureScout.ambiguousHotspotCount,
      pairRules: report.patternAgents.pairRuleScout.ruleCount,
      boundaryTransitions: report.patternAgents.boundaryScout.transitionCount,
    },
    superpositionAudit: {
      scopedRows: report.superpositionAudit.scope.rowCount,
      coarseFalseUnity: report.superpositionAudit.coarse.pairwise.falseUnity,
      coarseFalseSeparation: report.superpositionAudit.coarse.pairwise.falseSeparation,
      fineFalseUnity: report.superpositionAudit.fine.pairwise.falseUnity,
      fineFalseSeparation: report.superpositionAudit.fine.pairwise.falseSeparation,
    },
    sampleUnpatternedUnionSize: report.totals.unpatternedSampleUnionSize,
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
