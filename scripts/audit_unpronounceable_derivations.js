#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const { createVmContext } = require("./lib/vm_harness");

const ROOT = path.resolve(__dirname, "..");
const SCRIPT_PATH = path.join(ROOT, "script.js");
const REPORT_PATH = path.join(ROOT, "reports", "unpronounceable_derivation_audit.json");

const STATIC_LOADERS = [
  ["applyStaticConstants", "static_constants.json"],
  ["applyStaticLabels", "static_labels.json"],
  ["applyStaticDerivationalRules", "static_derivational_rules.json"],
  ["applyStaticValenceNeutral", "static_valence_neutral.json"],
  ["applyStaticOptions", "static_options.json"],
  ["applyStaticGroups", "static_groups.json"],
  ["applyStaticOrders", "static_orders.json"],
  ["applyStaticRules", "static_rules.json"],
  ["applyStaticParseRules", "static_parse_rules.json"],
  ["applyStaticDirectionalRules", "static_directional_rules.json"],
  ["applyStaticAllomorphyRules", "static_allomorphy_rules.json"],
  ["applyStaticPhonology", "static_phonology.json"],
  ["applyStaticModes", "static_modes.json"],
  ["applyStaticMisc", "static_misc.json"],
  ["applyStaticSuppletives", "static_suppletives.json"],
  ["applyStaticRedup", "static_redup.json"],
  ["applyStaticSuppletivePaths", "static_suppletive_paths.json"],
];

const LEXICON_FILES = [
  path.join(ROOT, "data", "basic-data.csv"),
  path.join(ROOT, "data", "data.csv"),
];

function loadStaticData(context) {
  STATIC_LOADERS.forEach(([fnName, filename]) => {
    const fn = context[fnName];
    if (typeof fn !== "function") {
      return;
    }
    const payload = JSON.parse(
      fs.readFileSync(path.join(ROOT, "data", filename), "utf8"),
    );
    fn(payload);
  });
}

function loadLexiconRows(context) {
  const rows = [];
  const seen = new Set();
  const parseCSVRows = context.parseCSVRows;
  const parseVerbEntryToken = context.parseVerbEntryToken;
  const parseVerbInput = context.parseVerbInput;
  const normalizeRuleBase = context.normalizeRuleBase;
  if (
    typeof parseCSVRows !== "function"
    || typeof parseVerbEntryToken !== "function"
    || typeof parseVerbInput !== "function"
  ) {
    throw new Error("Lexicon parsing helpers are unavailable");
  }

  LEXICON_FILES.forEach((csvPath) => {
    const text = fs.readFileSync(csvPath, "utf8");
    parseCSVRows(text).forEach((row, index) => {
      const firstCell = row[0] ? String(row[0]).trim() : "";
      if (!firstCell || index === 0) {
        return;
      }
      const entry = parseVerbEntryToken(firstCell);
      const addVariant = (isTransitive) => {
        const rawInput = isTransitive ? `-${entry.base}` : entry.base;
        let parsedVerb = null;
        try {
          parsedVerb = parseVerbInput(rawInput);
        } catch (error) {
          return;
        }
        if (!parsedVerb) {
          return;
        }
        const keyBase = normalizeRuleBase(
          parsedVerb.canonical?.ruleBase
          || parsedVerb.analysisVerb
          || parsedVerb.verb
          || rawInput,
        );
        const dedupeKey = `${isTransitive ? "t" : "i"}|${keyBase}`;
        if (seen.has(dedupeKey)) {
          return;
        }
        seen.add(dedupeKey);
        rows.push({
          lexeme: entry.base,
          rawInput,
          isTransitive,
          sourceFile: path.relative(ROOT, csvPath),
          parsedVerb,
        });
      };

      if (entry.intransitive) {
        addVariant(false);
      }
      if (entry.transitive) {
        addVariant(true);
      }
    });
  });

  return rows;
}

function buildPatientivoArgs(row) {
  const parsed = row.parsedVerb || {};
  return {
    verb: parsed.verb || row.rawInput,
    analysisVerb: parsed.analysisVerb || parsed.verb || row.lexeme,
    rawAnalysisVerb: parsed.rawAnalysisVerb || "",
    isTransitive: row.isTransitive === true,
    directionalPrefix: parsed.directionalPrefix || "",
    boundPrefix: parsed.boundPrefix || "",
    boundPrefixes: Array.isArray(parsed.boundPrefixes) ? parsed.boundPrefixes : [],
    boundExplicitFlags: Array.isArray(parsed.boundExplicitFlags) ? parsed.boundExplicitFlags : [],
    directionalPrefixFromSlash: parsed.directionalPrefixFromSlash || "",
    sourceSplitPrefix: parsed.sourceSplitPrefix || "",
    sourceCompositeBase: parsed.sourceCompositeBase || "",
    isYawi: parsed.isYawi === true,
    hasImpersonalTaPrefix: parsed.hasImpersonalTaPrefix === true,
    hasOptionalSupportiveI: parsed.hasOptionalSupportiveI === true,
    hasSlashMarker: parsed.hasSlashMarker === true,
    hasSuffixSeparator: parsed.hasSuffixSeparator === true,
    hasLeadingDash: parsed.hasLeadingDash === true,
    hasBoundMarker: parsed.hasBoundMarker === true,
    hasCompoundMarker: parsed.hasCompoundMarker === true,
    hasNonspecificValence: parsed.hasNonspecificValence === true,
    exactBaseVerb: parsed.exactBaseVerb || "",
    suppletiveStemSet: null,
    rootPlusYaBase: parsed.rootPlusYaBase || "",
    rootPlusYaBasePronounceable: parsed.rootPlusYaBasePronounceable || "",
  };
}

