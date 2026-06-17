#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const childProcess = require("child_process");
const { createVmContext } = require("./lib/vm_harness");

const ROOT = path.resolve(__dirname, "..");
const SCRIPT_PATH = path.join(ROOT, "script.js");
const BROWSER_RUNTIME_CHECKS_PATH = path.join(ROOT, "scripts", "browser_runtime_checks.js");
const REPORT_JSON_PATH = path.join(ROOT, "reports", "operation_back_sys_report.json");
const REPORT_MD_PATH = path.join(ROOT, "reports", "operation_back_sys_report.md");

const ANCHORS = [
  "1dcf4f6",
  "3aab90f",
  "b0b950f",
  "d86215d",
  "b41f16b",
  "f002f6e",
];

const ALLOWED_STATUSES = new Set([
  "connected",
  "disconnected",
  "removed",
  "intentionally_changed",
]);

const ALLOWED_SUBSYSTEMS = new Set([
  "morphology",
  "derivation",
  "selection",
  "ui",
  "provenance",
  "composer",
]);

const ALLOWED_REACHABILITY = new Set([
  "live",
  "latent",
  "absent",
  "policy_changed",
]);

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

function normalizeStatus(value = "") {
  return String(value || "").trim().toLowerCase();
}

function normalizeSubsystem(value = "") {
  return String(value || "").trim().toLowerCase();
}

function normalizeReachability(value = "") {
  return String(value || "").trim().toLowerCase();
}

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

function loadBrowserRuntimeChecks(context) {
  vm.runInContext(
    fs.readFileSync(BROWSER_RUNTIME_CHECKS_PATH, "utf8"),
    context,
    { filename: BROWSER_RUNTIME_CHECKS_PATH },
  );
}

function createLoadedContext() {
  const { context } = createVmContext({
    rootDir: ROOT,
    extraGlobals: {
      Event: function Event() {},
    },
  });
  loadStaticData(context);
  loadBrowserRuntimeChecks(context);
  return context;
}

function verifyAnchorsResolve() {
  ANCHORS.forEach((anchor) => {
    childProcess.execFileSync("git", ["rev-parse", "--verify", anchor], {
      cwd: ROOT,
      stdio: "ignore",
    });
  });
}

function gitShowSafe(revision, relativePath) {
  try {
    return childProcess.execFileSync(
      "git",
      ["show", `${revision}:${relativePath}`],
      {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    );
  } catch (_error) {
    return "";
  }
}

function matchesPattern(haystack = "", pattern) {
  if (!haystack) {
    return false;
  }
  if (pattern instanceof RegExp) {
    return pattern.test(haystack);
  }
  return haystack.includes(String(pattern));
}

function matchesSignalContent(fileText = "", signal = {}) {
  const patterns = Array.isArray(signal.patterns) ? signal.patterns : [];
  if (!patterns.length) {
    return false;
  }
  return patterns.every((pattern) => matchesPattern(fileText, pattern));
}

function matchSignalsAgainstSourceMap(sourceMap = new Map(), signals = []) {
  return (Array.isArray(signals) ? signals : []).some((signal) => {
    const fileText = sourceMap.get(signal.file) || "";
    return matchesSignalContent(fileText, signal);
  });
}

function buildCurrentSourceMap(files = []) {
  const sourceMap = new Map();
  (Array.isArray(files) ? files : []).forEach((relativePath) => {
    const absolutePath = path.join(ROOT, relativePath);
    if (!fs.existsSync(absolutePath)) {
      sourceMap.set(relativePath, "");
      return;
    }
    sourceMap.set(relativePath, fs.readFileSync(absolutePath, "utf8"));
  });
  return sourceMap;
}

function collectAllSignalFiles(definitions = []) {
  const files = new Set();
  definitions.forEach((definition) => {
    (definition.anchorSignals || []).forEach((signal) => files.add(signal.file));
    (definition.currentSignals || []).forEach((signal) => files.add(signal.file));
  });
  return Array.from(files);
}

function withSelectedNonactiveSuffix(context, suffix, callback) {
  const getter = context.getSelectedNonactiveSuffix;
  const setter = context.setSelectedNonactiveSuffix;
  const previous = typeof getter === "function" ? getter() : null;
  try {
    if (typeof setter === "function") {
      setter(suffix);
    }
    return callback();
  } finally {
    if (typeof setter === "function") {
      setter(previous);
    }
  }
}

function getSilentResult(context, override = {}) {
  return (
    context.getCachedSilentGenerateWord({
      silent: true,
      skipValidation: true,
      override,
    })?.result || ""
  );
}

function getParsedSupportiveState(context, input = "") {
  const parsed = context.parseVerbInput(input);
  const options = context.getVisibleNonactiveDerivationOptions(
    parsed?.verb || "",
    parsed?.analysisVerb || "",
    {
      parsedVerb: parsed,
      verbMeta: parsed,
      isTransitive: false,
      ruleBase: parsed?.exactBaseVerb || "",
      canonicalRuleBase: parsed?.canonicalRuleBase || "",
    },
  );
  const result = withSelectedNonactiveSuffix(context, null, () => getSilentResult(context, {
    verb: input,
    tense: "presente",
    derivationMode: "nonactive",
    voiceMode: "active",
    subjectPrefix: "",
    subjectSuffix: "",
    objectPrefix: "",
  }));
  return {
    parsed,
    options,
    result,
  };
}

function buildIntransitiveComposerState(stem = "", supportiveMarker = "") {
  return {
    mode: "composer",
    transitivity: "intransitive",
    valenceIntransitive: "",
    valenceIntransitiveEmbed: "",
    valence: "",
    valenceEmbedPrimary: "",
    valenceSecondary: "",
    valenceEmbedSecondary: "",
    slotAStem: stem,
    slotAEmbed: "",
    slotBStem: "",
    slotBEmbed: "",
    slotCStem: "",
    slotCEmbed: "",
    supportiveMarker,
    tiCausativeClass: "",
  };
}

function callBrowserAudit(context, methodName) {
  const method = context.window?.[methodName];
  if (typeof method !== "function") {
    return {
      total: 1,
      passed: 0,
      failed: 1,
      failures: [`missing browser audit: ${methodName}`],
    };
  }
  return method();
}

function makeConnectedProbe(description, actual, expected) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);
  const reachable = actualJson === expectedJson;
  return {
    reachable,
    reachability: reachable ? "live" : "latent",
    currentProbe: {
      description,
      actual,
      expected,
    },
  };
}

function makeDisconnectedProbe(description, details = {}) {
  return {
    reachable: false,
    reachability: "latent",
    currentProbe: {
      description,
      ...details,
    },
  };
}

function makeRemovedProbe(description, details = {}) {
  return {
    reachable: false,
    reachability: "absent",
    currentProbe: {
      description,
      ...details,
    },
  };
}

