"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const noop = () => {};

function createFakeElement() {
  const fakeClassList = {
    add: noop,
    remove: noop,
    toggle: noop,
    contains: () => false,
  };
  return new Proxy(
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

function createVmContext({
  rootDir = process.cwd(),
  scriptPath = path.join(rootDir, "script.js"),
  loadScript = true,
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
  if (loadScript) {
    vm.runInContext(fs.readFileSync(scriptPath, "utf8"), context, { filename: scriptPath });
  }
  return { context, document, windowObject, scriptPath };
}

module.exports = {
  createVmContext,
};
