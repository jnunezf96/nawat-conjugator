#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { createVmContext } = require("./lib/vm_harness");

const ROOT = path.resolve(__dirname, "..");
const REPORT_JSON_PATH = path.join(ROOT, "reports", "operation_derived_nonactive_collapse_audit.json");
const REPORT_MD_PATH = path.join(ROOT, "reports", "operation_derived_nonactive_collapse_audit.md");

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

const EXTRA_RUNTIME_FILES = [
  path.join(ROOT, "pret_universal_context.js"),
  path.join(ROOT, "pret_universal_engine.js"),
];

const CANONICAL_LEXICON_PATH = path.join(ROOT, "data", "basic-data.csv");
const SCAN_LEXICON_FILES = [
  path.join(ROOT, "data", "basic-data.csv"),
  path.join(ROOT, "data", "data.csv"),
];

const DERIVATION_TYPES = ["causative", "applicative"];

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

function loadExtraRuntimeFiles(context) {
  EXTRA_RUNTIME_FILES.forEach((filePath) => {
    vm.runInContext(
      fs.readFileSync(filePath, "utf8"),
      context,
      { filename: filePath },
    );
  });
}

function loadCanonicalLexicon(context) {
  const canonicalCsv = fs.readFileSync(CANONICAL_LEXICON_PATH, "utf8");
  context.__CANONICAL_LEXICON_TEXT__ = canonicalCsv;
  vm.runInContext(
    `
      VERB_DISAMBIGUATION_BASE_INFO = buildVerbBaseInfo(parseVerbLexiconCSV(__CANONICAL_LEXICON_TEXT__));
      BASIC_DATA_CANONICAL_MAP = buildCanonicalVerbMapFromCSV(__CANONICAL_LEXICON_TEXT__);
      if (typeof resetDerivationalLookupCaches === "function") {
        resetDerivationalLookupCaches();
      }
    `,
    context,
  );
  delete context.__CANONICAL_LEXICON_TEXT__;
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
    || typeof normalizeRuleBase !== "function"
  ) {
    throw new Error("Lexicon parsing helpers are unavailable");
  }

  SCAN_LEXICON_FILES.forEach((csvPath) => {
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
        } catch (_error) {
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

function uniqueNonEmpty(values = []) {
  return Array.from(new Set((Array.isArray(values) ? values : []).filter(Boolean)));
}

function arraysEqual(left = [], right = []) {
  if (left.length !== right.length) {
    return false;
  }
  return left.every((value, index) => value === right[index]);
}

function intersectValues(left = [], right = []) {
  const rightSet = new Set(Array.isArray(right) ? right : []);
  return uniqueNonEmpty(left).filter((value) => rightSet.has(value));
}

function normalizeAuditStem(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

function shouldExemptCausativeIToIaOverlap(row, derivationType, forwardStems = []) {
  if (derivationType !== "causative" || row?.isTransitive) {
    return false;
  }
  const base = normalizeAuditStem(
    row?.parsedVerb?.canonicalRuleBase
    || row?.parsedVerb?.analysisVerb
    || row?.lexeme
    || row?.rawInput,
  );
  if (!base || !base.endsWith("i")) {
    return false;
  }
  const expectedIaStem = `${base}a`;
  return uniqueNonEmpty(forwardStems).some((stem) => (
    normalizeAuditStem(stem) === expectedIaStem
  ));
}

function getDerivedTargetSlots(context, parsedVerb, derivationType) {
  const baseObjectSlots = typeof context.getBaseObjectSlots === "function"
    ? Number(context.getBaseObjectSlots(parsedVerb) || 0)
    : (parsedVerb?.isMarkedTransitive ? 1 : 0);
  const derivationDelta = typeof context.getDerivationValencyDelta === "function"
    ? Number(context.getDerivationValencyDelta(derivationType) || 0)
    : 0;
  return Math.max(0, baseObjectSlots + derivationDelta);
}

function buildForwardDerivation(context, row, derivationType, objectPrefix) {
  const parsedVerb = row.parsedVerb || {};
  const parsedWithDerivation = {
    ...parsedVerb,
    derivationType,
    derivationValencyDelta: typeof context.getDerivationValencyDelta === "function"
      ? Number(context.getDerivationValencyDelta(derivationType) || 0)
      : 0,
  };
  const options = context.buildNonactiveDerivationOptions({
    verb: parsedWithDerivation.verb || "",
    analysisVerb: parsedWithDerivation.analysisVerb || parsedWithDerivation.verb || "",
    objectPrefix,
    parsedVerb: parsedWithDerivation,
    directionalPrefix: parsedWithDerivation.directionalPrefix || "",
    isYawi: parsedWithDerivation.isYawi === true,
    suppletiveStemSet: typeof context.getSuppletiveStemSet === "function"
      ? context.getSuppletiveStemSet(parsedWithDerivation)
      : null,
  });
  const result = context.applySelectedForwardDerivation({
    derivationType,
    derivationOptions: options,
    uniqueStems: context.uniqueNonEmptyValues || uniqueNonEmpty,
  });
  const config = context.getForwardDerivationConfig(derivationType);
  const stems = uniqueNonEmpty(config?.resultField ? result?.[config.resultField] : null);
  return {
    result,
    stems,
    blocked: result?.blocked === true,
    isYawi: result?.isYawi === true,
  };
}

function buildIndependentDerivedNonactiveStems(context, forwardStems, {
  objectPrefix = "",
  targetSlots = 0,
  isYawi = false,
} = {}) {
  return uniqueNonEmpty(forwardStems.map((stem) => {
    const resolved = context.resolveDerivedNonactiveSelectionEntry({
      stem,
      parsedVerb: null,
      objectPrefix,
      nonactiveIsTransitive: targetSlots > 0,
      isYawi,
      forceAllNonactiveOptions: true,
    });
    return context.getPrimaryNonactiveSelectionStem(resolved?.entry || resolved || null);
  }));
}

function buildPipelineSurface(context, row, derivationType, objectPrefix, targetSlots) {
  const result = context.getCachedSilentGenerateWord({
    silent: true,
    skipValidation: true,
    override: {
      verb: row.rawInput,
      parsedVerb: row.parsedVerb,
      tense: "presente",
      tenseMode: "verbo",
      derivationType,
      derivationMode: "nonactive",
      voiceMode: targetSlots > 0 ? "passive-impersonal" : "active",
      subjectPrefix: "",
      subjectSuffix: "",
      objectPrefix,
    },
  }) || {};
  return {
    result: String(result.result || ""),
    surfaceForms: Array.isArray(result.surfaceForms) ? result.surfaceForms : [],
  };
}

function classifyCase(actual, expected, sourceReference) {
  const overlap = intersectValues(actual, sourceReference);
  if (!actual.length) {
    return { status: "no_actual_nonactive", overlap };
  }
  if (arraysEqual(actual, expected)) {
    return overlap.length
      ? { status: "overlaps_source_direct", overlap }
      : { status: "aligned", overlap };
  }
  const sourceReferenceSet = new Set(sourceReference);
  const expectedSet = new Set(expected);
  const collapsedToSource = actual.length > 0
    && actual.every((stem) => sourceReferenceSet.has(stem))
    && expected.some((stem) => !sourceReferenceSet.has(stem))
    && actual.some((stem) => !expectedSet.has(stem));
  return collapsedToSource
    ? { status: "collapsed_to_source", overlap }
    : { status: "mismatch", overlap };
}

function analyzeRow(context, row, derivationType) {
  const targetSlots = getDerivedTargetSlots(context, row.parsedVerb, derivationType);
  const objectPrefix = targetSlots > 0 ? "ki" : "";
  const forward = buildForwardDerivation(context, row, derivationType, objectPrefix);
  if (forward.blocked || !forward.stems.length) {
    return {
      status: "no_forward",
      lexeme: row.lexeme,
      rawInput: row.rawInput,
      derivationType,
      sourceFile: row.sourceFile,
      targetSlots,
      objectPrefix,
      forwardStems: forward.stems,
    };
  }

  const actualMetadata = context.getParsedVerbNonactiveStemMetadata(row.parsedVerb, {
    derivationType,
    objectPrefix,
  }) || {};
  const actualDerivedNonactiveStems = uniqueNonEmpty(actualMetadata.derivedNonactiveStems);
  const sourceReferenceMetadata = context.getParsedVerbNonactiveStemMetadata(row.parsedVerb, {
    derivationType: "direct",
    objectPrefix,
  }) || {};
  const sourceReferenceStems = uniqueNonEmpty(
    sourceReferenceMetadata.nonactiveAllStems
    || sourceReferenceMetadata.nonactiveStems,
  );
  const expectedDerivedNonactiveStems = buildIndependentDerivedNonactiveStems(
    context,
    forward.stems,
    {
      objectPrefix,
      targetSlots,
      isYawi: forward.isYawi,
    },
  );
  const classification = classifyCase(
    actualDerivedNonactiveStems,
    expectedDerivedNonactiveStems,
    sourceReferenceStems,
  );
  const exemptCausativeIToIaOverlap = (
    classification.status === "overlaps_source_direct"
    && shouldExemptCausativeIToIaOverlap(row, derivationType, forward.stems)
  );
  const surface = buildPipelineSurface(
    context,
    row,
    derivationType,
    objectPrefix,
    targetSlots,
  );

  return {
    status: exemptCausativeIToIaOverlap ? "aligned" : classification.status,
    overlapWithSourceReference: classification.overlap,
    exemptionRule: exemptCausativeIToIaOverlap
      ? "causative_intransitive_i_to_ia"
      : null,
    lexeme: row.lexeme,
    rawInput: row.rawInput,
    derivationType,
    sourceFile: row.sourceFile,
    transitivity: row.isTransitive ? "transitive" : "intransitive",
    targetSlots,
    objectPrefix,
    forwardStems: forward.stems,
    expectedDerivedNonactiveStems,
    actualDerivedNonactiveStems,
    sourceReferenceStems,
    surfaceResult: surface.result,
    surfaceForms: surface.surfaceForms,
  };
}

function buildMarkdownReport(report) {
  const summary = report.summary || {};
  const overlapRows = Array.isArray(report.findings)
    ? report.findings.filter((entry) => entry.status === "overlaps_source_direct")
    : [];
  const collapseRows = Array.isArray(report.findings)
    ? report.findings.filter((entry) => entry.status === "collapsed_to_source")
    : [];
  const mismatchRows = Array.isArray(report.findings)
    ? report.findings.filter((entry) => entry.status === "mismatch")
    : [];
  const renderRow = (entry) => `| ${entry.lexeme} | ${entry.rawInput} | ${entry.derivationType} | ${entry.forwardStems.join(" / ")} | ${entry.expectedDerivedNonactiveStems.join(" / ")} | ${entry.actualDerivedNonactiveStems.join(" / ")} | ${entry.sourceReferenceStems.join(" / ")} | ${entry.overlapWithSourceReference.join(" / ")} | ${entry.surfaceResult} |`;
  const overlapTable = overlapRows.length
    ? [
        "| Lexeme | Input | Derivation | Forward Stems | Expected Derived Nonactive | Actual Pipeline | Source Reference | Overlap | Surface |",
        "|---|---|---|---|---|---|---|---|---|",
        ...overlapRows.map(renderRow),
      ].join("\n")
    : "_None_";
  const collapseTable = collapseRows.length
    ? [
        "| Lexeme | Input | Derivation | Forward Stems | Expected Derived Nonactive | Actual Pipeline | Source Reference | Overlap | Surface |",
        "|---|---|---|---|---|---|---|---|---|",
        ...collapseRows.map(renderRow),
      ].join("\n")
    : "_None_";
  const mismatchTable = mismatchRows.length
    ? [
        "| Lexeme | Input | Derivation | Forward Stems | Expected Derived Nonactive | Actual Pipeline | Source Reference | Overlap | Surface |",
        "|---|---|---|---|---|---|---|---|---|",
        ...mismatchRows.map(renderRow),
      ].join("\n")
    : "_None_";

  return [
    "# Operation Derived Nonactive Collapse Audit",
    "",
    "**Goal:** detect forward-derivation nonactive cases that collapse back to the original parsed source instead of preserving one-to-one mapping from each derived stem.",
    "",
    "## Summary",
    "",
    `- Lexicon rows scanned: ${summary.lexicon_rows_scanned || 0}`,
    `- Derivation cases evaluated: ${summary.cases_evaluated || 0}`,
    `- Aligned: ${summary.aligned || 0}`,
    `- Exempted causative i→ia overlaps: ${summary.exempt_causative_i_to_ia_overlap || 0}`,
    `- Overlaps direct source: ${summary.overlaps_source_direct || 0}`,
    `- Collapsed to source: ${summary.collapsed_to_source || 0}`,
    `- Mismatch: ${summary.mismatch || 0}`,
    `- No forward derivation: ${summary.no_forward || 0}`,
    `- No actual derived nonactive result: ${summary.no_actual_nonactive || 0}`,
    "",
    "## Overlaps Direct Source",
    "",
    overlapTable,
    "",
    "## Collapse Cases",
    "",
    collapseTable,
    "",
    "## Other Mismatches",
    "",
    mismatchTable,
    "",
  ].join("\n");
}

function main() {
  const { context } = createVmContext({
    rootDir: ROOT,
    extraGlobals: {
      Event: function Event() {},
    },
  });

  loadStaticData(context);
  loadExtraRuntimeFiles(context);
  loadCanonicalLexicon(context);

  const rows = loadLexiconRows(context);
  const results = [];

  rows.forEach((row) => {
    DERIVATION_TYPES.forEach((derivationType) => {
      results.push(analyzeRow(context, row, derivationType));
    });
  });

  const summary = results.reduce((acc, entry) => {
    acc.cases_evaluated += 1;
    if (entry.exemptionRule === "causative_intransitive_i_to_ia") {
      acc.exempt_causative_i_to_ia_overlap += 1;
    }
    if (entry.status === "aligned") {
      acc.aligned += 1;
    } else if (entry.status === "overlaps_source_direct") {
      acc.overlaps_source_direct += 1;
    } else if (entry.status === "collapsed_to_source") {
      acc.collapsed_to_source += 1;
    } else if (entry.status === "mismatch") {
      acc.mismatch += 1;
    } else if (entry.status === "no_forward") {
      acc.no_forward += 1;
    } else if (entry.status === "no_actual_nonactive") {
      acc.no_actual_nonactive += 1;
    }
    return acc;
  }, {
    lexicon_rows_scanned: rows.length,
    cases_evaluated: 0,
    aligned: 0,
    exempt_causative_i_to_ia_overlap: 0,
    overlaps_source_direct: 0,
    collapsed_to_source: 0,
    mismatch: 0,
    no_forward: 0,
    no_actual_nonactive: 0,
  });

  const report = {
    operation: "Operation Derived Nonactive Collapse Audit",
    generated_at: new Date().toISOString(),
    summary,
    findings: results.filter((entry) => entry.status !== "aligned" && entry.status !== "no_forward"),
  };

  fs.writeFileSync(REPORT_JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(REPORT_MD_PATH, `${buildMarkdownReport(report)}\n`);

  console.log("Operation Derived Nonactive Collapse Audit complete.");
  console.log(`  JSON: ${REPORT_JSON_PATH}`);
  console.log(`  MD: ${REPORT_MD_PATH}`);
  console.log(`  Aligned: ${summary.aligned}`);
  console.log(`  Exempted causative i→ia overlaps: ${summary.exempt_causative_i_to_ia_overlap}`);
  console.log(`  Overlaps direct source: ${summary.overlaps_source_direct}`);
  console.log(`  Collapsed to source: ${summary.collapsed_to_source}`);
  console.log(`  Mismatch: ${summary.mismatch}`);
  console.log(`  No forward derivation: ${summary.no_forward}`);
}

main();