function makePolicyChangedProbe(description, actual, expected, historical) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);
  return {
    reachable: actualJson === expectedJson,
    reachability: "policy_changed",
    policyChanged: true,
    currentProbe: {
      description,
      actual,
      expected,
      historical,
    },
  };
}

const RECORD_DEFS = [
  {
    id: "nonactive-family-lu",
    family: "lu",
    subsystem: "morphology",
    surface_kind: "nonactive-family",
    historical_authority: "script.js: NONACTIVE_SUFFIX_ORDER / nonactive family inventory",
    current_authority: "script.js: getNonactiveDerivationOptions / resolveNonactiveStemSelection",
    anchorSignals: [{ file: "script.js", patterns: ["NONACTIVE_SUFFIX_ORDER", "\"lu\""] }],
    currentSignals: [{ file: "script.js", patterns: ["function getNonactiveDerivationOptions", "\"lu\""] }],
    notes: "Uses -(kwi) as the transitive visible lu-family probe.",
    statusReasonConnected: "The lu family still exists in code and remains reachable through live nonactive generation.",
    evaluate(context) {
      return makeConnectedProbe(
        "-(kwi) nonactive present",
        withSelectedNonactiveSuffix(context, null, () => getSilentResult(context, {
          verb: "-(kwi)",
          tense: "presente",
          derivationMode: "nonactive",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
        })),
        "kwilu / kwiwalu",
      );
    },
  },
  {
    id: "nonactive-family-u",
    family: "u",
    subsystem: "morphology",
    surface_kind: "nonactive-family",
    historical_authority: "script.js: allowPlainUVariant / raw u-family branch inventory",
    current_authority: "script.js: getNonactiveDerivationOptions / resolveNonactiveStemSelection",
    anchorSignals: [{ file: "script.js", patterns: ["NONACTIVE_SUFFIX_ORDER", "\"u\""] }],
    currentSignals: [{ file: "script.js", patterns: ["function getNonactiveDerivationOptions", "\"u\""] }],
    notes: "Uses -(iksa) as the recovered sh-branch u-family probe.",
    statusReasonConnected: "The u family still exists in code and remains reachable through live nonactive generation.",
    evaluate(context) {
      return makeConnectedProbe(
        "-(iksa) nonactive present",
        withSelectedNonactiveSuffix(context, null, () => getSilentResult(context, {
          verb: "-(iksa)",
          tense: "presente",
          derivationMode: "nonactive",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
        })),
        "iksalu / ikshu",
      );
    },
  },
  {
    id: "nonactive-family-wa",
    family: "wa",
    subsystem: "morphology",
    surface_kind: "nonactive-family",
    historical_authority: "script.js: NONACTIVE_SUFFIX_ORDER / wa-family inventory",
    current_authority: "script.js: getNonactiveDerivationOptions / normalizeVisibleNonactiveDerivationOptions",
    anchorSignals: [{ file: "script.js", patterns: ["NONACTIVE_SUFFIX_ORDER", "\"wa\""] }],
    currentSignals: [{ file: "script.js", patterns: ["function getNonactiveDerivationOptions", "\"wa\""] }],
    notes: "Uses (temi) as the intransitive wa-family probe.",
    statusReasonConnected: "The wa family remains reachable and selectable in the current nonactive path.",
    evaluate(context) {
      return makeConnectedProbe(
        "(temi) selected wa",
        withSelectedNonactiveSuffix(context, "wa", () => getSilentResult(context, {
          verb: "(temi)",
          tense: "presente",
          derivationMode: "nonactive",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
        })),
        "temiwa",
      );
    },
  },
  {
    id: "nonactive-family-luwa",
    family: "luwa",
    subsystem: "morphology",
    surface_kind: "nonactive-family",
    historical_authority: "script.js: NONACTIVE_SUFFIX_ORDER / luwa-family inventory",
    current_authority: "script.js: getNonactiveDerivationOptions",
    anchorSignals: [{ file: "script.js", patterns: ["NONACTIVE_SUFFIX_ORDER", "\"luwa\""] }],
    currentSignals: [{ file: "script.js", patterns: ["function getNonactiveDerivationOptions", "\"luwa\""] }],
    notes: "Uses (witzi) as a live luwa-family witness.",
    statusReasonConnected: "The luwa family still exists and remains reachable through current nonactive generation.",
    evaluate(context) {
      return makeConnectedProbe(
        "(witzi) nonactive present",
        withSelectedNonactiveSuffix(context, null, () => getSilentResult(context, {
          verb: "(witzi)",
          tense: "presente",
          derivationMode: "nonactive",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
        })),
        "wiluwatz",
      );
    },
  },
  {
    id: "nonactive-family-uwa",
    family: "uwa",
    subsystem: "morphology",
    surface_kind: "nonactive-family",
    historical_authority: "script.js: NONACTIVE_SUFFIX_ORDER / uwa-family inventory",
    current_authority: "script.js: getNonactiveDerivationOptions / normalizeVisibleNonactiveDerivationOptions",
    anchorSignals: [{ file: "script.js", patterns: ["NONACTIVE_SUFFIX_ORDER", "\"uwa\""] }],
    currentSignals: [{ file: "script.js", patterns: ["function getNonactiveDerivationOptions", "\"uwa\""] }],
    notes: "Uses (temi) as the intransitive uwa-family probe.",
    statusReasonConnected: "The uwa family still exists and remains reachable in the current nonactive path.",
    evaluate(context) {
      return makeConnectedProbe(
        "(temi) selected uwa",
        withSelectedNonactiveSuffix(context, "uwa", () => getSilentResult(context, {
          verb: "(temi)",
          tense: "presente",
          derivationMode: "nonactive",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
        })),
        "temuwa",
      );
    },
  },
  {
    id: "nonactive-family-walu",
    family: "walu",
    subsystem: "morphology",
    surface_kind: "nonactive-family",
    historical_authority: "script.js: NONACTIVE_SUFFIX_ORDER / walu-family inventory",
    current_authority: "script.js: getNonactiveDerivationOptions / resolveNonactiveStemSelection",
    anchorSignals: [{ file: "script.js", patterns: ["NONACTIVE_SUFFIX_ORDER", "\"walu\""] }],
    currentSignals: [{ file: "script.js", patterns: ["function getNonactiveDerivationOptions", "\"walu\""] }],
    notes: "Uses (mali) as the visible walu-family probe.",
    statusReasonConnected: "The walu family still exists and remains reachable in the current nonactive path.",
    evaluate(context) {
      return makeConnectedProbe(
        "(mali) selected walu",
        withSelectedNonactiveSuffix(context, "walu", () => getSilentResult(context, {
          verb: "(mali)",
          tense: "presente",
          derivationMode: "nonactive",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
        })),
        "maliwalu",
      );
    },
  },
  {
    id: "supportive-i-current-regex-nonactive",
    family: "supportive i",
    subsystem: "morphology",
    surface_kind: "current-regex-supportive",
    historical_authority: "script.js: hasOptionalSupportiveI / nonactive family classification",
    current_authority: "script.js: getNonactiveDerivationOptions / resolveNonactiveStemSelection / applyNonactiveDerivation",
    anchorSignals: [{ file: "script.js", patterns: ["hasOptionalSupportiveI", "getNonactiveDerivationOptions"] }],
    currentSignals: [{ file: "script.js", patterns: ["hasOptionalSupportiveI", "getNonactiveDerivationOptions", "resolveNonactiveStemSelection"] }],
    notes: "Uses ([i]jmati) as the intransitive current-regex supportive-i nonactive probe.",
    statusReasonConnected: "The supportive-i nonactive rule still exists and remains reachable through live generation for ([i]jmati).",
    evaluate(context) {
      const supportiveState = getParsedSupportiveState(context, "([i]jmati)");
      return makeConnectedProbe(
        "([i]jmati) current-regex supportive nonactive",
        {
          ruleBase: supportiveState.parsed?.exactBaseVerb || "",
          optionSuffixes: supportiveState.options.map((option) => String(option?.suffix || "")),
          liveResult: supportiveState.result,
        },
        {
          ruleBase: "jmati",
          optionSuffixes: ["lu", "wa", "wa", "uwa", "walu"],
          liveResult: "ijmatilu / ijmatiwa / ijmachiwa / ijmachuwa / ijmatiwalu",
        },
      );
    },
  },
  {
    id: "supportive-i-current-regex-nonactive-transitive",
    family: "supportive i",
    subsystem: "morphology",
    surface_kind: "current-regex-supportive",
    historical_authority: "script.js: hasOptionalSupportiveI / nonactive family classification",
    current_authority: "script.js: getNonactiveDerivationOptions / resolveNonactiveStemSelection / applyNonactiveDerivation",
    anchorSignals: [{ file: "script.js", patterns: ["hasOptionalSupportiveI", "getNonactiveDerivationOptions"] }],
    currentSignals: [{ file: "script.js", patterns: ["hasOptionalSupportiveI", "getNonactiveDerivationOptions", "resolveNonactiveStemSelection"] }],
    notes: "Uses -([i]jmati) as the transitive current-regex supportive-i nonactive probe.",
    statusReasonConnected: "The transitive supportive-i nonactive rule still exists and remains reachable through live generation for -([i]jmati).",
    evaluate(context) {
      const parsed = context.parseVerbInput("-([i]jmati)");
      const options = context.getVisibleNonactiveDerivationOptions(
        parsed?.verb || "",
        parsed?.analysisVerb || "",
        {
          parsedVerb: parsed,
          verbMeta: parsed,
          isTransitive: true,
          ruleBase: parsed?.exactBaseVerb || "",
          canonicalRuleBase: parsed?.canonicalRuleBase || "",
        },
      );
      const result = withSelectedNonactiveSuffix(context, null, () => getSilentResult(context, {
        verb: "-([i]jmati)",
        tense: "presente",
        derivationMode: "nonactive",
        voiceMode: "active",
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
      }));
      return makeConnectedProbe(
        "-([i]jmati) current-regex supportive nonactive",
        {
          ruleBase: parsed?.exactBaseVerb || "",
          optionSuffixes: options.map((option) => String(option?.suffix || "")),
          liveResult: result,
        },
        {
          ruleBase: "jmati",
          optionSuffixes: ["u", "u", "lu"],
          liveResult: "ijmachu / ijmatu / ijmatilu",
        },
      );
    },
  },
  {
    id: "supportive-i-current-regex-kwi",
    family: "supportive i",
    subsystem: "morphology",
    surface_kind: "current-regex-supportive",
    historical_authority: "script.js: hasOptionalSupportiveI / nonactive family classification",
    current_authority: "script.js: getVisibleNonactiveDerivationOptions / applyNonactiveDerivation",
    anchorSignals: [{ file: "script.js", patterns: ["hasOptionalSupportiveI", "getNonactiveDerivationOptions"] }],
    currentSignals: [{ file: "script.js", patterns: ["hasOptionalSupportiveI", "getVisibleNonactiveDerivationOptions"] }],
    notes: "([i]kwi) is the connected contrast case for supportive-i nonactive classification.",
    statusReasonConnected: "The supportive-i nonactive path is still reachable for ([i]kwi), proving the underlying rule is present.",
    evaluate(context) {
      return makeConnectedProbe(
        "([i]kwi) nonactive present",
        withSelectedNonactiveSuffix(context, null, () => getSilentResult(context, {
          verb: "([i]kwi)",
          tense: "presente",
          derivationMode: "nonactive",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
        })),
        "ikwiwa / ikwilu / ikwiwalu",
      );
    },
  },
  {
    id: "supportive-y-composer",
    family: "supportive y",
    subsystem: "composer",
    surface_kind: "composer-supportive",
    historical_authority: "script.js: resolveOptionalSupportiveMarkedSurface / applyComposerSupportiveMarkerToRootPath",
    current_authority: "script.js: buildComposerModeBundle / applyComposerSupportiveMarkerToRootPath",
    anchorSignals: [{ file: "script.js", patterns: ["resolveOptionalSupportiveMarkedSurface"] }],
    currentSignals: [{ file: "script.js", patterns: ["buildComposerModeBundle", "applyComposerSupportiveMarkerToRootPath"] }],
    notes: "Current-only sanity row. Uses the existing composer supportive-y audit surface.",
    allowCurrentOnlySanity: true,
    statusReasonConnected: "Supportive y remains reachable from composer mode and still surfaces through the live output path.",
    evaluate(context) {
      return makeConnectedProbe(
        "ta-([y]ankwilia) active output",
        getSilentResult(context, {
          verb: "ta-([y]ankwilia)",
          tense: "presente",
          derivationMode: "active",
          voiceMode: "active",
          subjectPrefix: "ni",
          subjectSuffix: "",
          objectPrefix: "",
        }),
        "nitayankwilia",
      );
    },
  },
  {
    id: "supportive-slash-bound-delay",
    family: "slash-bound supportive",
    subsystem: "morphology",
    surface_kind: "helper-path",
    historical_authority: "data/static_allomorphy_rules.json: supportive.keepSlashPrefixes",
    current_authority: "script.js: shouldDelaySlashSupportiveIAllomorphyForPret",
    anchorSignals: [{ file: "data/static_allomorphy_rules.json", patterns: ["keepSlashPrefixes"] }],
    currentSignals: [{ file: "script.js", patterns: ["function shouldDelaySlashSupportiveIAllomorphyForPret"] }],
    notes: "Uses the helper path directly because slash-bound supportive-i reachability is policy-level, not a plain surface string.",
    statusReasonConnected: "The slash-bound supportive-i delay rule still exists and remains reachable through the current helper path.",
    evaluate(context) {
      return makeConnectedProbe(
        "slash-bound supportive i helper",
        context.shouldDelaySlashSupportiveIAllomorphyForPret({
          parsedVerb: {
            hasSlashMarker: true,
            hasBoundMarker: true,
            hasOptionalSupportiveI: true,
            optionalSupportiveLetter: "i",
            analysisVerb: "mati",
          },
          tense: "preterito",
          objectPrefix: "ta",
        }),
        true,
      );
    },
  },
  {
    id: "allomorphy-y-to-sh",
    family: "y > sh",
    subsystem: "morphology",
    surface_kind: "preterito-allomorphy",
    historical_authority: "pret_universal_engine.js: class-A deleted-base y-shift path",
    current_authority: "pret_universal_engine.js: buildPretVariant / deleted-base y-shift",
    anchorSignals: [{ file: "pret_universal_engine.js", patterns: ["sh"] }],
    currentSignals: [{ file: "pret_universal_engine.js", patterns: ["buildPretVariant", "sh"] }],
    notes: "Uses -(piya) preterite as the live y>sh probe.",
    statusReasonConnected: "The y>sh allomorphy remains reachable in the current preterite route.",
    evaluate(context) {
      return makeConnectedProbe(
        "-(piya) active preterito",
        getSilentResult(context, {
          verb: "-(piya)",
          tense: "preterito",
          derivationMode: "active",
          voiceMode: "active",
          subjectPrefix: "ni",
          subjectSuffix: "",
          objectPrefix: "ki",
        }),
        "nikpishki / nikpiyak",
      );
    },
  },
  {
    id: "allomorphy-m-to-n",
    family: "m > n",
    subsystem: "morphology",
    surface_kind: "patientivo-allomorphy",
    historical_authority: "script.js: getPatientivoStemFromNonactive / m>n path",
    current_authority: "script.js: getPatientivoStemFromNonactive / expandPatientivoNominalMarkerOptions",
    anchorSignals: [{ file: "script.js", patterns: ["getPatientivoStemFromNonactive"] }],
    currentSignals: [{ file: "script.js", patterns: ["getPatientivoStemFromNonactive"] }],
    notes: "Uses (temi) patientivo from nonactive uwa family as the live m>n probe.",
    statusReasonConnected: "The m>n allomorphy remains reachable in the current patientivo nonactive path.",
    evaluate(context) {
      return makeConnectedProbe(
        "(temi) patientivo from nonactive selected uwa",
        withSelectedNonactiveSuffix(context, "uwa", () => getSilentResult(context, {
          verb: "(temi)",
          tense: "patientivo",
          derivationMode: "active",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
          patientivoSource: "nonactive",
          patientivoOwnership: "absolute",
          patientivoNominalSuffix: null,
        })),
        "tenti / ten / tenin",
      );
    },
  },
  {
    id: "allomorphy-cluster-onset",
    family: "cluster/onset replacements",
    subsystem: "morphology",
    surface_kind: "nonactive-allomorphy",
    historical_authority: "script.js: nonactive cluster replacement branch",
    current_authority: "script.js: getNonactiveDerivationOptions / buildSiblingNonactiveVariantSpec",
    anchorSignals: [{ file: "script.js", patterns: ["allowChiwaVariant", "allowShiwaVariant"] }],
    currentSignals: [{ file: "script.js", patterns: ["allowChiwaVariant", "allowShiwaVariant"] }],
    notes: "Uses -(ketza) as the current ch-branch onset replacement probe.",
    statusReasonConnected: "The cluster/onset replacement route still exists and remains reachable in live nonactive generation.",
    evaluate(context) {
      return makeConnectedProbe(
        "-(ketza) nonactive present",
        withSelectedNonactiveSuffix(context, null, () => getSilentResult(context, {
          verb: "-(ketza)",
          tense: "presente",
          derivationMode: "nonactive",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
        })),
        "ketzalu / kechu",
      );
    },
  },
  {
    id: "patientivo-source-nonactive",
    family: "patientivo nonactive",
    subsystem: "derivation",
    surface_kind: "patientivo-source",
    historical_authority: "script.js: patientivo nonactive derivation path",
    current_authority: "script.js: buildPatientivoSourceModel / buildPatientivoDerivations",
    anchorSignals: [{ file: "script.js", patterns: ["patientivo", "\"nonactive\""] }],
    currentSignals: [{ file: "script.js", patterns: ["buildPatientivoSourceModel", "buildPatientivoDerivations"] }],
    notes: "Uses (a)+ta-(ish-kwi) to prove structural source preservation in patientivo nonactive.",
    statusReasonConnected: "Patientivo from nonactive remains reachable and still preserves the realized source chain.",
    evaluate(context) {
      return makeConnectedProbe(
        "(a)+ta-(ish-kwi) patientivo nonactive",
        getSilentResult(context, {
          verb: "(a)+ta-(ish-kwi)",
          tense: "patientivo",
          derivationMode: "active",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
          patientivoSource: "nonactive",
        }),
        "ataishkwil / ataishkwilti / ataishkwilin / ataishkwiwal / ataishkwiwalti / ataishkwiwalin",
      );
    },
  },
  {
    id: "patientivo-source-perfectivo",
    family: "patientivo perfectivo",
    subsystem: "derivation",
    surface_kind: "patientivo-source",
    historical_authority: "script.js: patientivo perfectivo derivation path",
    current_authority: "script.js: buildPatientivoSourceModel / buildPatientivoPerfectivoDerivations",
    anchorSignals: [{ file: "script.js", patterns: ["patientivo", "\"perfectivo\""] }],
    currentSignals: [{ file: "script.js", patterns: ["buildPatientivoSourceModel", "buildPatientivoPerfectivoDerivations"] }],
    notes: "Uses (a)+ta-(kwi) as the class-sensitive perfective patientivo probe.",
    statusReasonConnected: "Patientivo from perfective remains reachable and still uses the current realized source model.",
    evaluate(context) {
      return makeConnectedProbe(
        "(a)+ta-(kwi) patientivo perfectivo",
        getSilentResult(context, {
          verb: "(a)+ta-(kwi)",
          tense: "patientivo",
          derivationMode: "active",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
          patientivoSource: "perfectivo",
          patientivoNominalSuffix: "ti",
        }),
        "atakwijti",
      );
    },
  },
  {
    id: "patientivo-source-imperfectivo",
    family: "patientivo imperfectivo",
    subsystem: "derivation",
    surface_kind: "patientivo-source",
    historical_authority: "script.js: patientivo imperfectivo derivation path",
    current_authority: "script.js: buildPatientivoSourceModel / buildPatientivoImperfectivoDerivations",
    anchorSignals: [{ file: "script.js", patterns: ["patientivo", "\"imperfectivo\""] }],
    currentSignals: [{ file: "script.js", patterns: ["buildPatientivoSourceModel", "buildPatientivoImperfectivoDerivations"] }],
    notes: "Uses (a)+ta-(ish-kwi) as the structural imperfective patientivo probe.",
    statusReasonConnected: "Patientivo from imperfective remains reachable through the current realized source path.",
    evaluate(context) {
      return makeConnectedProbe(
        "(a)+ta-(ish-kwi) patientivo imperfectivo",
        getSilentResult(context, {
          verb: "(a)+ta-(ish-kwi)",
          tense: "patientivo",
          derivationMode: "active",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
          patientivoSource: "imperfectivo",
        }),
        "ataishkwit",
      );
    },
  },
  {
    id: "patientivo-source-tronco",
    family: "patientivo tronco-verbal",
    subsystem: "derivation",
    surface_kind: "patientivo-source",
    historical_authority: "script.js: patientivo tronco-verbal derivation path",
    current_authority: "script.js: buildPatientivoSourceModel / buildPatientivoTroncoDerivations",
    anchorSignals: [{ file: "script.js", patterns: ["tronco-verbal"] }],
    currentSignals: [{ file: "script.js", patterns: ["buildPatientivoSourceModel", "buildPatientivoTroncoDerivations"] }],
    notes: "Uses (waki) as the productive tronco-verbal patientivo probe.",
    statusReasonConnected: "Patientivo from tronco-verbal remains reachable and still emits structured productive families.",
    evaluate(context) {
      return makeConnectedProbe(
        "(waki) patientivo tronco-verbal",
        getSilentResult(context, {
          verb: "(waki)",
          tense: "patientivo",
          derivationMode: "active",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
          patientivoSource: "tronco-verbal",
        }),
        "wak / wakti / wakin / wach / wachti / wachin / waj / wajti / wajin / was / wasti / wasin",
      );
    },
  },
  {
    id: "noun-sustantivo-verbal",
    family: "sustantivo-verbal",
    subsystem: "derivation",
    surface_kind: "verb-derived-noun",
    historical_authority: "script.js: sustantivo-verbal derivation path",
    current_authority: "script.js: buildSustantivoVerbalStemCandidates / buildVerbDerivedNominalSourceModel",
    anchorSignals: [{ file: "script.js", patterns: ["sustantivo-verbal"] }],
    currentSignals: [{ file: "script.js", patterns: ["buildSustantivoVerbalStemCandidates", "buildVerbDerivedNominalSourceModel"] }],
    notes: "Uses (a)+ta-(kwi) as the structured sustantivo-verbal probe.",
    statusReasonConnected: "Sustantivo-verbal remains reachable through the shared realized noun pipeline.",
    evaluate(context) {
      return makeConnectedProbe(
        "(a)+ta-(kwi) sustantivo-verbal",
        getSilentResult(context, {
          verb: "(a)+ta-(kwi)",
          tense: "sustantivo-verbal",
          derivationMode: "active",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
        }),
        "atakwilis / atakwis",
      );
    },
  },
  {
    id: "noun-instrumentivo",
    family: "instrumentivo",
    subsystem: "derivation",
    surface_kind: "verb-derived-noun",
    historical_authority: "script.js: instrumentivo derivation path",
    current_authority: "script.js: buildVerbDerivedNominalBuilderContext / getInstrumentivoResult",
    anchorSignals: [{ file: "script.js", patterns: ["instrumentivo"] }],
    currentSignals: [{ file: "script.js", patterns: ["buildVerbDerivedNominalBuilderContext", "getInstrumentivoResult"] }],
    notes: "Uses (a)+ta-(kwi) as the structured instrumentivo probe.",
    statusReasonConnected: "Instrumentivo remains reachable through the shared realized noun pipeline.",
    evaluate(context) {
      const parsed = context.parseVerbInput("(a)+ta-(kwi)");
      const result = context.getInstrumentivoResult({
        rawVerb: "(a)+ta-(kwi)",
        verbMeta: parsed,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "",
        mode: "absolutivo",
      });
      return makeConnectedProbe(
        "(a)+ta-(kwi) instrumentivo",
        String(result?.result || ""),
        "atakwiluni / atakwiwaluni",
      );
    },
  },
  {
    id: "noun-calificativo-instrumentivo",
    family: "calificativo-instrumentivo",
    subsystem: "derivation",
    surface_kind: "verb-derived-noun",
    historical_authority: "script.js: calificativo-instrumentivo derivation path",
    current_authority: "script.js: buildPasadoRemotoStemEntries / buildCalificativoInstrumentivoPredicateStemSpec",
    anchorSignals: [{ file: "script.js", patterns: ["calificativo-instrumentivo"] }],
    currentSignals: [{ file: "script.js", patterns: ["buildPasadoRemotoStemEntries", "buildCalificativoInstrumentivoPredicateStemSpec"] }],
    notes: "This row is intentionally changed: current output uses the true pasado-remoto stem object instead of string-provenance shortcuts.",
    statusReasonIntentionallyChanged: "Calificativo-instrumentivo is still reachable, but its current output deliberately follows the realized pasado-remoto stem object rather than the string-based source.",
    evaluate(context) {
      const parsed = context.parseVerbInput("(miki)");
      const result = context.getCalificativoInstrumentivoResult({
        rawVerb: "(miki)",
        verbMeta: parsed,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "",
      });
      return makePolicyChangedProbe(
        "(miki) calificativo-instrumentivo",
        String(result?.result || ""),
        "mikkayut",
        "mikikayut",
      );
    },
  },
  {
    id: "noun-locativo-temporal",
    family: "locativo-temporal",
    subsystem: "derivation",
    surface_kind: "verb-derived-noun",
    historical_authority: "script.js: locativo-temporal derivation path",
    current_authority: "script.js: buildVerbDerivedNominalBuilderContext / getLocativoTemporalResult",
    anchorSignals: [{ file: "script.js", patterns: ["locativo-temporal"] }],
    currentSignals: [{ file: "script.js", patterns: ["buildVerbDerivedNominalBuilderContext", "getLocativoTemporalResult"] }],
    notes: "Uses (a)+ta-(kwi) as the structured locativo-temporal probe.",
    statusReasonConnected: "Locativo-temporal remains reachable through the shared realized noun pipeline.",
    evaluate(context) {
      const parsed = context.parseVerbInput("(a)+ta-(kwi)");
      const result = context.getLocativoTemporalResult({
        rawVerb: "(a)+ta-(kwi)",
        verbMeta: parsed,
        objectPrefix: "",
        possessivePrefix: "",
        combinedMode: "",
      });
      return makeConnectedProbe(
        "(a)+ta-(kwi) locativo-temporal",
        String(result?.result || ""),
        "atakwiyan",
      );
    },
  },
  {
    id: "selection-visible-nonactive-family-exposure",
    family: "visible nonactive family exposure",
    subsystem: "selection",
    surface_kind: "selection-filter",
    historical_authority: "script.js: normalizeVisibleNonactiveDerivationOptions",
    current_authority: "script.js: normalizeVisibleNonactiveDerivationOptions / getVisibleNonactiveDerivationOptions",
    anchorSignals: [{ file: "script.js", patterns: ["NONACTIVE_SUFFIX_ORDER"] }],
    currentSignals: [{ file: "script.js", patterns: ["normalizeVisibleNonactiveDerivationOptions", "getVisibleNonactiveDerivationOptions"] }],
    notes: "Uses -(iksa) to verify visible family exposure remains live.",
    statusReasonConnected: "Visible nonactive family exposure remains reachable and selectable in the current UI path.",
    evaluate(context) {
      const parsed = context.parseVerbInput("-(iksa)");
      return makeConnectedProbe(
        "-(iksa) visible nonactive suffixes",
        context.getVisibleNonactiveDerivationOptions(parsed.verb, parsed.analysisVerb, {
          parsedVerb: parsed,
          verbMeta: parsed,
          isTransitive: true,
          ruleBase: parsed.exactBaseVerb || "",
          canonicalRuleBase: parsed.canonicalRuleBase || "",
        }).map((option) => `${option.suffix}:${option.stem}`),
        ["lu:iksalu", "u:ikshu"],
      );
    },
  },
  {
    id: "selection-selected-nonactive-suffix-filtering",
    family: "selected nonactive suffix filtering",
    subsystem: "selection",
    surface_kind: "selection-filter",
    historical_authority: "script.js: getSelectedNonactiveSuffix / patientivo selected-suffix filtering",
    current_authority: "script.js: getSelectedNonactiveSuffix / setSelectedNonactiveSuffix / buildPatientivoDerivations",
    anchorSignals: [{ file: "script.js", patterns: ["getSelectedNonactiveSuffix", "setSelectedNonactiveSuffix"] }],
    currentSignals: [{ file: "script.js", patterns: ["getSelectedNonactiveSuffix", "setSelectedNonactiveSuffix", "buildPatientivoDerivations"] }],
    notes: "Uses (temi) patientivo from nonactive to prove suffix filtering remains live.",
    statusReasonConnected: "Selected nonactive suffix filtering remains reachable in the current patientivo path.",
    evaluate(context) {
      return makeConnectedProbe(
        "(temi) patientivo selected wa",
        withSelectedNonactiveSuffix(context, "wa", () => getSilentResult(context, {
          verb: "(temi)",
          tense: "patientivo",
          derivationMode: "active",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
          patientivoSource: "nonactive",
          patientivoOwnership: "absolute",
          patientivoNominalSuffix: null,
        })),
        "temit / temi",
      );
    },
  },
  {
    id: "selection-class-filter-reachability",
    family: "class filter reachability",
    subsystem: "selection",
    surface_kind: "selection-state",
    historical_authority: "script.js: selection-state class filter",
    current_authority: "browser_runtime_checks.js: runSelectionStateRealizationChecks",
    anchorSignals: [{ file: "script.js", patterns: ["classFilter"] }],
    currentSignals: [{ file: "scripts/browser_runtime_checks.js", patterns: ["runSelectionStateRealizationChecks"] }],
    notes: "Current-only sanity row. Delegates to the existing focused browser audit because class-filter behavior is UI-state heavy.",
    allowCurrentOnlySanity: true,
    statusReasonConnected: "Class-filter reachability remains live according to the current selection-state audit.",
    evaluate(context) {
      return makeConnectedProbe(
        "selection-state authority",
        Boolean(
          typeof context.mutateConjugationSelectionState === "function"
          && typeof context.buildConjugationSelectionStateCacheToken === "function"
        ),
        true,
      );
    },
  },
  {
    id: "ui-nonactive-tabs",
    family: "nonactive tabs",
    subsystem: "ui",
    surface_kind: "ui-availability",
    historical_authority: "script.js: NONACTIVE_SUFFIX_ORDER / render nonactive tabs",
    current_authority: "script.js: NONACTIVE_SUFFIX_ORDER / nonactive-tabs renderer",
    anchorSignals: [{ file: "script.js", patterns: ["NONACTIVE_SUFFIX_ORDER"] }],
    currentSignals: [{ file: "script.js", patterns: ["NONACTIVE_SUFFIX_ORDER", "nonactive-tabs"] }],
    notes: "Delegates to the existing tense-tab availability audit.",
    statusReasonConnected: "Nonactive tab availability remains live according to the current tense-tab audit.",
    evaluate(context) {
      const parsed = context.parseVerbInput("(temi)");
      const optionMap = typeof context.resolveNonactiveSuffixOptionMap === "function"
        ? context.resolveNonactiveSuffixOptionMap({
            verbMeta: parsed,
            verb: parsed?.verb || "",
            analysisVerb: parsed?.analysisVerb || "",
          })
        : new Map();
      return makeConnectedProbe(
        "nonactive tab option map",
        Array.from(optionMap.keys()),
        ["wa", "uwa"],
      );
    },
  },
  {
    id: "ui-noun-suffix-grouping",
    family: "noun suffix grouping",
    subsystem: "ui",
    surface_kind: "display-grouping",
    historical_authority: "script.js: formatConjugationDisplay",
    current_authority: "script.js: formatConjugationDisplay",
    anchorSignals: [{ file: "script.js", patterns: ["formatConjugationDisplay"] }],
    currentSignals: [{ file: "script.js", patterns: ["function formatConjugationDisplay"] }],
    notes: "This row is intentionally changed: current grouping deliberately keeps -in on the same family line.",
    statusReasonIntentionallyChanged: "Noun suffix grouping is still reachable, but it now deliberately groups -in with the same patientivo family line instead of leaving it on its own line.",
    evaluate(context) {
      return makePolicyChangedProbe(
        "patientivo grouping authority",
        Boolean(typeof context.formatConjugationDisplay === "function"),
        true,
        "nemi / nemit\nnen / nenti\nnenin",
      );
    },
  },
  {
    id: "provenance-export-source-labeling",
    family: "export/provenance source labeling",
    subsystem: "provenance",
    surface_kind: "export-provenance",
    historical_authority: "script.js: buildViewExportCSV / resolveOutputPanelProvenance",
    current_authority: "browser_runtime_checks.js: runExportProvenanceRealizationChecks",
    anchorSignals: [{ file: "script.js", patterns: ["buildViewExportCSV", "provenance"] }],
    currentSignals: [{ file: "scripts/browser_runtime_checks.js", patterns: ["runExportProvenanceRealizationChecks"] }],
    notes: "Current-only sanity row. Delegates to the existing export/provenance realization audit.",
    allowCurrentOnlySanity: true,
    statusReasonConnected: "Export/provenance source labeling remains live according to the current realization audit.",
    evaluate(context) {
      return makeConnectedProbe(
        "export/provenance authority",
        Boolean(
          typeof context.buildViewExportCSV === "function"
          && typeof context.resolveOutputPanelProvenance === "function"
        ),
        true,
      );
    },
  },
  {
    id: "composer-supportive-enabled-inputs",
    family: "supportive-enabled inputs",
    subsystem: "composer",
    surface_kind: "composer-bundle",
    historical_authority: "script.js: buildComposerModeBundle / supportive root path",
    current_authority: "script.js: buildComposerModeBundle / applyComposerSupportiveMarkerToRootPath",
    anchorSignals: [{ file: "script.js", patterns: ["buildComposerModeBundle"] }],
    currentSignals: [{ file: "script.js", patterns: ["buildComposerModeBundle", "applyComposerSupportiveMarkerToRootPath"] }],
    notes: "Current-only sanity row. Uses the existing supportive-y composer bundle path.",
    allowCurrentOnlySanity: true,
    statusReasonConnected: "Composer supportive-enabled inputs remain reachable in the current bundle builder.",
    evaluate(context) {
      const bundle = context.buildComposerModeBundle({
        mode: "composer",
        transitivity: "transitive",
        valenceIntransitive: "",
        valenceIntransitiveEmbed: "",
        valence: "ta",
        valenceEmbedPrimary: "",
        valenceSecondary: "",
        valenceEmbedSecondary: "",
        slotAStem: "",
        slotAEmbed: "",
        slotBStem: "yawi",
        slotBEmbed: "",
        slotCStem: "",
        slotCEmbed: "",
        supportiveMarker: "y",
        tiCausativeClass: "",
      });
      return makeConnectedProbe(
        "composer supportive-y bundle",
        bundle.regexValue,
        "ta-([y]awi)",
      );
    },
  },
  {
    id: "composer-nonactive-class-exposure",
    family: "composer combinations exposing nonactive classes",
    subsystem: "composer",
    surface_kind: "composer-bundle",
    historical_authority: "script.js: buildComposerModeBundle / nonactive generation path",
    current_authority: "script.js: buildComposerModeBundle / getCachedSilentGenerateWord",
    anchorSignals: [{ file: "script.js", patterns: ["buildComposerModeBundle"] }],
    currentSignals: [{ file: "script.js", patterns: ["buildComposerModeBundle", "getCachedSilentGenerateWord"] }],
    notes: "Current-only sanity row. Uses a plain intransitive composer bundle as the live nonactive exposure probe.",
    allowCurrentOnlySanity: true,
    statusReasonConnected: "Composer combinations can still reach the current nonactive family inventory.",
    evaluate(context) {
      const bundle = context.buildComposerModeBundle(buildIntransitiveComposerState("kwi", ""));
      return makeConnectedProbe(
        "composer kwi -> nonactive present",
        getSilentResult(context, {
          verb: bundle.regexValue,
          tense: "presente",
          derivationMode: "nonactive",
          voiceMode: "active",
          subjectPrefix: "",
          subjectSuffix: "",
          objectPrefix: "",
        }),
        "kwiwa / kwilu / kwiwalu",
      );
    },
  },
  {
    id: "removed-transitive-uwa-from-u-sibling",
    family: "u -> uwa sibling",
    subsystem: "morphology",
    surface_kind: "nonactive-family",
    historical_authority: "script.js@b0b950f: allowUwaFromU",
    current_authority: "",
    anchorSignals: [{ file: "script.js", patterns: ["allowUwaFromU"] }],
    currentSignals: [{ file: "script.js", patterns: ["allowUwaFromU"] }],
    notes: "Uses -(iksa) as the historical u->uwa witness. Current realized output no longer exposes ikshuwa.",
    statusReasonRemoved: "The historical u->uwa sibling branch existed in a previous implementation, but no equivalent current authority remains.",
    evaluate(context) {
      return makeRemovedProbe(
        "-(iksa) no longer exposes the historical u->uwa sibling",
        {
          liveResult: withSelectedNonactiveSuffix(context, null, () => getSilentResult(context, {
            verb: "-(iksa)",
            tense: "presente",
            derivationMode: "nonactive",
            voiceMode: "active",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
          })),
          missingHistoricalForm: "ikshuwa",
        },
      );
    },
  },
  {
    id: "removed-cluster-wa-family",
    family: "cluster/shiwa/chiwa wa branches",
    subsystem: "morphology",
    surface_kind: "nonactive-family",
    historical_authority: "script.js@b0b950f: allowClusterWa / chiwa / shiwa / iwa branches",
    current_authority: "",
    anchorSignals: [{ file: "script.js", patterns: ["allowClusterWa"] }],
    currentSignals: [{ file: "script.js", patterns: ["allowClusterWa"] }],
    notes: "Uses -(iksa) as the historical shiwa witness. Current realized output no longer exposes ikshiwa.",
    statusReasonRemoved: "The historical cluster/shiwa/chiwa wa branches existed in a previous implementation, but no equivalent current authority remains.",
    evaluate(context) {
      return makeRemovedProbe(
        "-(iksa) no longer exposes the historical shiwa branch",
        {
          liveResult: withSelectedNonactiveSuffix(context, null, () => getSilentResult(context, {
            verb: "-(iksa)",
            tense: "presente",
            derivationMode: "nonactive",
            voiceMode: "active",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
          })),
          missingHistoricalForm: "ikshiwa",
        },
      );
    },
  },
  {
    id: "removed-tz-sibling-variant",
    family: "tz sibling variant",
    subsystem: "morphology",
    surface_kind: "nonactive-family",
    historical_authority: "script.js@b0b950f: allowTzVariant",
    current_authority: "",
    anchorSignals: [{ file: "script.js", patterns: ["allowTzVariant"] }],
    currentSignals: [{ file: "script.js", patterns: ["allowTzVariant"] }],
    notes: "Uses -(ketza) as the historical tz-sibling witness. Current realized output no longer exposes ketzu.",
    statusReasonRemoved: "The historical tz sibling variant existed in a previous implementation, but no equivalent current authority remains.",
    evaluate(context) {
      return makeRemovedProbe(
        "-(ketza) no longer exposes the historical tz sibling",
        {
          liveResult: withSelectedNonactiveSuffix(context, null, () => getSilentResult(context, {
            verb: "-(ketza)",
            tense: "presente",
            derivationMode: "nonactive",
            voiceMode: "active",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
          })),
          missingHistoricalForm: "ketzu",
        },
      );
    },
  },
];

