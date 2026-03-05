#!/usr/bin/env node

const fs = require("fs");
const vm = require("vm");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

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

const scriptPath = path.join(ROOT, "script.js");
const constantsPath = path.join(ROOT, "data", "static_constants.json");
const phonologyPath = path.join(ROOT, "data", "static_phonology.json");
const derivRulesPath = path.join(ROOT, "data", "static_derivational_rules.json");
const redupPath = path.join(ROOT, "data", "static_redup.json");

try {
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(scriptPath, "utf8"), context, { filename: scriptPath });

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
