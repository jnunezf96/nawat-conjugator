const fs = require("fs");
const vm = require("vm");
const path = require("path");

const repoRoot = "/Users/jaimenunez/Desktop/Nawat_Conjugator";
const contextPath = path.join(repoRoot, "pret_universal_context.js");
const enginePath = path.join(repoRoot, "pret_universal_engine.js");
const scriptPath = path.join(repoRoot, "script.js");
const contextCode = fs.readFileSync(contextPath, "utf8");
const engineCode = fs.readFileSync(enginePath, "utf8");
const code = fs.readFileSync(scriptPath, "utf8");

function Event() {}

const stubDocument = {
  documentElement: { style: {} },
  body: {
    classList: {
      add() {},
      remove() {},
      contains() {
        return false;
      },
    },
  },
  getElementById(id) {
    const defaults = {
      "subject-prefix": { value: "ni" },
      "subject-suffix": { value: "" },
      verb: { value: "" },
      "object-prefix": { value: "ki" },
      language: { checked: false },
      "verb-mirror": { classList: { add() {}, remove() {} } },
      "verb-mirror-content": { textContent: "" },
    };
    return defaults[id] || null;
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  createElement() {
    return {
      className: "",
      textContent: "",
      appendChild() {},
      querySelector() {
        return null;
      },
    };
  },
  addEventListener() {},
};

const stubWindow = {
  matchMedia() {
    return { matches: false, addEventListener() {}, removeEventListener() {} };
  },
  addEventListener() {},
  removeEventListener() {},
  location: { hash: "" },
  navigator: { userAgent: "node" },
};

const sandbox = {
  console,
  document: stubDocument,
  window: stubWindow,
  navigator: stubWindow.navigator,
  localStorage: {
    getItem() {
      return null;
    },
    setItem() {},
  },
  Intl,
  setTimeout() {},
  clearTimeout() {},
  Event,
};

vm.createContext(sandbox);
vm.runInContext(contextCode, sandbox, { filename: "pret_universal_context.js" });
vm.runInContext(engineCode, sandbox, { filename: "pret_universal_engine.js" });
vm.runInContext(code, sandbox, { filename: "script.js" });

const generateWord = vm.runInContext("generateWord", sandbox);
const getFormSearchTenses = vm.runInContext("getFormSearchTenses", sandbox);
const getSubjectPersonSelections = vm.runInContext("getSubjectPersonSelections", sandbox);
const parseVerbEntryToken = vm.runInContext("parseVerbEntryToken", sandbox);
const filterFormSearchStemsToKnownVerbs = vm.runInContext(
  "filterFormSearchStemsToKnownVerbs",
  sandbox,
);
const deriveVerbstemCandidatesFromForm = vm.runInContext(
  "deriveVerbstemCandidatesFromForm",
  sandbox,
);
const matchesVerbstemSuggestion = vm.runInContext("matchesVerbstemSuggestion", sandbox);
const splitConjugationForms = vm.runInContext("splitConjugationForms", sandbox);
const TENSE_MODE = vm.runInContext("TENSE_MODE", sandbox);
const COMBINED_MODE = vm.runInContext("COMBINED_MODE", sandbox);

function getDataLines() {
  const dataPath = path.join(repoRoot, "data", "data.csv");
  const content = fs.readFileSync(dataPath, "utf8");
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

function splitForms(value) {
  if (typeof splitConjugationForms === "function") {
    return splitConjugationForms(value);
  }
  return String(value || "")
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.replace(/[()]/g, ""));
}

function generateOutputsForVerb(rawToken) {
  const entry = parseVerbEntryToken(rawToken);
  if (!entry.base) return [];
  const objectPrefixes = [];
  if (entry.intransitive) objectPrefixes.push("");
  if (entry.transitive) objectPrefixes.push("ki");
  const subjectSelections = getSubjectPersonSelections();
  const tenses = getFormSearchTenses();
  const outputs = [];

  tenses.forEach((tense) => {
    subjectSelections.forEach(({ selection }) => {
      objectPrefixes.forEach((objectPrefix) => {
        const result =
          generateWord({
            silent: true,
            override: {
              subjectPrefix: selection.subjectPrefix,
              subjectSuffix: selection.subjectSuffix,
              objectPrefix,
              verb: rawToken,
              tense,
            },
            mode: TENSE_MODE.verbo,
            combinedMode: COMBINED_MODE.active,
            skipValidation: true,
            skipTransitivityValidation: true,
          }) || {};
        if (result.error || !result.result) return;
        splitForms(result.result).forEach((form) => outputs.push(form));
      });
    });
  });

  return outputs;
}

function collectSuggestedVerbTokens(forms) {
  const candidates = new Set();
  forms.forEach((form) => {
    const stemGuess = deriveVerbstemCandidatesFromForm(form);
    if (!stemGuess.stems.length) return;
    const filtered = filterFormSearchStemsToKnownVerbs(stemGuess.stems, {
      hasObjectPrefix: stemGuess.hasObjectPrefix,
      allowBoth: stemGuess.isObjectPrefixAmbiguous,
    });
    filtered.forEach((stem) => {
      if (!stem || String(stem).startsWith("/")) return;
      candidates.add(stem);
    });
  });
  return Array.from(candidates);
}

function checkLastMile(originalVerbToken) {
  const originalEntry = parseVerbEntryToken(originalVerbToken);
  const allowBothOriginal = originalEntry.intransitive && !originalEntry.transitive;
  const initialForms = generateOutputsForVerb(originalVerbToken);
  const candidateVerbTokens = collectSuggestedVerbTokens(initialForms);

  for (const candidate of candidateVerbTokens) {
    const candidateForms = generateOutputsForVerb(candidate);
    for (const form of candidateForms) {
      const stemGuess = deriveVerbstemCandidatesFromForm(form);
      if (!stemGuess.stems.length) continue;
      const allowBoth = stemGuess.isObjectPrefixAmbiguous || allowBothOriginal;
      const filtered = filterFormSearchStemsToKnownVerbs(stemGuess.stems, {
        hasObjectPrefix: stemGuess.hasObjectPrefix,
        allowBoth,
      });
      if (
        matchesVerbstemSuggestion(originalVerbToken, filtered, {
          hasObjectPrefix: stemGuess.hasObjectPrefix,
          allowBoth,
        })
      ) {
        return { ok: true, candidateCount: candidateVerbTokens.length };
      }
    }
  }

  return { ok: false, candidateCount: candidateVerbTokens.length };
}

function run() {
  const lines = getDataLines();
  let ok = 0;
  let fail = 0;
  let totalCandidates = 0;
  const failures = [];

  lines.forEach((rawToken) => {
    const entry = parseVerbEntryToken(rawToken);
    if (!entry.base || rawToken.startsWith("/")) return;
    const result = checkLastMile(rawToken);
    totalCandidates += result.candidateCount;
    if (result.ok) {
      ok += 1;
    } else {
      fail += 1;
      failures.push(rawToken);
    }
  });

  console.log("Last-mile results");
  console.log("Total verbs", ok + fail);
  console.log("Ok", ok);
  console.log("Fail", fail);
  console.log("Avg candidates", (totalCandidates / Math.max(1, ok + fail)).toFixed(2));
  if (failures.length) {
    console.log("Failures", failures.slice(0, 20));
  }

  if (fail > 0) {
    process.exitCode = 1;
  }
}

run();