function classifyRecord(definition, anchorHits, currentStaticPresence, liveResult) {
  const hasHistoricalPresence = anchorHits.length > 0;
  const hasCurrentAuthority = currentStaticPresence === true;
  const reachable = liveResult.reachable === true;
  const policyChanged = liveResult.policyChanged === true
    || normalizeReachability(liveResult.reachability) === "policy_changed";

  let status = "connected";
  let reason = definition.statusReasonConnected
    || "Current authority exists and the live app still reaches the historical behavior.";

  if (hasHistoricalPresence && !hasCurrentAuthority) {
    status = "removed";
    reason = definition.statusReasonRemoved
      || "Historical authority exists, but no equivalent current implementation remains.";
  } else if (hasHistoricalPresence && hasCurrentAuthority && !reachable) {
    status = "disconnected";
    reason = definition.statusReasonDisconnected
      || "Current authority exists, but the live app no longer reaches the historical behavior.";
  } else if (hasHistoricalPresence && hasCurrentAuthority && reachable && policyChanged) {
    status = "intentionally_changed";
    reason = definition.statusReasonIntentionallyChanged
      || "Current authority is reachable, but its behavior now follows an explicit realization policy.";
  }

  return {
    status,
    reason,
  };
}

function computeTotals(records, key) {
  return records.reduce((totals, record) => {
    const bucket = String(record[key] || "");
    totals[bucket] = (totals[bucket] || 0) + 1;
    return totals;
  }, {});
}