function hasFinalConsonantCluster(context, value) {
  const letters = context.splitVerbLetters(String(value || ""));
  if (letters.length < 2) {
    return false;
  }
  const last = letters[letters.length - 1];
  const prev = letters[letters.length - 2];
  return context.isVerbLetterConsonant(last) && context.isVerbLetterConsonant(prev);
}

function makeFindingRecorder(findings) {
  const seen = new Set();
  return (finding) => {
    const key = [
      finding.category,
      finding.family,
      finding.input,
      finding.output,
      finding.patientivoSource || "",
      finding.nonactiveSuffix || "",
    ].join("|");
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    findings.push(finding);
  };
}

function buildBaseFinding(row, family, output, extra = {}) {
  const parsed = row.parsedVerb || {};
  return {
    family,
    input: row.rawInput,
    lexeme: row.lexeme,
    transitivity: row.isTransitive ? "transitive" : "intransitive",
    sourceFile: row.sourceFile,
    output,
    canonicalRuleBase: parsed.canonical?.ruleBase || parsed.analysisVerb || parsed.verb || "",
    rootPlusYaBase: parsed.rootPlusYaBase || "",
    ...extra,
  };
}

function auditRow(context, row, recordFinding, errors) {
  const parsed = row.parsedVerb || {};
  const analysisVerb = parsed.analysisVerb || parsed.verb || row.lexeme;
  const canonicalRuleBase = context.resolveNonactiveRuleBase(analysisVerb, parsed);
  const rootPlusYaDropAllowed = context.shouldDropYaInRootPlusYaNonactive(
    canonicalRuleBase,
    {
      isTransitive: row.isTransitive === true,
      isYawi: parsed.isYawi === true,
      isWeya: parsed.isWeya === true,
      rootPlusYaBase: parsed.rootPlusYaBase || "",
    },
  );
  const rootPlusYaBase = parsed.rootPlusYaBase || "";
  const rootPlusYaVowelCount = rootPlusYaBase
    ? context.getTotalVowelCount(context.getNonReduplicatedRoot(rootPlusYaBase) || rootPlusYaBase)
    : 0;

  const checkSurface = (family, output, extra = {}) => {
    if (!output) {
      return;
    }
    if (!context.isSyllableSequencePronounceable(output)) {
      recordFinding({
        category: "unpronounceable_surface",
        ...buildBaseFinding(row, family, output, extra),
      });
    }
  };

  try {
    const nonactiveOptions = context.getNonactiveDerivationOptions(
      canonicalRuleBase,
      canonicalRuleBase,
      {
        isTransitive: row.isTransitive === true,
        isYawi: parsed.isYawi === true,
        isWeya: parsed.isWeya === true,
        ruleBase: canonicalRuleBase,
        rootPlusYaBase,
      },
    ) || [];
    nonactiveOptions.forEach((option) => {
      const stem = String(option?.stem || "");
      const suffix = String(option?.suffix || "");
      checkSurface("nonactive", stem, {
        nonactiveSuffix: suffix,
      });
      if (
        suffix === "lu"
        && rootPlusYaBase
        && stem === `${rootPlusYaBase}lu`
        && !rootPlusYaDropAllowed
      ) {
        recordFinding({
          category: "short_root_plus_ya_nonactive_lu",
          ...buildBaseFinding(row, "nonactive", stem, {
            nonactiveSuffix: suffix,
            rootPlusYaVowelCount,
          }),
        });
      }
    });
  } catch (error) {
    errors.push({
      input: row.rawInput,
      family: "nonactive",
      error: error && error.stack ? error.stack : String(error),
    });
  }

  try {
    const causative = context.applyCausativeDerivation({
      isCausative: true,
      verb: parsed.verb || row.rawInput,
      analysisVerb,
      objectPrefix: "",
      parsedVerb: parsed,
      directionalPrefix: parsed.directionalPrefix || "",
      isYawi: parsed.isYawi === true,
      suppletiveStemSet: null,
    });
    const stems = Array.isArray(causative?.causativeAllStems) ? causative.causativeAllStems : [];
    stems.forEach((stem) => checkSurface("causative", String(stem || "")));
  } catch (error) {
    errors.push({
      input: row.rawInput,
      family: "causative",
      error: error && error.stack ? error.stack : String(error),
    });
  }

  try {
    const applicative = context.applyApplicativeDerivation({
      isApplicative: true,
      verb: parsed.verb || row.rawInput,
      analysisVerb,
      objectPrefix: "",
      parsedVerb: parsed,
      directionalPrefix: parsed.directionalPrefix || "",
      isYawi: parsed.isYawi === true,
      suppletiveStemSet: null,
    });
    const stems = Array.isArray(applicative?.applicativeAllStems) ? applicative.applicativeAllStems : [];
    stems.forEach((stem) => checkSurface("applicative", String(stem || "")));
  } catch (error) {
    errors.push({
      input: row.rawInput,
      family: "applicative",
      error: error && error.stack ? error.stack : String(error),
    });
  }

  const patientivoArgs = buildPatientivoArgs(row);
  [
    ["patientivo_nonactive", "nonactive", context.buildPatientivoDerivations],
    ["patientivo_perfectivo", "perfectivo", context.buildPatientivoPerfectivoDerivations],
    ["patientivo_imperfectivo", "imperfectivo", context.buildPatientivoImperfectivoDerivations],
    ["patientivo_tronco", "tronco-verbal", context.buildPatientivoTroncoDerivations],
  ].forEach(([family, sourceId, fn]) => {
    if (typeof fn !== "function") {
      return;
    }
    try {
      const outputs = fn(patientivoArgs) || [];
      outputs.forEach((entry) => {
        const stem = String(entry?.verb || "");
        const subjectSuffix = String(entry?.subjectSuffix || "");
        const output = `${stem}${subjectSuffix}`;
        checkSurface(family, output, {
          patientivoSource: sourceId,
          stem,
          subjectSuffix,
        });
        if (
          family === "patientivo_tronco"
          && /(?:awi|iwi)$/i.test(canonicalRuleBase)
          && !subjectSuffix
          && hasFinalConsonantCluster(context, stem)
        ) {
          recordFinding({
            category: "awi_iwi_tronco_cluster",
            ...buildBaseFinding(row, family, output, {
              patientivoSource: sourceId,
              stem,
              subjectSuffix,
            }),
          });
        }
      });
    } catch (error) {
      errors.push({
        input: row.rawInput,
        family,
        error: error && error.stack ? error.stack : String(error),
      });
    }
  });
}

