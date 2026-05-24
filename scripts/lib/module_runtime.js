"use strict";

const path = require("path");
const { pathToFileURL } = require("url");

async function createModuleRuntime({
  rootDir = process.cwd(),
  ...options
} = {}) {
  const runtimeModulePath = path.join(rootDir, "src", "node", "runtime.mjs");
  const runtimeModule = await import(pathToFileURL(runtimeModulePath).href);
  return runtimeModule.createModuleRuntime({
    rootDir,
    ...options,
  });
}

module.exports = {
  createModuleRuntime,
};