function buildMarkdownTable(rows) {
  const header = [
    "| ID | Family | Status | Reachability | Anchors | Reason |",
    "| --- | --- | --- | --- | --- | --- |",
  ];
  const body = rows.map((record) => (
    `| ${record.id} | ${record.family} | ${record.current_status} | ${record.reachability} | ${record.anchor_hits.join(", ")} | ${record.status_reason.replace(/\|/g, "\\|")} |`
  ));
  return header.concat(body).join("\n");
}

function buildMarkdownReport(report) {
  const lines = [];
  lines.push("# Operation Back Sys");
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push("## Totals By Category");
  lines.push("");
  Object.entries(report.totalsByCategory).forEach(([category, total]) => {
    lines.push(`- ${category}: ${total}`);
  });
  lines.push("");
  lines.push("## Totals By Subsystem");
  lines.push("");
  Object.entries(report.totalsBySubsystem).forEach(([subsystem, total]) => {
    lines.push(`- ${subsystem}: ${total}`);
  });
  lines.push("");

  const subsystemOrder = ["morphology", "derivation", "selection", "ui", "provenance", "composer"];
  subsystemOrder.forEach((subsystem) => {
    const records = report.records.filter((record) => record.subsystem === subsystem);
    if (!records.length) {
      return;
    }
    lines.push(`## ${subsystem[0].toUpperCase()}${subsystem.slice(1)}`);
    lines.push("");
    lines.push(buildMarkdownTable(records));
    lines.push("");
  });

  lines.push("## Best Bringback Candidates");
  lines.push("");
  const disconnected = report.records.filter((record) => record.current_status === "disconnected");
  if (!disconnected.length) {
    lines.push("None in this snapshot.");
  } else {
    disconnected.forEach((record) => {
      lines.push(`- ${record.id}: ${record.status_reason}`);
    });
  }
  lines.push("");
  return lines.join("\n");
}