function summarizeFindings(findings) {
  const byCategory = {};
  const byFamily = {};
  findings.forEach((finding) => {
    byCategory[finding.category] = (byCategory[finding.category] || 0) + 1;
    byFamily[finding.family] = (byFamily[finding.family] || 0) + 1;
  });
  return { byCategory, byFamily };
}

function main() {
  const { context } = createVmContext({ rootDir: ROOT, scriptPath: SCRIPT_PATH });
  loadStaticData(context);
  if (typeof context.setSelectedNonactiveSuffix === "function") {
    context.setSelectedNonactiveSuffix(null);
  }

  const lexiconRows = loadLexiconRows(context);
  const findings = [];
  const errors = [];
  const recordFinding = makeFindingRecorder(findings);

  lexiconRows.forEach((row) => auditRow(context, row, recordFinding, errors));

  findings.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    if (a.family !== b.family) {
      return a.family.localeCompare(b.family);
    }
    if (a.input !== b.input) {
      return a.input.localeCompare(b.input);
    }
    return a.output.localeCompare(b.output);
  });

  const summary = summarizeFindings(findings);
  const report = {
    generatedAt: new Date().toISOString(),
    reportPath: REPORT_PATH,
    scope: {
      sourceFiles: LEXICON_FILES.map((filePath) => path.relative(ROOT, filePath)),
      lexiconRows: lexiconRows.length,
      auditedFamilies: [
        "nonactive",
        "causative",
        "applicative",
        "patientivo_nonactive",
        "patientivo_perfectivo",
        "patientivo_imperfectivo",
        "patientivo_tronco",
      ],
      findingCategories: [
        "unpronounceable_surface",
        "short_root_plus_ya_nonactive_lu",
        "awi_iwi_tronco_cluster",
      ],
    },
    totals: {
      findings: findings.length,
      errors: errors.length,
      ...summary,
    },
    findings,
    errors,
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  process.stdout.write(`${JSON.stringify({
    reportPath: REPORT_PATH,
    lexiconRows: report.scope.lexiconRows,
    findings: report.totals.findings,
    errors: report.totals.errors,
    byCategory: report.totals.byCategory,
    byFamily: report.totals.byFamily,
  }, null, 2)}\n`);
}

main();
