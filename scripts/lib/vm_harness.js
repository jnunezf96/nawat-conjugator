"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { createModuleRuntime: createModuleRuntimeLane } = require("./module_runtime");

const noop = () => {};

function createFakeElement() {
  const fakeClassList = {
    add: noop,
    remove: noop,
    toggle: noop,
    contains: () => false,
  };
  const fakeStyle = {
    setProperty: noop,
    removeProperty: noop,
  };
  return new Proxy(
    {
      value: "",
      checked: false,
      style: fakeStyle,
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
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
      }),
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
}

function createFakeDocument(fakeElement) {
  return {
    body: fakeElement,
    documentElement: fakeElement,
    addEventListener: noop,
    removeEventListener: noop,
    getElementById: () => fakeElement,
    querySelector: () => fakeElement,
    querySelectorAll: () => [],
    createElement: () => fakeElement,
  };
}

function createFakeWindow(document) {
  return {
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
}

// Load order mirrors index.html: extracted modules first, then preterit, then script.js.
const PRETERIT_PATHS = [
  "src/core/concepts/concepts.js",
  "src/core/particles/particles.js",
  "src/core/sentence/sentence.js",
  "src/core/grammar/frame.js",
  "src/core/orthography/orthography.js",
  "src/core/clause/clause.js",
  "src/core/clause/modification/modification.js",
  "src/core/clause/adverbial/adverbial.js",
  "src/core/clause/adjunction/adjunction.js",
  "src/core/clause/complement/complement.js",
  "src/core/clause/conjunction/conjunction.js",
  "src/core/comparison/comparison.js",
  "src/core/calendar/calendar.js",
  "src/core/analysis/analysis.js",
  "src/core/phonology/phonology.js",
  "src/core/agreement/agreement.js",
  "src/core/agreement/display.js",
  "src/core/agreement/combo_validation.js",
  "src/core/search/runtime.js",
  "src/core/irregulars/irregulars.js",
  "src/core/output/surface.js",
  "src/core/output/provenance.js",
  "src/core/generation/morphology_support.js",
  "src/core/parsing/parsing.js",
  "src/core/vnc/allomorphy.js",
  "src/core/vnc/purposive/purposive.js",
  "src/core/vnc/honorific_pejorative/honorific_pejorative.js",
  "src/core/derivation/source_model.js",
  "src/core/derivation/forward_runtime.js",
  "src/core/derivation/nonactive.js",
  "src/core/derivation/frequentative/frequentative.js",
  "src/core/generation/valency.js",
  "src/core/generation/request.js",
  "src/core/generation/morphology_engine.js",
  "src/core/generation/runtime_support.js",
  "src/core/generation/engine.js",
  "src/core/nnc/nnc.js",
  "src/core/nnc/compound/compound.js",
  "src/core/nnc/adjectival/adjectival.js",
  "src/core/nnc/nominalization/nominalization.js",
  "src/core/nnc/numerals/numerals.js",
  "src/core/nnc/relational/relational.js",
  "src/core/nnc/place_gentilic/place_gentilic.js",
  "src/core/nnc/names/names.js",
  "src/core/vnc/vnc.js",
  "src/core/preterit/context.js",
  "src/core/preterit/engine.js",
  "src/core/preterit/api.js",
  "src/ui/state.js",
  "src/lessons/registry.js",
  "src/ui/composer/composer.js",
];

function createVmContext({
  rootDir = process.cwd(),
  scriptPath = path.join(rootDir, "script.js"),
  loadScript = true,
  loadPreteritModules = true,
  extraGlobals = {},
} = {}) {
  const fakeElement = createFakeElement();
  const document = createFakeDocument(fakeElement);
  const windowObject = createFakeWindow(document);
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
    ...extraGlobals,
  };
  context.globalThis = context;
  windowObject.window = windowObject;
  vm.createContext(context);
  if (loadPreteritModules) {
    for (const relPath of PRETERIT_PATHS) {
      const absPath = path.join(rootDir, relPath);
      if (fs.existsSync(absPath)) {
        vm.runInContext(fs.readFileSync(absPath, "utf8"), context, { filename: absPath });
      }
    }
  }
  if (loadScript) {
    vm.runInContext(fs.readFileSync(scriptPath, "utf8"), context, { filename: scriptPath });
  }
  return { context, document, windowObject, scriptPath };
}

module.exports = {
  createModuleRuntime: createModuleRuntimeLane,
  createVmContext,
};