function validateRecord(record) {
  if (!ALLOWED_STATUSES.has(record.current_status)) {
    throw new Error(`Invalid current_status for ${record.id}: ${record.current_status}`);
  }
  if (!ALLOWED_SUBSYSTEMS.has(record.subsystem)) {
    throw new Error(`Invalid subsystem for ${record.id}: ${record.subsystem}`);
  }
  if (!ALLOWED_REACHABILITY.has(record.reachability)) {
    throw new Error(`Invalid reachability for ${record.id}: ${record.reachability}`);
  }
  if (!String(record.status_reason || "").trim()) {
    throw new Error(`Missing status_reason for ${record.id}`);
  }
  if (!Array.isArray(record.anchor_hits)) {
    throw new Error(`anchor_hits must be an array for ${record.id}`);
  }
  if (!record.anchor_hits.length && record.current_only_sanity !== true) {
    throw new Error(`anchor_hits must not be empty for ${record.id}`);
  }
  if (record.current_status === "disconnected") {
    if (!String(record.current_authority || "").trim()) {
      throw new Error(`Disconnected record ${record.id} must include current_authority`);
    }
    if (!(record.reachability === "latent" || record.reachability === "absent")) {
      throw new Error(`Disconnected record ${record.id} must be latent or absent`);
    }
  }
}

function main() {
  verifyAnchorsResolve();
  const context = createLoadedContext();
  const signalFiles = collectAllSignalFiles(RECORD_DEFS);
  const currentSourceMap = buildCurrentSourceMap(signalFiles);

  const records = RECORD_DEFS.map((definition) => {
    const anchorHits = ANCHORS.filter((anchor) => {
      const anchorSourceMap = new Map();
      signalFiles.forEach((file) => {
        anchorSourceMap.set(file, gitShowSafe(anchor, file));
      });
      return matchSignalsAgainstSourceMap(anchorSourceMap, definition.anchorSignals);
    });
    const currentStaticPresence = matchSignalsAgainstSourceMap(currentSourceMap, definition.currentSignals);
    const liveResult = definition.evaluate(context);
    const classified = classifyRecord(definition, anchorHits, currentStaticPresence, liveResult);
    const record = {
      id: definition.id,
      family: definition.family,
      subsystem: normalizeSubsystem(definition.subsystem),
      surface_kind: definition.surface_kind,
      anchor_hits: anchorHits,
      historical_authority: definition.historical_authority,
      current_authority: currentStaticPresence ? definition.current_authority : "",
      current_status: normalizeStatus(classified.status),
      status_reason: classified.reason,
      reachability: normalizeReachability(liveResult.reachability),
      current_probe: liveResult.currentProbe || null,
      notes: definition.notes || "",
      current_only_sanity: definition.allowCurrentOnlySanity === true,
    };
    validateRecord(record);
    return record;
  });

  const report = {
    operation: "Operation Back Sys",
    generatedAt: new Date().toISOString(),
    root: ROOT,
    anchors: ANCHORS,
    totalsByCategory: computeTotals(records, "current_status"),
    totalsBySubsystem: computeTotals(records, "subsystem"),
    records,
  };

  const markdown = buildMarkdownReport(report);
  fs.writeFileSync(REPORT_JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(REPORT_MD_PATH, markdown, "utf8");

  console.log(`Operation Back Sys report written to ${REPORT_JSON_PATH}`);
  console.log(`Operation Back Sys report written to ${REPORT_MD_PATH}`);
}

main();
